@echo off
echo ========================================================
echo   KHOI DONG HE THONG OOP LOOKUP SYSTEM (DOCKER)
echo ========================================================

:: 1. Build lại image (không cache để cập nhật code mới nhất)
echo [1/3] Dang build lai cac service...
docker compose build --no-cache

:: 2. Khởi chạy container
echo [2/3] Dang khoi dong MongoDB, Backend va Frontend...
docker compose up -d

:: 3. Kiểm tra trạng thái
echo.
echo [3/3] Trang thai container:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo --------------------------------------------------------
echo   SUCCESS! He thong da san sang:
echo   - Frontend:    http://localhost:3000
echo   - Backend API: http://localhost:5001
echo --------------------------------------------------------
echo.
echo Dang hien thi logs (Nhan Ctrl+C de thoat)...
docker compose logs -f
pause