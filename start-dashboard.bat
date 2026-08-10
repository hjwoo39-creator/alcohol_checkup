@echo off

title 음주자가진단 대시보드

cd /d "%~dp0"

echo ==============================================
echo 음주자가진단 시스템 시작 (오프라인 배포 최적화)
echo ==============================================
echo.
echo [안내] 이 터미널 창은 자가진단 서버가 실행 중인 창입니다.
echo [안내] 대시보드 이용 중에는 이 창을 닫거나 종료하지 마십시오.
echo.

rem 1. 대시보드 웹 브라우저를 먼저 실행합니다 (백그라운드 비동기 기동).
start "" "http://localhost:3000/dashboard.html"

rem 2. 현재 실행 창에서 포그라운드로 서버를 구동합니다 (포터블 Node.js 감지 포함).
if exist "bin\node.exe" (
    bin\node.exe server.js
) else (
    node server.js
)