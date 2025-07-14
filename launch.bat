@echo off
REM Ensure script runs from its own directory
cd /d "%~dp0"

REM Check for Node.js in PATH
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo Node.js is not installed or not in your PATH.
  pause
  exit /b 1
)

node launch.js
pause
