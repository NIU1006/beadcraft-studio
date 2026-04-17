import type { BeadColor, ColorStatistic } from '../types';

/**
 * RGB 转 XYZ
 */
function rgbToXyz(r: number, g: number, b: number): [number, number, number] {
  // 归一化到 0-1
  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;

  // Gamma 校正
  rNorm = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
  gNorm = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
  bNorm = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

  // 转换到 XYZ (D65)
  const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
  const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.0721750;
  const z = rNorm * 0.0193339 + gNorm * 0.1191920 + bNorm * 0.9503041;

  return [x * 100, y * 100, z * 100];
}

/**
 * XYZ 转 LAB
 */
function xyzToLab(x: number, y: number, z: number): [number, number, number] {
  // D65 参考白点
  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  let l = x / refX;
  let a = y / refY;
  let b = z / refZ;

  l = l > 0.008856 ? Math.pow(l, 1 / 3) : (7.787 * l) + (16 / 116);
  a = a > 0.008856 ? Math.pow(a, 1 / 3) : (7.787 * a) + (16 / 116);
  b = b > 0.008856 ? Math.pow(b, 1 / 3) : (7.787 * b) + (16 / 116);

  const L = (116 * a) - 16;
  const A = 500 * (l - a);
  const B = 200 * (a - b);

  return [L, A, B];
}

/**
 * RGB 转 LAB
 */
export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  const [x, y, z] = rgbToXyz(r, g, b);
  return xyzToLab(x, y, z);
}

/**
 * CIE76 色差计算 (Delta E)
 */
export function deltaE(lab1: [number, number, number], lab2: [number, number, number]): number {
  const dL = lab1[0] - lab2[0];
  const dA = lab1[1] - lab2[1];
  const dB = lab1[2] - lab2[2];
  return Math.sqrt(dL * dL + dA * dA + dB * dB);
}

/**
 * 找到最接近的拼豆颜色
 */
export function findClosestColor(r: number, g: number, b: number, palette: BeadColor[]): BeadColor {
  const targetLab = rgbToLab(r, g, b);

  let closest = palette[0];
  let minDistance = Infinity;

  for (const color of palette) {
    const distance = deltaE(targetLab, color.lab);
    if (distance < minDistance) {
      minDistance = distance;
      closest = color;
    }
  }

  return closest;
}

/**
 * 生成颜色统计
 */
export function generateStatistics(pixels: (BeadColor | null)[][]): ColorStatistic[] {
  const countMap = new Map<string, { color: BeadColor; count: number }>();
  let total = 0;

  for (const row of pixels) {
    for (const pixel of row) {
      if (pixel) {
        const existing = countMap.get(pixel.id);
        if (existing) {
          existing.count++;
        } else {
          countMap.set(pixel.id, { color: pixel, count: 1 });
        }
        total++;
      }
    }
  }

  return Array.from(countMap.values())
    .map(({ color, count }) => ({
      color,
      count,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 将颜色数量限制到指定数量
 */
export function limitColors(pixels: (BeadColor | null)[][], maxColors: number, _palette: BeadColor[]): (BeadColor | null)[][] {
  const stats = generateStatistics(pixels);

  if (stats.length <= maxColors) {
    return pixels;
  }

  // 获取使用最多的N种颜色
  const topColors = new Set(stats.slice(0, maxColors).map(s => s.color.id));

  // 替换不在前N中的颜色
  return pixels.map(row =>
    row.map(pixel => {
      if (!pixel || topColors.has(pixel.id)) {
        return pixel;
      }
      // 找到最接近的前N种颜色
      let closest = stats[0].color;
      let minDistance = Infinity;

      for (const stat of stats.slice(0, maxColors)) {
        const distance = deltaE(pixel.lab, stat.color.lab);
        if (distance < minDistance) {
          minDistance = distance;
          closest = stat.color;
        }
      }

      return closest;
    })
  );
}

/**
 * 将ImageData转换为像素颜色数组
 */
export function imageDataToPixels(
  imageData: ImageData,
  targetWidth: number,
  targetHeight: number,
  palette: BeadColor[],
  keepRatio: boolean
): (BeadColor | null)[][] {
  const { width: srcWidth, height: srcHeight, data } = imageData;

  // 计算缩放比例
  let scaleX = srcWidth / targetWidth;
  let scaleY = srcHeight / targetHeight;

  if (keepRatio) {
    const scale = Math.max(scaleX, scaleY);
    scaleX = scaleY = scale;
  }

  const result: (BeadColor | null)[][] = [];

  for (let y = 0; y < targetHeight; y++) {
    const row: (BeadColor | null)[] = [];
    for (let x = 0; x < targetWidth; x++) {
      // 计算源图像位置（中心采样）
      const srcX = Math.min(Math.floor(x * scaleX + scaleX / 2), srcWidth - 1);
      const srcY = Math.min(Math.floor(y * scaleY + scaleY / 2), srcHeight - 1);

      // 获取像素颜色
      const idx = (srcY * srcWidth + srcX) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // 透明度低于阈值则设为空
      if (a < 128) {
        row.push(null);
      } else {
        row.push(findClosestColor(r, g, b, palette));
      }
    }
    result.push(row);
  }

  return result;
}

/**
 * 获取颜色显示样式
 */
export function getColorStyle(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * 判断颜色亮度（用于决定文字颜色）
 */
export function isLightColor(rgb: [number, number, number]): boolean {
  // 使用相对亮度公式
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5;
}
