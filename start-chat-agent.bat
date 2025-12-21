@echo off
echo ============================================
echo Chat Agent Setup Script
echo ============================================
echo.

echo [1/3] Installing backend dependencies...
cd server
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo Backend dependencies installed successfully!
) else (
    echo Backend dependencies already installed.
)
echo.

echo [2/3] Starting backend server...
start "Chat Agent Backend" cmd /k "npm run dev"
echo Backend server starting on http://localhost:5000
echo.

timeout /t 3 /nobreak >nul

cd ..

echo [3/3] Starting frontend...
echo Frontend will start on http://localhost:3000
echo.
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Access the Chat Agent at: http://localhost:3000/chat-agent
echo Excel file will be created at: server/user_data.xlsx
echo.
echo Press Ctrl+C in the backend window to stop the server
echo.

call npm start

pause
