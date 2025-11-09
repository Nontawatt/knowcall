/**
 * KnowCall Color System
 * ระบบสีสำหรับแอป KnowCall รองรับ Light และ Dark mode
 */

export const colors = {
  // Primary Colors
  primary: '#2196F3',        // Material Blue - สีหลักของแอป
  primaryDark: '#1976D2',    // Dark Blue - สำหรับ pressed states
  primaryLight: '#BBDEFB',   // Light Blue - สำหรับ backgrounds

  // Risk Level Colors
  success: '#4CAF50',        // Green - ปลอดภัย (LOW)
  warning: '#FF9800',        // Orange - ระวัง (MEDIUM)
  danger: '#F44336',         // Red - เสี่ยงสูง (HIGH)
  critical: '#D32F2F',       // Dark Red - อันตราย (CRITICAL)

  // Neutral Colors (Light Mode)
  light: {
    background: '#F5F5F5',     // Light Gray - พื้นหลังแอป
    surface: '#FFFFFF',        // White - Card backgrounds
    textPrimary: '#212121',    // Dark Gray - ข้อความหลัก
    textSecondary: '#757575',  // Medium Gray - ข้อความรอง
    divider: '#E0E0E0',        // Light Gray - เส้นแบ่ง
    disabled: '#BDBDBD',       // Gray - ปุ่ม/ข้อความที่ disable
  },

  // Neutral Colors (Dark Mode)
  dark: {
    background: '#121212',     // Very Dark Gray - พื้นหลังแอป
    surface: '#1E1E1E',        // Dark Gray - Card backgrounds
    textPrimary: '#FFFFFF',    // White - ข้อความหลัก
    textSecondary: '#B0B0B0',  // Light Gray - ข้อความรอง
    divider: '#2C2C2C',        // Dark Gray - เส้นแบ่ง
    disabled: '#666666',       // Dark Gray - ปุ่ม/ข้อความที่ disable
  },

  // Semantic Colors
  error: '#F44336',          // สำหรับ error messages
  info: '#2196F3',           // สำหรับ informational messages

  // Background Colors for Banners
  successBg: '#E8F5E9',      // พื้นหลังสำหรับ success banners
  errorBg: '#FFEBEE',        // พื้นหลังสำหรับ error banners
  warningBg: '#FFF3E0',      // พื้นหลังสำหรับ warning banners
  infoBg: '#E3F2FD',         // พื้นหลังสำหรับ info banners

  // Dark mode banner backgrounds
  successBgDark: '#1B5E20',
  errorBgDark: '#B71C1C',
  warningBgDark: '#E65100',
  infoBgDark: '#0D47A1',
};

export type ColorScheme = 'light' | 'dark';
