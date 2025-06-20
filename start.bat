@echo off

cd /d %~dp0

docker-compose down
docker-compose build
docker-compose up -d

start http://localhost:3000

pause
