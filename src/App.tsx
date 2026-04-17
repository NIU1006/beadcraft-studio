import { useState, useCallback } from 'react';
import { Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';
import type { PatternData, AppSettings } from './types';
import { getBrandColors } from './data/colors';
import { imageDataToPixels, generateStatistics, limitColors } from './utils/colorUtils';
import { loadSettings, saveSettings } from './utils/storage';
import UploadArea from './components/UploadArea';
import SettingsPanel from './components/SettingsPanel';
import PatternCanvas from './components/PatternCanvas';
import StatisticsPanel from './components/StatisticsPanel';
import jsPDF from 'jspdf';

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>(loadSettings());
  const [pattern, setPattern] = useState<PatternData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [highlightedColorId, setHighlightedColorId] = useState<string | null>(null);

  // 处理图片上传
  const handleImageUpload = useCallback((url: string) => {
    setImageUrl(url);
    setPattern(null);
  }, []);

  // 更新设置
  const handleSettingsChange = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, []);

  // 生成图纸
  const generatePattern = useCallback(async () => {
    if (!imageUrl) return;

    setIsProcessing(true);

    try {
      // 加载图片
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageUrl;
      });

      // 创建临时画布处理图片
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) throw new Error('无法创建画布上下文');

      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);

      // 获取图片数据
      const imageData = tempCtx.getImageData(0, 0, img.width, img.height);

      // 获取色板
      const palette = getBrandColors(settings.brand);

      // 转换为像素
      let pixels = imageDataToPixels(
        imageData,
        settings.width,
        settings.height,
        palette,
        settings.keepRatio
      );

      // 限制颜色数量
      if (settings.maxColors < palette.length) {
        pixels = limitColors(pixels, settings.maxColors, palette);
      }

      // 生成统计
      const statistics = generateStatistics(pixels);

      // 创建图案数据
      const newPattern: PatternData = {
        width: settings.width,
        height: settings.height,
        pixelSize: settings.pixelSize,
        brand: settings.brand,
        pixels,
        statistics,
        originalImage: imageUrl,
      };

      setPattern(newPattern);
    } catch (error) {
      console.error('生成图纸失败:', error);
      alert('生成图纸失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  }, [imageUrl, settings]);

  // 导出PNG
  const exportPNG = useCallback(() => {
    if (!pattern) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelSize = 20;
    const padding = 40;
    const headerHeight = 80;
    const footerHeight = 60;

    canvas.width = pattern.width * pixelSize + padding * 2;
    canvas.height = pattern.height * pixelSize + headerHeight + footerHeight + padding * 2;

    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制标题
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('豆趣工坊 - 拼豆图纸', canvas.width / 2, 40);

    // 绘制信息
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(
      `${pattern.width} × ${pattern.height} | ${pattern.brand} | ${pattern.pixelSize}mm`,
      canvas.width / 2,
      70
    );

    // 绘制像素
    for (let y = 0; y < pattern.height; y++) {
      for (let x = 0; x < pattern.width; x++) {
        const color = pattern.pixels[y]?.[x];
        if (color) {
          ctx.fillStyle = `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;
          ctx.fillRect(
            padding + x * pixelSize,
            headerHeight + padding + y * pixelSize,
            pixelSize,
            pixelSize
          );

          // 绘制网格
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(
            padding + x * pixelSize,
            headerHeight + padding + y * pixelSize,
            pixelSize,
            pixelSize
          );

          // 绘制色号
          if (settings.showNumbers) {
            const luminance = (0.299 * color.rgb[0] + 0.587 * color.rgb[1] + 0.114 * color.rgb[2]) / 255;
            ctx.fillStyle = luminance > 0.5 ? '#000000' : '#ffffff';
            ctx.font = '8px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              color.code,
              padding + x * pixelSize + pixelSize / 2,
              headerHeight + padding + y * pixelSize + pixelSize / 2
            );
          }
        }
      }
    }

    // 绘制底部统计
    const bottomY = headerHeight + padding + pattern.height * pixelSize + 40;
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`颜色数: ${pattern.statistics.length} 种`, padding, bottomY);
    ctx.fillText(
      `总颗数: ${pattern.statistics.reduce((sum, s) => sum + s.count, 0)} 颗`,
      padding + 120,
      bottomY
    );

    // 下载
    const link = document.createElement('a');
    link.download = `拼豆图纸_${pattern.width}x${pattern.height}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [pattern, settings.showNumbers]);

  // 导出PDF
  const exportPDF = useCallback(() => {
    if (!pattern) return;

    const pdf = new jsPDF({
      orientation: pattern.width > pattern.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 标题
    pdf.setFontSize(20);
    pdf.setTextColor(31, 41, 55);
    pdf.text('豆趣工坊 - 拼豆图纸', pageWidth / 2, 15, { align: 'center' });

    // 信息
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(
      `${pattern.width} × ${pattern.height} | ${pattern.brand} | ${pattern.pixelSize}mm`,
      pageWidth / 2,
      22,
      { align: 'center' }
    );

    // 计算图纸显示区域
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - 60;

    const pixelSize = Math.min(
      maxWidth / pattern.width,
      maxHeight / pattern.height,
      5 // 最大5mm每格
    );

    const gridWidth = pattern.width * pixelSize;
    const gridHeight = pattern.height * pixelSize;
    const offsetX = (pageWidth - gridWidth) / 2;
    const offsetY = 35;

    // 绘制格子
    for (let y = 0; y < pattern.height; y++) {
      for (let x = 0; x < pattern.width; x++) {
        const color = pattern.pixels[y]?.[x];
        if (color) {
          pdf.setFillColor(color.rgb[0], color.rgb[1], color.rgb[2]);
          pdf.rect(
            offsetX + x * pixelSize,
            offsetY + y * pixelSize,
            pixelSize,
            pixelSize,
            'F'
          );
        }
      }
    }

    // 绘制网格线
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.1);
    for (let x = 0; x <= pattern.width; x++) {
      pdf.line(
        offsetX + x * pixelSize,
        offsetY,
        offsetX + x * pixelSize,
        offsetY + gridHeight
      );
    }
    for (let y = 0; y <= pattern.height; y++) {
      pdf.line(
        offsetX,
        offsetY + y * pixelSize,
        offsetX + gridWidth,
        offsetY + y * pixelSize
      );
    }

    // 颜色列表
    const statsY = offsetY + gridHeight + 15;
    pdf.setFontSize(12);
    pdf.setTextColor(31, 41, 55);
    pdf.text('颜色清单', margin, statsY);

    pdf.setFontSize(8);
    let currentY = statsY + 8;
    let currentX = margin;

    pattern.statistics.forEach((stat) => {
      if (currentY > pageHeight - 10) {
        pdf.addPage();
        currentY = 20;
      }

      // 颜色块
      pdf.setFillColor(stat.color.rgb[0], stat.color.rgb[1], stat.color.rgb[2]);
      pdf.rect(currentX, currentY - 3, 4, 4, 'F');

      // 文字
      pdf.setTextColor(75, 85, 99);
      pdf.text(
        `${stat.color.code} ${stat.color.name}: ${stat.count}颗 (${stat.percentage}%)`,
        currentX + 6,
        currentY
      );

      currentY += 5;
    });

    pdf.save(`拼豆图纸_${pattern.width}x${pattern.height}_${Date.now()}.pdf`);
  }, [pattern]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">豆趣工坊</h1>
                <p className="text-xs text-gray-500">BeadCraft Studio</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                使用帮助
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：上传和设置 */}
          <div className="lg:col-span-4 space-y-6">
            {/* 上传区域 */}
            <UploadArea
              onImageUpload={handleImageUpload}
              hasImage={!!imageUrl}
            />

            {/* 原图预览 */}
            {imageUrl && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-700">原图预览</h3>
                </div>
                <img
                  src={imageUrl}
                  alt="上传的图片"
                  className="w-full h-48 object-contain rounded-lg bg-gray-50"
                />
              </div>
            )}

            {/* 设置面板 */}
            <SettingsPanel
              settings={settings}
              onSettingsChange={handleSettingsChange}
              disabled={isProcessing}
            />

            {/* 生成按钮 */}
            <button
              onClick={generatePattern}
              disabled={!imageUrl || isProcessing}
              className={`
                w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all
                ${!imageUrl || isProcessing
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
                }
              `}
            >
              <Wand2 className="w-5 h-5" />
              {isProcessing ? '生成中...' : '生成图纸'}
            </button>
          </div>

          {/* 右侧：画布和统计 */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* 图案画布 */}
              <div className="xl:col-span-2">
                <PatternCanvas
                  pattern={pattern}
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                  highlightedColorId={highlightedColorId}
                />
              </div>

              {/* 统计面板 */}
              <div className="xl:col-span-1">
                <StatisticsPanel
                  pattern={pattern}
                  onHighlightColor={setHighlightedColorId}
                  highlightedColorId={highlightedColorId}
                  onExportPNG={exportPNG}
                  onExportPDF={exportPDF}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            豆趣工坊 BeadCraft Studio · 让拼豆创作更简单
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
