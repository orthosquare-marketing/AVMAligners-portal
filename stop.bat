@echo off
cd /d "%~dp0"
docker compose down
echo Portal stopped. Your data is kept.
pause
