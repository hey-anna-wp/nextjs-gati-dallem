#!/bin/bash
set -e

echo "🚀 [Deploy Script] 배포 시작 ============================"

APP_DIR="/home/ubuntu/nextjs-gati-dallem"
APP_NAME="nextjs-app"
PORT=3000

# 1️⃣ 배포 디렉토리 이동
cd $APP_DIR || { echo "❌ 디렉토리 이동 실패: $APP_DIR"; exit 1; }

echo "📁 현재 디렉토리: $(pwd)"
echo " "

# 2️⃣ 권한 보정 (403, 404 예방)
echo "🔒 권한 및 소유자 보정 중..."
sudo chown -R ubuntu:www-data $APP_DIR
sudo chmod +x /home/ubuntu
sudo find $APP_DIR -type d -exec chmod 755 {} \;
sudo find $APP_DIR -type f -exec chmod 644 {} \;
echo "✅ 권한 보정 완료"
echo " "

# 3️⃣ 프로세스 정리
echo "🧹 기존 PM2 프로세스 종료 중..."
pm2 delete $APP_NAME || true
sleep 2

# 4️⃣ 새로운 앱 실행 (standalone 모드)
echo "🔥 PM2로 Next.js standalone 실행..."
pm2 start .next/standalone/server.js --name "$APP_NAME"

# 5️⃣ PM2 자동 부팅 등록 (최초 1회만 적용됨)
pm2 save || true
pm2 startup systemd -u ubuntu --hp /home/ubuntu || true

# 6️⃣ Nginx 라우팅 갱신 (Nginx가 설치되어 있는 경우)
if command -v nginx &> /dev/null; then
  echo "🔄 Nginx 리로드..."
  sudo systemctl reload nginx || true
fi

# 7️⃣ Health Check
echo "🩺 서버 헬스체크 중..."
sleep 3
if curl -f http://127.0.0.1:$PORT > /dev/null 2>&1; then
  echo "✅ 서버 실행 확인"
else
  echo "⚠️ 서버 응답 없음 (PM2 로그 확인 필요)"
fi

echo "✅ [Deploy Script] 배포 완료 ============================"