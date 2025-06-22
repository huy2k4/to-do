@echo off
echo  Đang khởi động TodoList App...
start "" "http://localhost:3000"
json-server --watch D:\TODOLIST\mock-api\db.json --host 0.0.0.0 --port 3001
