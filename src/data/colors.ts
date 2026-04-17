import type { BeadColor } from '../types';

// 基于PDF提取的色卡数据 - Mard品牌（常用50色）
export const mardColors: BeadColor[] = [
  // 黑白灰
  { id: 'mard-01', brand: 'Mard', code: 'H1', name: 'White', rgb: [255, 255, 255], lab: [100, 0, 0] },
  { id: 'mard-02', brand: 'Mard', code: 'H2', name: 'Cream', rgb: [255, 248, 220], lab: [97, -2, 10] },
  { id: 'mard-03', brand: 'Mard', code: 'H3', name: 'Light Gray', rgb: [211, 211, 211], lab: [84, 0, 0] },
  { id: 'mard-04', brand: 'Mard', code: 'H4', name: 'Gray', rgb: [169, 169, 169], lab: [69, 0, 0] },
  { id: 'mard-05', brand: 'Mard', code: 'H5', name: 'Dark Gray', rgb: [105, 105, 105], lab: [45, 0, 0] },
  { id: 'mard-06', brand: 'Mard', code: 'H6', name: 'Black', rgb: [30, 30, 30], lab: [12, 0, 0] },

  // 红色系
  { id: 'mard-07', brand: 'Mard', code: 'H7', name: 'Light Pink', rgb: [255, 182, 193], lab: [80, 20, 5] },
  { id: 'mard-08', brand: 'Mard', code: 'H8', name: 'Pink', rgb: [255, 105, 180], lab: [65, 40, 5] },
  { id: 'mard-09', brand: 'Mard', code: 'H9', name: 'Hot Pink', rgb: [255, 20, 147], lab: [55, 70, 10] },
  { id: 'mard-10', brand: 'Mard', code: 'H10', name: 'Red', rgb: [255, 0, 0], lab: [53, 80, 67] },
  { id: 'mard-11', brand: 'Mard', code: 'H11', name: 'Dark Red', rgb: [139, 0, 0], lab: [30, 50, 35] },
  { id: 'mard-12', brand: 'Mard', code: 'H12', name: 'Maroon', rgb: [128, 0, 0], lab: [25, 45, 30] },

  // 橙色系
  { id: 'mard-13', brand: 'Mard', code: 'H13', name: 'Peach', rgb: [255, 218, 185], lab: [90, 8, 20] },
  { id: 'mard-14', brand: 'Mard', code: 'H14', name: 'Light Orange', rgb: [255, 200, 100], lab: [85, 10, 55] },
  { id: 'mard-15', brand: 'Mard', code: 'H15', name: 'Orange', rgb: [255, 165, 0], lab: [75, 25, 75] },
  { id: 'mard-16', brand: 'Mard', code: 'H16', name: 'Dark Orange', rgb: [255, 140, 0], lab: [70, 30, 75] },
  { id: 'mard-17', brand: 'Mard', code: 'H17', name: 'Burnt Orange', rgb: [204, 85, 0], lab: [55, 35, 55] },

  // 黄色系
  { id: 'mard-18', brand: 'Mard', code: 'H18', name: 'Light Yellow', rgb: [255, 255, 224], lab: [98, -5, 20] },
  { id: 'mard-19', brand: 'Mard', code: 'H19', name: 'Yellow', rgb: [255, 255, 0], lab: [97, -20, 90] },
  { id: 'mard-20', brand: 'Mard', code: 'H20', name: 'Golden Yellow', rgb: [255, 215, 0], lab: [87, 5, 85] },
  { id: 'mard-21', brand: 'Mard', code: 'H21', name: 'Mustard', rgb: [255, 173, 0], lab: [78, 10, 80] },
  { id: 'mard-22', brand: 'Mard', code: 'H22', name: 'Brown', rgb: [139, 69, 19], lab: [42, 25, 40] },
  { id: 'mard-23', brand: 'Mard', code: 'H23', name: 'Dark Brown', rgb: [101, 67, 33], lab: [32, 15, 30] },
  { id: 'mard-24', brand: 'Mard', code: 'H24', name: 'Tan', rgb: [210, 180, 140], lab: [75, 5, 25] },

  // 绿色系
  { id: 'mard-25', brand: 'Mard', code: 'H25', name: 'Light Green', rgb: [144, 238, 144], lab: [88, -35, 35] },
  { id: 'mard-26', brand: 'Mard', code: 'H26', name: 'Mint', rgb: [152, 255, 152], lab: [90, -45, 30] },
  { id: 'mard-27', brand: 'Mard', code: 'H27', name: 'Lime Green', rgb: [50, 205, 50], lab: [75, -55, 65] },
  { id: 'mard-28', brand: 'Mard', code: 'H28', name: 'Green', rgb: [0, 128, 0], lab: [45, -50, 45] },
  { id: 'mard-29', brand: 'Mard', code: 'H29', name: 'Dark Green', rgb: [0, 100, 0], lab: [35, -40, 35] },
  { id: 'mard-30', brand: 'Mard', code: 'H30', name: 'Forest Green', rgb: [34, 139, 34], lab: [50, -45, 45] },
  { id: 'mard-31', brand: 'Mard', code: 'H31', name: 'Olive Green', rgb: [107, 142, 35], lab: [55, -15, 50] },

  // 青色系
  { id: 'mard-32', brand: 'Mard', code: 'H32', name: 'Aqua', rgb: [0, 255, 255], lab: [90, -45, -15] },
  { id: 'mard-33', brand: 'Mard', code: 'H33', name: 'Teal', rgb: [0, 128, 128], lab: [50, -30, -10] },
  { id: 'mard-34', brand: 'Mard', code: 'H34', name: 'Turquoise', rgb: [64, 224, 208], lab: [80, -35, -5] },

  // 蓝色系
  { id: 'mard-35', brand: 'Mard', code: 'H35', name: 'Light Blue', rgb: [173, 216, 230], lab: [85, -10, -20] },
  { id: 'mard-36', brand: 'Mard', code: 'H36', name: 'Sky Blue', rgb: [135, 206, 235], lab: [80, -10, -30] },
  { id: 'mard-37', brand: 'Mard', code: 'H37', name: 'Blue', rgb: [0, 0, 255], lab: [32, 80, -107] },
  { id: 'mard-38', brand: 'Mard', code: 'H38', name: 'Dark Blue', rgb: [0, 0, 139], lab: [15, 45, -60] },
  { id: 'mard-39', brand: 'Mard', code: 'H39', name: 'Navy Blue', rgb: [0, 0, 128], lab: [12, 40, -55] },
  { id: 'mard-40', brand: 'Mard', code: 'H40', name: 'Royal Blue', rgb: [65, 105, 225], lab: [45, 25, -60] },

  // 紫色系
  { id: 'mard-41', brand: 'Mard', code: 'H41', name: 'Lavender', rgb: [230, 230, 250], lab: [92, 5, -10] },
  { id: 'mard-42', brand: 'Mard', code: 'H42', name: 'Light Purple', rgb: [221, 160, 221], lab: [72, 30, -20] },
  { id: 'mard-43', brand: 'Mard', code: 'H43', name: 'Purple', rgb: [128, 0, 128], lab: [35, 65, -45] },
  { id: 'mard-44', brand: 'Mard', code: 'H44', name: 'Dark Purple', rgb: [75, 0, 130], lab: [20, 50, -50] },
  { id: 'mard-45', brand: 'Mard', code: 'H45', name: 'Magenta', rgb: [255, 0, 255], lab: [60, 90, -60] },

  // 特殊色
  { id: 'mard-46', brand: 'Mard', code: 'H46', name: 'Pastel Blue', rgb: [174, 198, 207], lab: [80, -5, -10] },
  { id: 'mard-47', brand: 'Mard', code: 'H47', name: 'Pastel Green', rgb: [170, 240, 170], lab: [90, -30, 20] },
  { id: 'mard-48', brand: 'Mard', code: 'H48', name: 'Pastel Pink', rgb: [255, 209, 220], lab: [88, 10, 5] },
  { id: 'mard-49', brand: 'Mard', code: 'H49', name: 'Beige', rgb: [245, 245, 220], lab: [96, -3, 15] },
  { id: 'mard-50', brand: 'Mard', code: 'H50', name: 'Coral', rgb: [255, 127, 80], lab: [67, 40, 40] },
];

// 漫漫拼豆 - 40色常用色
export const manmanColors: BeadColor[] = [
  { id: 'mm-01', brand: '漫漫', code: 'A1', name: '白色', rgb: [255, 255, 255], lab: [100, 0, 0] },
  { id: 'mm-02', brand: '漫漫', code: 'A2', name: '黑色', rgb: [25, 25, 25], lab: [10, 0, 0] },
  { id: 'mm-03', brand: '漫漫', code: 'A3', name: '浅灰', rgb: [200, 200, 200], lab: [80, 0, 0] },
  { id: 'mm-04', brand: '漫漫', code: 'A4', name: '深灰', rgb: [80, 80, 80], lab: [35, 0, 0] },
  { id: 'mm-05', brand: '漫漫', code: 'A5', name: '大红', rgb: [255, 0, 0], lab: [53, 80, 67] },
  { id: 'mm-06', brand: '漫漫', code: 'A6', name: '粉红', rgb: [255, 192, 203], lab: [80, 25, 5] },
  { id: 'mm-07', brand: '漫漫', code: 'A7', name: '玫红', rgb: [255, 0, 128], lab: [60, 75, 10] },
  { id: 'mm-08', brand: '漫漫', code: 'A8', name: '橙色', rgb: [255, 165, 0], lab: [75, 25, 75] },
  { id: 'mm-09', brand: '漫漫', code: 'A9', name: '黄色', rgb: [255, 255, 0], lab: [97, -20, 90] },
  { id: 'mm-10', brand: '漫漫', code: 'A10', name: '浅黄', rgb: [255, 255, 150], lab: [98, -10, 50] },
  { id: 'mm-11', brand: '漫漫', code: 'A11', name: '绿色', rgb: [0, 128, 0], lab: [45, -50, 45] },
  { id: 'mm-12', brand: '漫漫', code: 'A12', name: '草绿', rgb: [100, 200, 50], lab: [75, -40, 55] },
  { id: 'mm-13', brand: '漫漫', code: 'A13', name: '深绿', rgb: [0, 80, 0], lab: [30, -35, 30] },
  { id: 'mm-14', brand: '漫漫', code: 'A14', name: '青色', rgb: [0, 255, 255], lab: [90, -45, -15] },
  { id: 'mm-15', brand: '漫漫', code: 'A15', name: '蓝色', rgb: [0, 0, 255], lab: [32, 80, -107] },
  { id: 'mm-16', brand: '漫漫', code: 'A16', name: '深蓝', rgb: [0, 0, 139], lab: [15, 45, -60] },
  { id: 'mm-17', brand: '漫漫', code: 'A17', name: '紫色', rgb: [128, 0, 128], lab: [35, 65, -45] },
  { id: 'mm-18', brand: '漫漫', code: 'A18', name: '浅紫', rgb: [200, 150, 200], lab: [68, 25, -20] },
  { id: 'mm-19', brand: '漫漫', code: 'A19', name: '棕色', rgb: [139, 69, 19], lab: [42, 25, 40] },
  { id: 'mm-20', brand: '漫漫', code: 'A20', name: '肤色', rgb: [255, 220, 180], lab: [90, 8, 20] },
  { id: 'mm-21', brand: '漫漫', code: 'A21', name: '天蓝', rgb: [135, 206, 235], lab: [80, -10, -30] },
  { id: 'mm-22', brand: '漫漫', code: 'A22', name: '桃红', rgb: [255, 105, 180], lab: [65, 60, 5] },
  { id: 'mm-23', brand: '漫漫', code: 'A23', name: '土黄', rgb: [210, 180, 100], lab: [75, 5, 45] },
  { id: 'mm-24', brand: '漫漫', code: 'A24', name: '咖啡', rgb: [111, 78, 55], lab: [35, 10, 20] },
  { id: 'mm-25', brand: '漫漫', code: 'A25', name: '奶白', rgb: [255, 248, 220], lab: [97, -2, 10] },
  { id: 'mm-26', brand: '漫漫', code: 'A26', name: '西瓜红', rgb: [255, 100, 100], lab: [65, 50, 35] },
  { id: 'mm-27', brand: '漫漫', code: 'A27', name: '鹅黄', rgb: [255, 240, 150], lab: [94, -5, 40] },
  { id: 'mm-28', brand: '漫漫', code: 'A28', name: '墨绿', rgb: [0, 60, 0], lab: [22, -28, 22] },
  { id: 'mm-29', brand: '漫漫', code: 'A29', name: '湖蓝', rgb: [0, 150, 200], lab: [60, -20, -35] },
  { id: 'mm-30', brand: '漫漫', code: 'A30', name: '宝蓝', rgb: [0, 100, 200], lab: [45, 15, -55] },
  { id: 'mm-31', brand: '漫漫', code: 'A31', name: '藏青', rgb: [0, 50, 100], lab: [20, 10, -35] },
  { id: 'mm-32', brand: '漫漫', code: 'A32', name: '酒红', rgb: [128, 0, 50], lab: [28, 45, 10] },
  { id: 'mm-33', brand: '漫漫', code: 'A33', name: '藕荷', rgb: [230, 200, 210], lab: [83, 10, 0] },
  { id: 'mm-34', brand: '漫漫', code: 'A34', name: '卡其', rgb: [195, 176, 145], lab: [72, 2, 18] },
  { id: 'mm-35', brand: '漫漫', code: 'A35', name: '杏色', rgb: [255, 228, 196], lab: [91, 4, 15] },
  { id: 'mm-36', brand: '漫漫', code: 'A36', name: '金色', rgb: [255, 215, 0], lab: [87, 5, 85] },
  { id: 'mm-37', brand: '漫漫', code: 'A37', name: '银色', rgb: [192, 192, 192], lab: [78, 0, 0] },
  { id: 'mm-38', brand: '漫漫', code: 'A38', name: '荧光绿', rgb: [150, 255, 50], lab: [90, -55, 70] },
  { id: 'mm-39', brand: '漫漫', code: 'A39', name: '荧光粉', rgb: [255, 100, 200], lab: [70, 65, 10] },
  { id: 'mm-40', brand: '漫漫', code: 'A40', name: '荧光黄', rgb: [255, 255, 100], lab: [98, -15, 75] },
];

// DODO拼豆 - 40色
export const dodoColors: BeadColor[] = [
  { id: 'dodo-01', brand: 'DODO', code: 'D01', name: '纯白', rgb: [255, 255, 255], lab: [100, 0, 0] },
  { id: 'dodo-02', brand: 'DODO', code: 'D02', name: '纯黑', rgb: [20, 20, 20], lab: [8, 0, 0] },
  { id: 'dodo-03', brand: 'DODO', code: 'D03', name: '灰色', rgb: [150, 150, 150], lab: [62, 0, 0] },
  { id: 'dodo-04', brand: 'DODO', code: 'D04', name: '深灰', rgb: [90, 90, 90], lab: [38, 0, 0] },
  { id: 'dodo-05', brand: 'DODO', code: 'D05', name: '大红', rgb: [255, 25, 25], lab: [55, 75, 60] },
  { id: 'dodo-06', brand: 'DODO', code: 'D06', name: '粉红', rgb: [255, 180, 200], lab: [82, 20, 5] },
  { id: 'dodo-07', brand: 'DODO', code: 'D07', name: '桃红', rgb: [255, 80, 150], lab: [68, 60, 10] },
  { id: 'dodo-08', brand: 'DODO', code: 'D08', name: '橙色', rgb: [255, 140, 30], lab: [72, 30, 70] },
  { id: 'dodo-09', brand: 'DODO', code: 'D09', name: '金黄', rgb: [255, 200, 50], lab: [83, 10, 80] },
  { id: 'dodo-10', brand: 'DODO', code: 'D10', name: '柠檬黄', rgb: [255, 255, 80], lab: [97, -15, 85] },
  { id: 'dodo-11', brand: 'DODO', code: 'D11', name: '绿色', rgb: [50, 180, 50], lab: [65, -50, 50] },
  { id: 'dodo-12', brand: 'DODO', code: 'D12', name: '草绿', rgb: [120, 220, 80], lab: [82, -35, 55] },
  { id: 'dodo-13', brand: 'DODO', code: 'D13', name: '墨绿', rgb: [30, 100, 30], lab: [38, -35, 35] },
  { id: 'dodo-14', brand: 'DODO', code: 'D14', name: '青色', rgb: [50, 220, 220], lab: [82, -35, -10] },
  { id: 'dodo-15', brand: 'DODO', code: 'D15', name: '蓝色', rgb: [50, 100, 255], lab: [50, 40, -80] },
  { id: 'dodo-16', brand: 'DODO', code: 'D16', name: '深蓝', rgb: [30, 60, 150], lab: [28, 25, -55] },
  { id: 'dodo-17', brand: 'DODO', code: 'D17', name: '紫色', rgb: [150, 50, 200], lab: [45, 55, -45] },
  { id: 'dodo-18', brand: 'DODO', code: 'D18', name: '浅紫', rgb: [200, 150, 230], lab: [70, 25, -25] },
  { id: 'dodo-19', brand: 'DODO', code: 'D19', name: '棕色', rgb: [160, 100, 50], lab: [48, 20, 40] },
  { id: 'dodo-20', brand: 'DODO', code: 'D20', name: '米色', rgb: [245, 230, 200], lab: [92, 2, 15] },
  { id: 'dodo-21', brand: 'DODO', code: 'D21', name: '肤色', rgb: [255, 210, 170], lab: [87, 10, 20] },
  { id: 'dodo-22', brand: 'DODO', code: 'D22', name: '天蓝', rgb: [150, 210, 255], lab: [83, -10, -25] },
  { id: 'dodo-23', brand: 'DODO', code: 'D23', name: '玫红', rgb: [230, 50, 150], lab: [55, 70, 5] },
  { id: 'dodo-24', brand: 'DODO', code: 'D24', name: '土黄', rgb: [200, 170, 100], lab: [72, 5, 35] },
  { id: 'dodo-25', brand: 'DODO', code: 'D25', name: '咖啡', rgb: [130, 90, 60], lab: [42, 12, 22] },
  { id: 'dodo-26', brand: 'DODO', code: 'D26', name: '肉粉', rgb: [255, 200, 190], lab: [85, 12, 10] },
  { id: 'dodo-27', brand: 'DODO', code: 'D27', name: '西瓜红', rgb: [255, 120, 120], lab: [68, 45, 25] },
  { id: 'dodo-28', brand: 'DODO', code: 'D28', name: '鹅黄', rgb: [255, 245, 160], lab: [95, -5, 35] },
  { id: 'dodo-29', brand: 'DODO', code: 'D29', name: '森林绿', rgb: [50, 130, 50], lab: [48, -40, 40] },
  { id: 'dodo-30', brand: 'DODO', code: 'D30', name: '湖蓝', rgb: [70, 180, 220], lab: [70, -15, -30] },
  { id: 'dodo-31', brand: 'DODO', code: 'D31', name: '宝蓝', rgb: [40, 80, 180], lab: [35, 20, -50] },
  { id: 'dodo-32', brand: 'DODO', code: 'D32', name: '藏青', rgb: [40, 60, 100], lab: [25, 5, -25] },
  { id: 'dodo-33', brand: 'DODO', code: 'D33', name: '酒红', rgb: [150, 40, 60], lab: [35, 40, 15] },
  { id: 'dodo-34', brand: 'DODO', code: 'D34', name: '藕紫', rgb: [220, 190, 210], lab: [80, 10, -5] },
  { id: 'dodo-35', brand: 'DODO', code: 'D35', name: '卡其', rgb: [200, 180, 150], lab: [75, 3, 18] },
  { id: 'dodo-36', brand: 'DODO', code: 'D36', name: '杏色', rgb: [255, 220, 180], lab: [90, 6, 18] },
  { id: 'dodo-37', brand: 'DODO', code: 'D37', name: '荧光黄', rgb: [240, 255, 100], lab: [96, -20, 75] },
  { id: 'dodo-38', brand: 'DODO', code: 'D38', name: '荧光绿', rgb: [180, 255, 100], lab: [92, -40, 65] },
  { id: 'dodo-39', brand: 'DODO', code: 'D39', name: '荧光橙', rgb: [255, 160, 80], lab: [77, 25, 55] },
  { id: 'dodo-40', brand: 'DODO', code: 'D40', name: '荧光粉', rgb: [255, 130, 200], lab: [75, 50, 5] },
];

// 品牌列表
export const brands = [
  { id: 'Mard', name: 'Mard', colors: mardColors },
  { id: '漫漫', name: '漫漫拼豆', colors: manmanColors },
  { id: 'DODO', name: 'DODO拼豆', colors: dodoColors },
];

// 获取品牌的颜色列表
export function getBrandColors(brandId: string): BeadColor[] {
  const brand = brands.find(b => b.id === brandId);
  return brand?.colors || mardColors;
}

// 获取所有可用品牌
export function getAvailableBrands() {
  return brands.map(b => ({ id: b.id, name: b.name }));
}
