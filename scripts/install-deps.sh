#!/bin/bash
# 用途：安装项目依赖
# 参数：无
# 输出：安装结果
# 退出码：0=成功，1=失败

set -e

cd "$(dirname "$0")/.."

echo "正在安装项目依赖..."

# 安装生产依赖
npm install tailwindcss @tailwindcss/vite
npm install echarts
npm install jspdf html2canvas
npm install lucide-react

# 安装开发依赖
npm install -D @types/node

echo "依赖安装完成"
