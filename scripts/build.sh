#!/bin/bash
# 用途：构建生产版本
# 参数：无
# 输出：构建结果
# 退出码：0=成功，1=失败

set -e

cd "$(dirname "$0")/.."

echo "正在构建豆趣工坊..."

# 清理旧的构建
rm -rf dist

# 执行构建
npm run build

echo "构建完成，输出目录：dist/"
