# 豆趣工坊 (BeadCraft Studio)

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://pindou-zeta.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🎨 让拼豆创作更简单 —— 上传图片，自动生成拼豆图纸

![豆趣工坊预览](https://pindou-zeta.vercel.app/preview.png)

## 在线体验

🔗 **https://pindou-zeta.vercel.app**

## 功能特性

- 📤 **图片上传** — 支持拖拽/点击上传，自动转换像素图
- 🎨 **智能配色** — CIE76 色差算法匹配最接近的拼豆颜色
- 📐 **标准豆板** — 预设 52×52 / 78×78 / 104×104 标准规格
- 🏷️ **多品牌支持** — Mard、漫漫拼豆、DODO 等品牌色卡
- 📊 **材料统计** — 自动统计各色豆子用量，生成购物清单
- 💾 **图纸下载** — 支持 PNG / PDF 格式导出
- 🔍 **交互预览** — 缩放查看、网格显示、色号标注

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **图表库**: ECharts
- **PDF导出**: jsPDF
- **颜色算法**: CIE76 Delta E

## 快速开始

```bash
# 克隆项目
git clone https://github.com/NIU1006/beadcraft-studio.git
cd beadcraft-studio

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
beadcraft-studio/
├── src/
│   ├── components/      # React 组件
│   │   ├── UploadArea.tsx      # 图片上传
│   │   ├── SettingsPanel.tsx   # 参数设置
│   │   ├── PatternCanvas.tsx   # 图案画布
│   │   └── StatisticsPanel.tsx # 统计面板
│   ├── data/
│   │   └── colors.ts    # 色卡数据
│   ├── types/
│   │   └── index.ts     # TypeScript 类型
│   ├── utils/
│   │   ├── colorUtils.ts   # 颜色算法
│   │   └── storage.ts      # 本地存储
│   ├── App.tsx          # 主应用
│   └── main.tsx         # 应用入口
├── dist/                # 构建输出
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## 颜色匹配算法

本项目使用 CIE76 色差公式（Delta E 1976）进行颜色匹配：

1. 将 RGB 颜色转换为 LAB 颜色空间
2. 计算目标颜色与所有色卡颜色的欧氏距离
3. 选择距离最小的颜色作为匹配结果

```typescript
// Delta E 计算公式
ΔE = √(ΔL² + Δa² + Δb²)
```

## 支持的拼豆品牌

| 品牌 | 色号数量 | 特点 |
|------|---------|------|
| Mard | 50色 | 颜色丰富，品质稳定 |
| 漫漫拼豆 | 40色 | 国产性价比之选 |
| DODO拼豆 | 40色 | 颜色鲜艳，色彩多样 |

## 标准豆板规格

| 规格 | 尺寸 | 适用场景 |
|------|------|---------|
| 小板 | 52×52 | 小图案、钥匙扣 |
| 中板 | 78×78 | 中等作品、杯垫 |
| 大板 | 104×104 | 大型作品、装饰画 |
| 自定义 | 任意 | 特殊尺寸需求 |

## 导出格式

- **PNG** — 高清图片，适合屏幕查看和社交分享
- **PDF** — 矢量格式，适合打印制作，包含颜色清单

## 浏览器支持

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 更新日志

### v1.0.0 (2025-04-17)

- ✨ 首次发布
- 🎨 支持多品牌色卡切换
- 📐 预设标准豆板规格
- 💾 PNG/PDF 导出功能
- 📊 材料统计与购物清单

## 开发计划

- [ ] 用户自定义色卡导入
- [ ] 颜色手动微调功能
- [ ] 大图分块打印支持
- [ ] 社区作品分享功能

## 反馈与建议

如有问题或建议，欢迎提交 Issue 或 Pull Request。

## License

[MIT](LICENSE) © 2025 豆趣工坊
