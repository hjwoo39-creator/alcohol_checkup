// script.js (전체 49문항, 9개 요인 기준점수 반영)

const questions = [
  // 1~49번 문항, factor와 역문항(reverse) 포함
  {text: '나는 술을 먹고 운전을 해도 사고가 나지 않을 것이다.', factor: '운전능력 과신', reverse: false},
  {text: '음주운전에 대한 처벌은 현재보다 더 강해져야 한다고 생각한다.', factor: '죄책감', reverse: false},
  {text: '나의 음주운전 사실을 가족이나 친지들이 알게 되는 것은 부끄러운 일이다.', factor: '죄책감', reverse: false},
  {text: '음주운전 때문에 손해를 보는 일이 거의 없다.', factor: '잘못된 손익계산', reverse: false},
  {text: '사고나 위험은 나와 거리가 멀다.', factor: '운전능력 과신', reverse: false},
  {text: '나는 술을 먹고 운전을 해도 위험에 빠지지 않을 자신이 있다.', factor: '운전능력 과신', reverse: false},
  {text: '음주운전에 대한 처벌은 당연하다고 생각한다.', factor: '죄책감', reverse: false},
  {text: '음주운전으로 인해 사고가 발생할 확률은 거의 없다.', factor: '운전능력 과신', reverse: false},
  {text: '나는 음주운전이 큰 범죄라고 생각한다.', factor: '죄책감', reverse: false},
  {text: '술을 먹었다고 해서 나의 운전 실력은 변하지 않는다.', factor: '운전능력 과신', reverse: false},
  {text: '나의 음주운전 사실이 가족이나 친지들에게 알려지는 것이 부담스럽다.', factor: '죄책감', reverse: false},
  {text: '술을 먹고 운전했을 때 오히려 운전이 더 잘 된다.', factor: '운전능력 과신', reverse: false},
  {text: '나는 음주운전이 부끄러운 일이라고 생각한다.', factor: '죄책감', reverse: false},
  {text: '나의 운전 실력은 술을 먹어도 영향을 받지 않는다.', factor: '운전능력 과신', reverse: false},
  {text: '나는 다른 사람들보다 운전 실력이 뛰어나기 때문에 술을 먹어도 위험하지 않다.', factor: '운전능력 과신', reverse: false},
  {text: '나의 음주운전 사실이 직장 동료들에게 알려지는 것이 부담스럽다.', factor: '죄책감', reverse: false},
  {text: '음주운전을 하는 것이 다른 방법보다 비용적인 측면에서 더 나은 선택이다.', factor: '잘못된 손익계산', reverse: false},
  {text: '나의 음주운전 사실을 직장 동료들이 알게 되는 것은 부끄러운 일이다.', factor: '죄책감', reverse: false},
  {text: '대리운전 비용이 음주운전으로 인해 벌금을 내는 것보다 비싸다고 생각한다.', factor: '잘못된 손익계산', reverse: false},
  {text: '나는 가끔 조금은 겁이 나는 일들을 즐긴다.', factor: '감각추구성향', reverse: false},
  {text: '나는 기분이 아주 좋을 때 나중에 문제를 일으킬 수도 있는 행동을 할 때가 있다.', factor: '충동성', reverse: false},
  {text: '나는 위험해 보일지라도 짜릿한 경험을 해보고 싶다.', factor: '감각추구성향', reverse: false},
  {text: '나는 가끔 자극적이고 짜릿한 게임이나 놀이를 즐긴다.', factor: '감각추구성향', reverse: false},
  {text: '내 인생의 상당 부분은 우연에 의해 결정되는 것 같다.', factor: '외부귀인', reverse: false},
  {text: '내가 소원을 이룬다면 그것은 운이 좋았기 때문이다.', factor: '외부귀인', reverse: false},
  {text: '내가 소원을 이룬다면 그것은 내가 열심히 노력했기 때문이다.', factor: '내부귀인', reverse: false},
  {text: '나의 미래는 나의 의지에 달려있다.', factor: '내부귀인', reverse: false},
  {text: '나는 잘못했을 때 남 탓을 하지 않는다.', factor: '도덕성', reverse: false},
  {text: '나는 보통 어떤 일을 하기 전에 신중하게 생각한다.', factor: '충동성', reverse: true},
  {text: '나는 가끔 피할 수 없는 상황까지 몰고 가서 그 묘미를 즐긴다.', factor: '감각추구성향', reverse: false},
  {text: '나는 화가 많이 났을 때 감정을 추스르기 위해 노력한다.', factor: '자기통제력', reverse: false},
  {text: '내가 노력해야 좋은 결과를 얻을 수 있다.', factor: '내부귀인', reverse: false},
  {text: '내 인생은 나의 노력으로 결정된다고 생각한다.', factor: '내부귀인', reverse: false},
  {text: '처벌받지 않는다면 나는 세금을 내지 않을 것이다.', factor: '도덕성', reverse: true},
  {text: '나는 흥분하면 내 행동의 결과를 생각하지 못하는 경향이 있다.', factor: '충동성', reverse: false},
  {text: '나는 번지점프와 같이 짜릿함을 만끽할 수 있는 운동을 해보고 싶다.', factor: '감각추구성향', reverse: false},
  {text: '나는 나중에 후회할 일들을 충동적으로 할 때가 있다.', factor: '충동성', reverse: false},
  {text: '내가 매우 흥분했을 때 하는 행동을 보고 다른 사람들이 놀라거나 걱정을 할 때가 있다.', factor: '충동성', reverse: false},
  {text: '만약 떨어진 돈을 발견한다면 내가 가질 것이다.', factor: '도덕성', reverse: true},
  {text: '나는 나의 충동과 욕구를 조절할 수 있다.', factor: '자기통제력', reverse: false},
  {text: '자동차 사고를 당하느냐 아니냐는 대부분 운에 달려 있다.', factor: '외부귀인', reverse: false},
  {text: '내가 출세를 할 수 있으려면 재수가 좋아야 한다.', factor: '외부귀인', reverse: false},
  {text: '다른 사람들이 보지 않더라도 옳은 행동을 하려고 노력한다.', factor: '도덕성', reverse: false},
  {text: '나는 화가 많이 난 상황에서도 금방 차분해진다.', factor: '자기통제력', reverse: false},
  {text: '내 목적을 위해서라면 나는 망설이지 않고 거짓말을 할 것이다.', factor: '도덕성', reverse: true},
  {text: '나는 모험을 즐기는 편에 속한다.', factor: '감각추구성향', reverse: false},
  {text: '나는 정해진 규칙을 지키지 않을 때 더 특별한 재미를 느낀다.', factor: '감각추구성향', reverse: false},
  {text: '나는 어떤 결정을 하기 전에 모든 장단점을 고려한다.', factor: '충동성', reverse: false},
  {text: '나는 부적절한 행동을 했을 때 부끄럽다.', factor: '도덕성', reverse: false},
];

// 9개 요인 기준점수
const thresholds = {
  '죄책감': 24,
  '운전능력 과신': 15,
  '잘못된 손익계산': 10,
  '내부귀인': 13,
  '외부귀인': 13,
  '자기통제력': 9,
  '충동성': 17,
  '감각추구성향': 24,
  '도덕성': 19
};

const options = ['전혀 그렇지 않다','그렇지 않다','보통이다','그렇다','매우 그렇다'];

// ==========================================
// [상태 변수 및 기본 설정]
// ==========================================
let currentPage = 1;
const pageSize = 3;
const totalPages = Math.ceil(questions.length / pageSize);
let answers = {};

const typeDetails = {
  '1가': {
    summary: '부끄러움을 알면서도 운전대를 과신하고, 비용적 혜택을 정당화하는 위험 유형',
    features: '음주운전이 큰 범죄라는 사실을 알고 있음. 평소 본인의 운전 실력이 뛰어나다고 생각하기 때문에, 음주로 인해 신체 운동 기능이 둔화된 상황에서도 위험성을 깨닫지 못하고 음주운전을 하는 것이 위험하지 않다고 생각할 수 있음.',
    factors: '죄책감(높음), 운전능력 과신(높음), 잘못된 손익계산(높음)',
    warnings: '높은 죄책감에도 불구하고 운전 과신과 잘못된 손익 계산이 결합되어 있어, 대리운전비 등이 아깝다고 느껴질 때 언제든 운전대를 잡을 수 있습니다. 술을 마시면 운전 실력은 즉시 저하되며, 음주운전 적발 및 사고 시 발생하는 경제적 손실이 대리비의 수만 배에 달함을 인지해야 합니다.'
  },
  '1나': {
    summary: '죄책감은 높고 운전은 과신하나, 손익은 이성적으로 인지하는 잠재 위험 유형',
    features: '음주운전이 잘못된 행위라는 것을 잘 알고 있음. 또한, 음주운전으로 인한 비용적 손실이나 위험성 또한 알고 있기에 벌금이나 법적인 조치를 받게 되는 결과에 대하여 두려워함. 그러나 자신의 운전 실력에 대한 믿음 때문에 음주운전의 위험성을 낮게 판단하는 경향이 있음.',
    factors: '죄책감(높음), 운전능력 과신(높음), 잘못된 손익계산(낮음)',
    warnings: '평소에는 이성적 손익 계산으로 음주운전을 피하지만, 자만심(운전 과신)이 드는 순간 "단거리는 괜찮겠지", "술이 깼으니 괜찮겠지" 하는 마음에 충동적으로 위반할 가능성이 있습니다. 자신의 판단력은 알코올에 의해 심각하게 왜곡된다는 점을 명심하고 술자리 방문 시 아예 차를 두고 가십시오.'
  },
  '2가': {
    summary: '죄책감이 매우 희박하고 운전 능력을 과신하며, 잘못된 이익을 좇는 고위험 유형',
    features: '음주운전이 범죄행위이자 위험한 행위라는 것에 대해 잘 모르고 있는 것은 아닌지 되돌아 볼 필요가 있음. 음주운전을 하더라도 신중하게 운전을 하면 위험하지 않을거라 생각하며, 당장의 시간적, 비용적 이득을 위해 운전실력에 대한 자신감을 바탕으로 음주운전을 할 가능성이 높음.',
    factors: '죄책감(낮음), 운전능력 과신(높음), 잘못된 손익계산(높음)',
    warnings: '음주운전 억제 요인(도덕성, 죄책감, 이성적 판단)이 모두 결여되어 있는 가장 위험한 군입니다. 본인의 판단은 착각일 뿐이며, 타인의 생명을 앗아가는 중범죄임을 자각해야 합니다. 강력한 교육과 법적 제재, 주변인들의 차단이 동반되지 않으면 재범 가능성이 매우 높습니다.'
  },
  '2나': {
    summary: '도덕적 죄책감은 결여되어 있으나 손실 위험 때문에 몸을 사리는 기회주의적 유형',
    features: '음주운전 처벌의 필요성에 크게 공감하고 있지 못할 수 있음. 음주운전보다 다른 방법을 선택하는 것이 효율적이라고 생각하는 경향이 있으나, 평소 자신의 운전 실력이 뛰어나기 때문에 음주운전으로 인한 위험한 상황이 발생하지 않을 것이라는 안일한 생각을 하게 될 수 있음.',
    factors: '죄책감(낮음), 운전능력 과신(높음), 잘못된 손익계산(낮음)',
    warnings: '도덕적인 억제력이 작동하지 않고 개인적 손해를 회피하려는 마음에 의존하므로, "단속을 안 하는 심야/새벽 시간대"나 "단속이 없는 한적한 시골길" 등에서는 망설임 없이 음주운전을 시도할 확률이 큽니다. 단속 여부와 무관하게 음주운전은 생명을 위협하는 파괴적 행위입니다.'
  },
  '3가': {
    summary: '운전 자신감은 낮으나, 죄책감이 낮고 눈앞의 이익을 계산하는 취약 유형',
    features: '음주 상태에서 운전을 하는 것은 위험하다고 생각하지만 음주 상황을 스스로 통제할 수 있다고 판단할 때에는 음주운전을 하는 것이 문제가 없다고 생각하는 경향이 있음. 또한 음주운전을 하는 것이 비용을 아낄 수 있는 효율적인 방법이라고 생각할 수 있음.',
    factors: '죄책감(낮음), 운전능력 과신(낮음), 잘못된 손익계산(높음)',
    warnings: '본인의 실력이 부족함을 인지하면서도 경제적 합리화나 귀찮음 때문에 무모한 음주운전을 감행하여 사고를 낼 확률이 높습니다. 음주운전 한 번으로 인한 비용 지출과 인생의 손실이 어떤 비용 절약보다 막대함을 깨달아야 합니다.'
  },
  '3나': {
    summary: '운전 과신이나 계산은 없으나 도덕적 브레이크(죄책감)가 고장 난 상태인 방관 유형',
    features: '음주 상태에서 운전을 하면 평소처럼 운전하기 어렵다는 것을 잘 알고 있으며, 음주운전으로 인한 피해의 심각성도 잘 알고 있음. 그러나 근본적으로 음주운전 행위 자체에 대한 죄의식을 느끼지 못하고 있다면 결국 음주운전을 반복하게 될 가능성이 높음.',
    factors: '죄책감(낮음), 운전능력 과신(낮음), 잘못된 손익계산(낮음)',
    warnings: '도덕적 브레이크가 약해 주위 사람들이 음주운전을 대수롭지 않게 여길 경우 아무 생각 없이 동조할 수 있습니다. 음주운전은 명백한 불법 행위이며 언제든 타인의 가정에 비극을 가져올 수 있음을 교육을 통해 내재화해야 합니다.'
  },
  '4가': {
    summary: '도덕적 양심은 강하고 운전도 경계하나, 순간적인 판단 착오로 흔들리는 유형',
    features: '음주운전의 위법성과 위험성을 잘 이해하고 있으며 음주 상태에서 운전을 하는 것은 사고로 이어질 가능성이 높다는 사실을 잘 알고 있음. 그러나 당장의 시간적, 비용적 이득을 생각할 때 음주운전을 하는 것이 낫다고 잘못 판단하는 경향이 있음.',
    factors: '죄책감(높음), 운전능력 과신(낮음), 잘못된 손익계산(높음)',
    warnings: '평소에는 절대 음주운전을 하지 않겠다고 다짐하지만, 만취 상태이거나 갑작스러운 비상 상황에서 "잠깐 골목길 주차만 하는 건 경제적 손실이 덜하겠지"라며 순간적인 계산 오류를 저지릅니다. 음주 후 어떠한 예외 상황에서도 절대 차키를 만지지 않도록 습관화하십시오.'
  },
  '4나': {
    summary: '양심이 올곧게 작동하고 과신도 없으나, 방심할 수 없는 일반 안전 유형',
    features: '음주운전은 하지 말아야 할 행동임을 잘 알고 있으며 음주운전의 심각성을 제대로 인식하고 있기 때문에 음주운전을 지속하게 될 가능성은 낮음. 그럼에도 불구하고 음주운전을 한다면, 음주운전을 할 수 밖에 없는 상황이었다고 변명하며 책임을 외부로 돌리고 있을 가능성이 있음.',
    factors: '죄책감(높음), 운전능력 과신(낮음), 잘못된 손익계산(낮음)',
    warnings: '진단 요인상 가장 안전한 그룹이지만, 충동성이나 감각추구 성향 등 주변 심리 요인이 만취 상태에서 돌발 작동할 수 있습니다. 지속적으로 예방 의식을 유지하고 동승자에게도 예방을 권고하는 성숙한 운전 태도가 필요합니다.'
  },
  '판정불가': {
    summary: '정상적인 통계 기준 범위를 벗어났거나 분석 결과가 불일치하는 유형',
    features: '응답 패턴이 지나치게 편향되었거나 모순이 생겨 명확한 유형 판정이 보류된 상태입니다.',
    factors: '요인 분석 기준 불일치',
    warnings: '자가진단에 성실하게 답변했는지 다시 점검해 보십시오. 만일 일부 문항을 장난스럽게 답변했다면 결과에 오류가 발생할 수 있습니다. 안전한 도로교통 문화 준수를 당부드립니다.'
  }
};

// ==========================================
// [이벤트 리스너 및 초기화]
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pdfBtn = document.getElementById('pdfBtn');

  if (startBtn) startBtn.addEventListener('click', startSurvey);
  if (prevBtn) prevBtn.addEventListener('click', prevPage);
  if (nextBtn) nextBtn.addEventListener('click', nextPage);
  if (pdfBtn) pdfBtn.addEventListener('click', () => window.print());

  loadFromLocalStorage();
});

// ==========================================
// [설문 진행 제어 로직]
// ==========================================
function startSurvey() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('survey-screen').style.display = 'block';
  renderPage(currentPage);
}

function renderPage(page) {
  const container = document.getElementById('questions');
  container.innerHTML = '';

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, questions.length);

  for (let i = startIndex; i < endIndex; i++) {
    const q = questions[i];
    const savedVal = answers['q' + i];

    const qCard = document.createElement('div');
    qCard.classList.add('question-card');
    qCard.id = 'qCard-' + i;

    const qText = document.createElement('div');
    qText.classList.add('question-text');
    qText.innerText = `${i + 1}. ${q.text}`;
    qCard.appendChild(qText);

    const optionGroup = document.createElement('div');
    optionGroup.classList.add('option-group');

    options.forEach((optText, optIdx) => {
      const val = optIdx + 1;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.classList.add('option-btn');
      if (savedVal && parseInt(savedVal) === val) {
        btn.classList.add('active');
      }

      btn.innerHTML = `<span>${optText}</span><div class="option-check"></div>`;

      btn.addEventListener('click', () => {
        Array.from(optionGroup.children).forEach(child => child.classList.remove('active'));
        btn.classList.add('active');
        answers['q' + i] = val;
        saveToLocalStorage();
        updateProgress(); // 실시간 진행 게이지 업데이트
        qCard.classList.remove('error');
        checkPageCompleteRealtime();
      });
      optionGroup.appendChild(btn);
    });
    qCard.appendChild(optionGroup);
    container.appendChild(qCard);
  }

  // 실시간 진행 상황 업데이트
  updateProgress();

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.disabled = (page === 1);
  if (page === totalPages) {
    nextBtn.innerText = '결과 제출하기';
    nextBtn.classList.add('btn-primary');
  } else {
    nextBtn.innerText = '다음 단계';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const answeredCount = Object.keys(answers).length;
  const total = questions.length;
  const countEl = document.getElementById('answeredCount');
  const totalEl = document.getElementById('totalQuestions');
  const fillEl = document.getElementById('progressBarFill');
  
  if (countEl) countEl.innerText = answeredCount;
  if (totalEl) totalEl.innerText = total;
  if (fillEl) {
    const progressPercent = (answeredCount / total) * 100;
    fillEl.style.width = progressPercent + '%';
  }
}

function validateCurrentPage() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, questions.length);
  let isAllChecked = true;

  for (let i = startIndex; i < endIndex; i++) {
    const card = document.getElementById('qCard-' + i);
    if (!answers['q' + i]) {
      isAllChecked = false;
      if (card) card.classList.add('error');
    } else {
      if (card) card.classList.remove('error');
    }
  }

  const warningBox = document.getElementById('warning');
  if (!isAllChecked) {
    warningBox.style.display = 'flex';
    const firstError = document.querySelector('.question-card.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    warningBox.style.display = 'none';
  }
  return isAllChecked;
}

function checkPageCompleteRealtime() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, questions.length);
  let isAllChecked = true;
  for (let i = startIndex; i < endIndex; i++) {
    if (!answers['q' + i]) {
      isAllChecked = false;
      break;
    }
  }
  if (isAllChecked) document.getElementById('warning').style.display = 'none';
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    saveToLocalStorage();
  }
}

function nextPage() {
  if (validateCurrentPage()) {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      saveToLocalStorage();
    } else {
      submitSurvey();
    }
  }
}

// ==========================================
// [로컬스토리지 자동 저장 / 복원]
// ==========================================
function saveToLocalStorage() {
  localStorage.setItem('alcohol_selfcheck_answers', JSON.stringify(answers));
  localStorage.setItem('alcohol_selfcheck_page', currentPage);
}

function loadFromLocalStorage() {
  const savedAnswers = localStorage.getItem('alcohol_selfcheck_answers');
  const savedPage = localStorage.getItem('alcohol_selfcheck_page');
  if (savedAnswers && savedPage) {
    answers = JSON.parse(savedAnswers);
    currentPage = parseInt(savedPage);
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('survey-screen').style.display = 'block';
    renderPage(currentPage);
  }
}

function clearLocalStorage() {
  localStorage.removeItem('alcohol_selfcheck_answers');
  localStorage.removeItem('alcohol_selfcheck_page');
}

// ==========================================
// [점수 계산 및 유형 판정]
// ==========================================
function calculateScore() {
  const factorScores = {};
  questions.forEach((q, index) => {
    let val = answers['q' + index];
    if (!val) throw new Error('미응답 문항 있음');
    val = parseInt(val);
    if (q.reverse) val = 6 - val;
    factorScores[q.factor] = (factorScores[q.factor] || 0) + val;
  });
  return factorScores;
}

function determineLevel(score, factor) {
  return score >= thresholds[factor] ? '높음' : '낮음';
}

function determineType(factorScores) {
  const guiltHigh = factorScores['죄책감'] >= thresholds['죄책감'];
  const driveHigh = factorScores['운전능력 과신'] >= thresholds['운전능력 과신'];
  const costHigh  = factorScores['잘못된 손익계산'] >= thresholds['잘못된 손익계산'];

  if (guiltHigh && driveHigh && costHigh) return '1가';
  if (guiltHigh && driveHigh && !costHigh) return '1나';
  if (!guiltHigh && driveHigh && costHigh) return '2가';
  if (!guiltHigh && driveHigh && !costHigh) return '2나';
  if (!guiltHigh && !driveHigh && costHigh) return '3가';
  if (!guiltHigh && !driveHigh && !costHigh) return '3나';
  if (guiltHigh && !driveHigh && costHigh) return '4가';
  if (guiltHigh && !driveHigh && !costHigh) return '4나';

  return '판정불가';
}

async function submitSurvey() {
  try {
    const scores = calculateScore();
    const type = determineType(scores);

    await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scores,
        type,
        submittedAt: new Date().toISOString()
      })
    });

    clearLocalStorage();

    document.getElementById('survey-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    document.getElementById('resultType').innerText = type + '형';
    
    const details = typeDetails[type] || typeDetails['판정불가'];
    document.getElementById('resultTypeDesc').innerText = details.summary;
    document.getElementById('typeDetailFeatures').innerText = details.features;
    document.getElementById('typeDetailFactors').innerText = details.factors;
    document.getElementById('typeDetailWarnings').innerText = details.warnings;

    const factorListContainer = document.getElementById('factorList');
    factorListContainer.innerHTML = '';

    Object.keys(scores).forEach(factorName => {
      const score = scores[factorName];
      const level = determineLevel(score, factorName);
      const isHigh = level === '높음';
      
      const item = document.createElement('div');
      item.classList.add('factor-item');
      item.innerHTML = `
        <span class="factor-name">${factorName}</span>
        <div class="factor-score-wrap">
          <span class="factor-score">${score}점</span>
          <span class="badge ${isHigh ? 'badge-high' : 'badge-low'}">${level}</span>
        </div>
      `;
      factorListContainer.appendChild(item);
    });

    renderRadarChart(scores);

  } catch (err) {
    console.error(err);
    alert('제출 처리 중 오류가 발생했습니다.');
  }
}

let radarChartInstance = null;
function renderRadarChart(scores) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  const labels = Object.keys(scores);
  const dataValues = labels.map(l => scores[l]);
  const thresholdValues = labels.map(l => thresholds[l]);

  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '나의 점수',
          data: dataValues,
          backgroundColor: 'rgba(37, 99, 235, 0.15)',
          borderColor: '#2563eb',
          borderWidth: 2.5,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#2563eb',
          pointRadius: 4
        },
        {
          label: '위험 기준점',
          data: thresholdValues,
          backgroundColor: 'transparent',
          borderColor: '#ef4444',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#ef4444',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: '#e2e8f0'
          },
          grid: {
            color: '#e2e8f0'
          },
          pointLabels: {
            font: {
              size: 11,
              weight: '600'
            },
            color: '#1e293b'
          },
          ticks: {
            backdropColor: 'transparent',
            color: '#94a3b8',
            font: {
              size: 9
            },
            stepSize: 10
          },
          suggestedMin: 0,
          suggestedMax: 30
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: {
              size: 11,
              weight: '500'
            },
            color: '#334155'
          }
        }
      }
    }
  });
}