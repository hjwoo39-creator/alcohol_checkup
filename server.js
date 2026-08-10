const express = require('express');
const QRCode = require('qrcode');
const os = require('os');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'responses.json');

// Supabase 환경 변수 설정 감지
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const isCloudMode = !!(SUPABASE_URL && SUPABASE_KEY);

console.log(`============================================================`);
console.log(`[자가진단 구동 모드] ${isCloudMode ? '★ 클라우드 모드 (Supabase DB 연동)' : '☆ 로컬 모드 (responses.json)'}`);
console.log(`============================================================`);

// 로컬 캐시 응답 배열 (로컬 모드 전용)
let localResponses = [];

function loadLocalResponses() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('로컬 응답 데이터를 불러오는 중 오류 발생:', err);
    }
    return [];
}

function saveLocalResponses() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(localResponses, null, 2), 'utf8');
    } catch (err) {
        console.error('로컬 응답 데이터를 저장하는 중 오류 발생:', err);
    }
}

// 로컬 모드일 때만 기동 시 파일 로드
if (!isCloudMode) {
    localResponses = loadLocalResponses();
}

function getLocalIP() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

const ip = getLocalIP();

// Render.com의 배포 도메인 주소(RENDER_EXTERNAL_URL) 감지, 없을 시 로컬 IP 바인딩
const appUrl = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL || `http://${ip}:${PORT}`;
const studentUrl = `${appUrl}/index.html`;

// 학생 접속용 QR코드 파일 자동 생성
QRCode.toFile(
    path.join(__dirname, 'student_qr.png'),
    studentUrl,
    err => {
        if (err) {
            console.error('QR코드 이미지 생성 실패:', err);
        } else {
            console.log('[QR코드 생성완료] 접속 링크:', studentUrl);
        }
    }
);

// [API] 학생 자가진단 제출 수집
app.post('/submit', async (req, res) => {
    try {
        const id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const newResponse = {
            id,
            scores: req.body.scores,
            type: req.body.type,
            submittedAt: req.body.submittedAt || new Date().toISOString()
        };

        if (isCloudMode) {
            // 추가 npm 라이브러리 없이 표준 fetch API를 통해 Supabase REST API 통신 진행
            const response = await fetch(`${SUPABASE_URL}/rest/v1/responses`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(newResponse)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase 저장 실패: ${response.statusText} (${errText})`);
            }
            console.log('[제출완료] 클라우드 DB 적재 완료:', id);
        } else {
            // 로컬 responses.json 파일에 저장
            localResponses.push(newResponse);
            saveLocalResponses();
            console.log('[제출완료] 로컬 파일 데이터베이스 적재 완료:', id);
        }

        res.json({ success: true });
    } catch (err) {
        console.error('제출 데이터 처리 실패:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// [API] 개별 학생 응답 삭제
app.delete('/responses/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (isCloudMode) {
            // Supabase REST API 특정 ID 행 삭제
            const response = await fetch(`${SUPABASE_URL}/rest/v1/responses?id=eq.${id}`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase 삭제 실패: ${response.statusText} (${errText})`);
            }
            console.log(`[삭제완료] 클라우드 DB에서 학생 응답 제거됨: ${id}`);
            res.json({ success: true });
        } else {
            // 로컬 파일 데이터베이스 필터링 삭제
            const beforeCount = localResponses.length;
            localResponses = localResponses.filter(r => r.id !== id);

            if (localResponses.length < beforeCount) {
                saveLocalResponses();
                console.log(`[삭제완료] 로컬 파일에서 학생 응답 제거됨: ${id}`);
                res.json({ success: true });
            } else {
                res.status(404).json({ success: false, message: '삭제 대상이 존재하지 않습니다.' });
            }
        }
    } catch (err) {
        console.error('데이터 삭제 실패:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// [API] 전체 응답자 내역 조회
app.get('/responses', async (req, res) => {
    try {
        if (isCloudMode) {
            // Supabase REST API 데이터 전체 Fetch (제출시간 역순 정렬)
            const response = await fetch(`${SUPABASE_URL}/rest/v1/responses?select=*&order=submittedAt.desc`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase 데이터 페치 실패: ${response.statusText} (${errText})`);
            }

            const data = await response.json();
            res.json(data);
        } else {
            res.json(localResponses);
        }
    } catch (err) {
        console.error('응답 데이터 조회 실패:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// [API] 학생용 자가진단 URL 공유값 조회
app.get('/student-url', (req, res) => {
    res.json({ url: studentUrl });
});

app.listen(PORT, () => {
    console.log(`서버 정상 기동 완료 (포트: ${PORT})`);
    console.log(`사용자 접속 주소: ${studentUrl}`);
});