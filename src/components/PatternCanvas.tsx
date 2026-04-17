import React, { useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Grid3X3, Hash } from 'lucide-react';
import type { PatternData, AppSettings } from '../types';
import { isLightColor } from '../utils/colorUtils';

interface PatternCanvasProps {
  pattern: PatternData | null;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  highlightedColorId?: string | null;
}

const PatternCanvas: React.FC<PatternCanvasProps> = ({
  pattern,
  settings,
  onSettingsChange,
  highlightedColorId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  // 绘制图案
  const drawPattern = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pattern) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, pixels } = pattern;
    const pixelSize = 20; // 基础像素大小（显示用）

    // 设置画布大小
    canvas.width = width * pixelSize;
    canvas.height = height * pixelSize;

    // 清空画布
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制像素
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = pixels[y]?.[x];
        if (color) {
          const isHighlighted = highlightedColorId === color.id;
          const isDimmed = highlightedColorId && highlightedColorId !== color.id;

          ctx.fillStyle = `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;

          if (isDimmed) {
            ctx.globalAlpha = 0.3;
          } else if (isHighlighted) {
            ctx.globalAlpha = 1;
          } else {
            ctx.globalAlpha = 1;
          }

          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          ctx.globalAlpha = 1;

          // 绘制色号
          if (settings.showNumbers) {
            ctx.fillStyle = isLightColor(color.rgb) ? '#000000' : '#ffffff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              color.code,
              x * pixelSize + pixelSize / 2,
              y * pixelSize + pixelSize / 2
            );
          }
        }
      }
    }

    // 绘制网格
    if (settings.showGrid) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * pixelSize, 0);
        ctx.lineTo(x * pixelSize, height * pixelSize);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * pixelSize);
        ctx.lineTo(width * pixelSize, y * pixelSize);
        ctx.stroke();
      }
    }
  }, [pattern, settings.showGrid, settings.showNumbers, highlightedColorId]);

  useEffect(() => {
    drawPattern();
  }, [drawPattern]);

  const handleZoomIn = () => setScale((s) => Math.min(s * 1.2, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s / 1.2, 0.3));

  const toggleGrid = () => onSettingsChange({ ...settings, showGrid: !settings.showGrid });
  const toggleNumbers = () => onSettingsChange({ ...settings, showNumbers: !settings.showNumbers });

  if (!pattern) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Grid3X3 className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500">上传图片并点击"生成图纸"</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {pattern.width} × {pattern.height} 像素
          </span>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm text-gray-600">
            {pattern.brand} 色卡
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleGrid}
            className={`p-2 rounded-lg transition-colors ${
              settings.showGrid ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="显示网格"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleNumbers}
            className={`p-2 rounded-lg transition-colors ${
              settings.showNumbers ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="显示色号"
          >
            <Hash className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            title="缩小"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600 w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            title="放大"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 画布容器 */}
      <div
        ref={containerRef}
        className="overflow-auto p-4 bg-gray-50"
        style={{ maxHeight: '600px' }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease',
          }}
        >
          <canvas
            ref={canvasRef}
            className="canvas-container shadow-lg"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatternCanvas;
