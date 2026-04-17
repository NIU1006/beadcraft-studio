import React from 'react';
import { Settings, Grid3X3, Palette, Maximize, Lock } from 'lucide-react';
import type { AppSettings } from '../types';
import { getAvailableBrands } from '../data/colors';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  disabled?: boolean;
}

const PRESET_SIZES = [
  { label: '52×52 小板', width: 52, height: 52 },
  { label: '78×78 中板', width: 78, height: 78 },
  { label: '104×104 大板', width: 104, height: 104 },
  { label: '自定义', width: 'custom', height: 'custom' },
] as const;

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  disabled = false,
}) => {
  const brands = getAvailableBrands();
  const [isCustom, setIsCustom] = React.useState(false);

  const handleChange = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-800">参数设置</h2>
      </div>

      {/* 预设尺寸 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          快速选择
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_SIZES.map((preset) => {
            const isCustomPreset = preset.width === 'custom';
            const isActive = isCustomPreset
              ? isCustom
              : !isCustom && settings.width === preset.width && settings.height === preset.height;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  if (isCustomPreset) {
                    // 自定义选项：清空宽高，让用户自行输入
                    setIsCustom(true);
                    onSettingsChange({
                      ...settings,
                      width: 0,
                      height: 0,
                    });
                    return;
                  }
                  setIsCustom(false);
                  onSettingsChange({
                    ...settings,
                    width: preset.width as number,
                    height: preset.height as number,
                  });
                }}
                disabled={disabled}
                className={`
                  px-3 py-2 text-sm rounded-lg border transition-colors
                  ${isActive
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }
                `}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 画板尺寸 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Grid3X3 className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">豆板尺寸</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className={`block text-xs mb-1 ${isCustom ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
              宽 {isCustom && <span className="text-red-500">请自行输入</span>}
            </label>
            <input
              type="number"
              min={5}
              max={200}
              value={settings.width || ''}
              placeholder={isCustom ? '请输入' : ''}
              onChange={(e) => {
                setIsCustom(false);
                const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                handleChange('width', isNaN(value) ? 0 : value);
              }}
              disabled={disabled}
              className={`
                w-full px-3 py-2 border rounded-lg focus:ring-2
                ${isCustom
                  ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                }
              `}
            />
          </div>
          <span className="text-gray-400 pt-5">×</span>
          <div className="flex-1">
            <label className={`block text-xs mb-1 ${isCustom ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
              高 {isCustom && <span className="text-red-500">请自行输入</span>}
            </label>
            <input
              type="number"
              min={5}
              max={200}
              value={settings.height || ''}
              placeholder={isCustom ? '请输入' : ''}
              onChange={(e) => {
                setIsCustom(false);
                const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                handleChange('height', isNaN(value) ? 0 : value);
              }}
              disabled={disabled}
              className={`
                w-full px-3 py-2 border rounded-lg focus:ring-2
                ${isCustom
                  ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                }
              `}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="keep-ratio"
            checked={settings.keepRatio}
            onChange={(e) => handleChange('keepRatio', e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <label htmlFor="keep-ratio" className="text-sm text-gray-600 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            保持原图比例
          </label>
        </div>
      </div>

      {/* 豆子大小 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Maximize className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">豆子尺寸</label>
        </div>
        <div className="flex gap-2">
          {[2.6, 5].map((size) => (
            <button
              key={size}
              onClick={() => handleChange('pixelSize', size)}
              disabled={disabled}
              className={`
                flex-1 px-4 py-2 text-sm rounded-lg border transition-colors
                ${settings.pixelSize === size
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }
              `}
            >
              {size}mm
            </button>
          ))}
        </div>
      </div>

      {/* 品牌选择 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">拼豆品牌</label>
        </div>
        <select
          value={settings.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* 颜色限制 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          最大颜色数: {settings.maxColors}
        </label>
        <input
          type="range"
          min={2}
          max={50}
          value={settings.maxColors}
          onChange={(e) => handleChange('maxColors', parseInt(e.target.value))}
          disabled={disabled}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
