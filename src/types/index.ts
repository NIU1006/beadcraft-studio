// 拼豆颜色定义
export interface BeadColor {
  id: string;           // 唯一标识
  brand: string;        // 品牌名称
  code: string;         // 色号
  name: string;         // 颜色名称
  rgb: [number, number, number];  // RGB值 [r, g, b]
  lab: [number, number, number];  // 预计算LAB值 [L, A, B]
}

// 图纸数据
export interface PatternData {
  width: number;        // 画板宽度（格子数）
  height: number;       // 画板高度（格子数）
  pixelSize: number;    // 像素尺寸(mm)
  brand: string;        // 使用品牌
  pixels: (BeadColor | null)[][]; // 二维颜色数组
  statistics: ColorStatistic[];
  originalImage?: string; // 原图base64
}

// 颜色统计
export interface ColorStatistic {
  color: BeadColor;
  count: number;
  percentage: number;
}

// 应用设置
export interface AppSettings {
  width: number;        // 画板宽度
  height: number;       // 画板高度
  pixelSize: number;    // 豆子大小 (5mm 或 2.6mm)
  brand: string;        // 当前品牌
  maxColors: number;    // 最大颜色数限制
  showGrid: boolean;    // 显示网格
  showNumbers: boolean; // 显示色号
  keepRatio: boolean;   // 保持比例
}

// 品牌信息
export interface BrandInfo {
  id: string;
  name: string;
  colors: BeadColor[];
}

// 导出选项
export interface ExportOptions {
  format: 'png' | 'pdf';
  includeOriginal: boolean;
  includeStats: boolean;
}
