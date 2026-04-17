#!/bin/bash
# 用途：初始化Vite+React+TypeScript项目
# 参数：无
# 输出：项目初始化结果
# 退出码：0=成功，1=失败

set -e

cd "$(dirname "$0")/.."

echo "正在初始化豆趣工坊项目..."

# 检查是否已存在项目
if [ -f "package.json" ]; then
    echo "项目已存在，跳过初始化"
    exit 0
fi

# 使用npm create vite初始化项目
echo "正在创建Vite项目..."
npm create vite@latest . -- --template react-ts --force

echo "项目初始化完成"
