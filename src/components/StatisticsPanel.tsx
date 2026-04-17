import React, { useRef, useEffect } from 'react';
import { BarChart, Download, ShoppingCart, Palette } from 'lucide-react';
import * as echarts from 'echarts';
import type { PatternData } from '../types';
import { getColorStyle } from '../utils/colorUtils';

interface StatisticsPanelProps {
  pattern: PatternData | null;
  onHighlightColor: (colorId: string | null) => void;
  highlightedColorId: string | null;
  onExportPNG: () => void;
  onExportPDF: () => void;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  pattern,
  onHighlightColor,
  highlightedColorId,
  onExportPNG,
  onExportPDF,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  // 初始化图表
  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  // 更新图表数据
  useEffect(() => {
    if (!pattern || !chartInstanceRef.current) return;

    const stats = pattern.statistics.slice(0, 10); // 取前10种颜色
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}颗' },
      },
      yAxis: {
        type: 'category',
        data: stats.map(s => s.color.name).reverse(),
        axisLabel: { fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: stats.map(s => ({
            value: s.count,
            itemStyle: {
              color: `rgb(${s.color.rgb[0]}, ${s.color.rgb[1]}, ${s.color.rgb[2]})`,
            },
          })).reverse(),
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
          },
        },
      ],
    };

    chartInstanceRef.current.setOption(option);
  }, [pattern]);

  // 生成购物清单
  const generateShoppingList = () => {
    if (!pattern) return '';

    const lines = [
      '=== 豆趣工坊 - 拼豆购物清单 ===',
      `画板尺寸: ${pattern.width} × ${pattern.height}`,
      `使用品牌: ${pattern.brand}`,
      `豆子规格: ${pattern.pixelSize}mm`,
      '',
      '颜色清单:',
      ...pattern.statistics.map((s, i) =>
        `${i + 1}. ${s.color.code} ${s.color.name} - ${s.count}颗 (${s.percentage}%)`
      ),
      '',
      `总计: ${pattern.statistics.reduce((sum, s) => sum + s.count, 0)} 颗`,
    ];

    return lines.join('\n');
  };

  const copyShoppingList = () => {
    const list = generateShoppingList();
    navigator.clipboard.writeText(list).then(() => {
      alert('购物清单已复制到剪贴板');
    });
  };

  if (!pattern) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-800">材料统计</h2>
        </div>
        <p className="text-gray-500 text-sm">生成图纸后查看统计</p>
      </div>
    );
  }

  const totalBeads = pattern.statistics.reduce((sum, s) => sum + s.count, 0);
  const colorCount = pattern.statistics.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-800">材料统计</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onExportPNG}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            PNG
          </button>
          <button
            onClick={onExportPDF}
            className="px-3 py-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{totalBeads}</p>
          <p className="text-xs text-gray-500">总颗数</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{colorCount}</p>
          <p className="text-xs text-gray-500">颜色数</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">
            {Math.ceil(totalBeads / 1000)}
          </p>
          <p className="text-xs text-gray-500">预估包数(1k/包)</p>
        </div>
      </div>

      {/* 颜色分布图表 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">颜色分布 (前10)</h3>
        <div ref={chartRef} className="w-full h-48" />
      </div>

      {/* 颜色列表 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">颜色详情</h3>
        </div>
        <div className="max-h-64 overflow-y-auto border border-gray-100 rounded-lg">
          {pattern.statistics.map((stat) => (
            <div
              key={stat.color.id}
              className={`flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                highlightedColorId === stat.color.id ? 'bg-primary-50 ring-1 ring-primary-200' : ''
              }`}
              onMouseEnter={() => onHighlightColor(stat.color.id)}
              onMouseLeave={() => onHighlightColor(null)}
            >
              <div
                className="w-8 h-8 rounded-lg border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: getColorStyle(stat.color.rgb) }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {stat.color.code} {stat.color.name}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{stat.count}</p>
                <p className="text-xs text-gray-400">颗</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 购物清单按钮 */}
      <button
        onClick={copyShoppingList}
        className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        复制购物清单
      </button>
    </div>
  );
};

export default StatisticsPanel;
