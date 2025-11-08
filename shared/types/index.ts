// Shared Types for KnowCall

export interface PhoneNumber {
  id: string;
  number: string;
  countryCode: string;
  isInternational: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockedNumber extends PhoneNumber {
  reason: BlockReason;
  source: BlockSource;
  reportCount: number;
  riskLevel: RiskLevel;
}

export enum BlockReason {
  SPAM = 'spam',
  FRAUD = 'fraud',
  TELEMARKETING = 'telemarketing',
  UNKNOWN = 'unknown',
  USER_BLOCKED = 'user_blocked',
}

export enum BlockSource {
  COMMUNITY = 'community',
  REGULATORY = 'regulatory',
  EXTERNAL_API = 'external_api',
  USER = 'user',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface UserReport {
  id: string;
  userId: string;
  phoneNumber: string;
  reason: BlockReason;
  description?: string;
  createdAt: Date;
}

export interface CallLog {
  id: string;
  userId: string;
  phoneNumber: string;
  callType: CallType;
  duration: number;
  timestamp: Date;
  wasBlocked: boolean;
  riskLevel?: RiskLevel;
}

export enum CallType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  MISSED = 'missed',
  BLOCKED = 'blocked',
}

export interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  name?: string;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  blockHiddenNumbers: boolean;
  blockInternational: boolean;
  blockUnknown: boolean;
  autoMuteSpam: boolean;
  enableNotifications: boolean;
  language: 'th' | 'en';
}

export interface WhitelistEntry {
  id: string;
  userId: string;
  phoneNumber: string;
  name?: string;
  createdAt: Date;
}

export interface BlacklistEntry {
  id: string;
  userId: string;
  phoneNumber: string;
  reason?: string;
  createdAt: Date;
}

export interface NumberVerificationResult {
  phoneNumber: string;
  isSpam: boolean;
  isFraud: boolean;
  riskLevel: RiskLevel;
  sources: VerificationSource[];
  reportCount: number;
  lastReported?: Date;
}

export interface VerificationSource {
  name: string;
  result: 'safe' | 'spam' | 'fraud' | 'unknown';
  confidence: number;
  reportCount?: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
