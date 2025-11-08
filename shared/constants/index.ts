// Shared Constants for KnowCall

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const PHONE_REGEX = {
  THAI: /^(\+66|66|0)[0-9]{8,9}$/,
  INTERNATIONAL: /^\+[1-9]\d{1,14}$/,
};

export const RISK_THRESHOLDS = {
  LOW: 0,
  MEDIUM: 3,
  HIGH: 10,
  CRITICAL: 20,
};

export const EXTERNAL_APIS = {
  UNKNOWN_PHONE: 'https://api.unknownphone.com',
  TELLOWS: 'https://api.tellows.com',
  TRUECALLER: 'https://api.truecaller.com',
};

export const CACHE_DURATION = {
  NUMBER_VERIFICATION: 3600, // 1 hour
  USER_SETTINGS: 1800, // 30 minutes
  BLOCKED_NUMBERS: 7200, // 2 hours
};

export const RATE_LIMITS = {
  REPORT_PHONE: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
  },
  VERIFY_PHONE: {
    windowMs: 60 * 1000, // 1 minute
    max: 30,
  },
};

export const ERROR_MESSAGES = {
  th: {
    INVALID_PHONE: 'หมายเลขโทรศัพท์ไม่ถูกต้อง',
    PHONE_NOT_FOUND: 'ไม่พบหมายเลขโทรศัพท์',
    UNAUTHORIZED: 'ไม่มีสิทธิ์เข้าถึง',
    RATE_LIMIT: 'คุณทำรายการบ่อยเกินไป กรุณารอสักครู่',
    SERVER_ERROR: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
  },
  en: {
    INVALID_PHONE: 'Invalid phone number',
    PHONE_NOT_FOUND: 'Phone number not found',
    UNAUTHORIZED: 'Unauthorized access',
    RATE_LIMIT: 'Too many requests, please try again later',
    SERVER_ERROR: 'Server error occurred',
  },
};
