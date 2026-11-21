@echo off
rem Starts the AVM Aligners Portal on this PC. Needs Docker Desktop running.
cd /d "%~dp0"
docker info >nul 2>&1
if errorlevel 1 goto nodocker
if exist .env goto up

set /p SAEMAIL=Enter the Super Admin email: 
docker run --rm -v "%cd%:/w" -w /w node:22-alpine node scripts/setup-env.mjs %SAEMAIL%
if errorlevel 1 goto failed
echo.
echo Note the temporary password shown above, then press a key to continue.
pause >nul

:up
docker compose up -d --build
if errorlevel 1 goto failed
echo.
echo Portal is starting. Open http://localhost:8080 in your browser in about a minute.
pause
exit /b 0

:nodocker
echo Docker Desktop is not running. Start it and run this file again.
pause
exit /b 1

:failed
echo Something went wrong. See the messages above.
pause
exit /b 1
