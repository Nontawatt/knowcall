/**
 * KnowCall Spacing System
 * ระบบ spacing สำหรับความสม่ำเสมอของ layout
 */

export const spacing = {
  xs: 4,    // Extra small - padding/margin น้อยมาก
  sm: 8,    // Small - padding/margin เล็ก
  md: 12,   // Medium - padding/margin ปานกลาง
  lg: 16,   // Large - padding/margin ใหญ่
  xl: 24,   // Extra large - padding/margin ใหญ่มาก
  xxl: 32,  // 2X large - padding/margin ใหญ่พิเศษ
};

export const borderRadius = {
  sm: 4,    // Small elements (tags, chips)
  md: 8,    // Cards, buttons
  lg: 12,   // Modals, sheets
  xl: 16,   // Large cards
  pill: 50, // Pills, circular elements
};

export const elevation = {
  none: 0,     // ไม่มีเงา
  low: 2,      // Subtle elevation
  medium: 4,   // Cards
  high: 8,     // Floating elements (FAB, etc.)
  modal: 16,   // Modals, dialogs
};

// Minimum touch target size (iOS HIG & Material Design guidelines)
export const MIN_TOUCH_SIZE = 44;
