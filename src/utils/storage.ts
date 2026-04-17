import type { AppSettings } from '../types';

const STORAGE_KEY = 'beadcraft-settings';

export const defaultSettings: AppSettings = {
  width: 50,
  height: 50,
  pixelSize: 5,
  brand: 'Mard',
  maxColors: 50,
  showGrid: true,
  showNumbers: false,
  keepRatio: true,
};

export function loadSettings(): AppSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch {
    // 忽略存储错误
  }
  return defaultSettings;
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // 忽略存储错误
  }
}
