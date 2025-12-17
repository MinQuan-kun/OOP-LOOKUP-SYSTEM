#!/bin/bash
echo "========================================================"
echo "  🚀 KHỞI ĐỘNG HỆ THỐNG OOP LOOKUP SYSTEM (DOCKER)"
echo "========================================================"

# 1. Build
echo "🔧 [1/3] Đang build lại các service..."
docker compose build --no-cache

# 2. Up
echo "▶️ [2/3] Đang khởi động containers..."
docker compose up -d

# 3. Status
echo ""
echo "🧩 [3/3] Trạng thái container:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "--------------------------------------------------------"
echo "  ✅ SUCCESS! Hệ thống đã sẵn sàng:"
echo "  👉 Frontend:    http://localhost:3000"
echo "  👉 Backend API: http://localhost:5001"
echo "--------------------------------------------------------"
echo ""
echo "📜 Đang hiển thị logs (Nhấn Ctrl+C để thoát)..."
docker compose logs -f