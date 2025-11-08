import { NumberVerificationResult, RiskLevel } from '@shared/types';
import { getCache, setCache } from '../config/redis';
import { CACHE_DURATION } from '@shared/constants';

export class NumberVerificationService {
  async verifyNumber(phoneNumber: string): Promise<NumberVerificationResult> {
    // Check cache first
    const cached = await this.getCachedResult(phoneNumber);
    if (cached) {
      return cached;
    }

    // Mock verification logic for prototype
    const result = this.mockVerification(phoneNumber);

    // Cache the result
    await this.cacheResult(phoneNumber, result);

    return result;
  }

  private mockVerification(phoneNumber: string): NumberVerificationResult {
    // Simple mock logic based on patterns
    const isInternational = !phoneNumber.startsWith('+66') && !phoneNumber.startsWith('0');
    const hasHighReports = Math.random() > 0.7;

    let riskLevel = RiskLevel.LOW;
    let isSpam = false;
    let isFraud = false;
    let reportCount = Math.floor(Math.random() * 5);

    if (isInternational) {
      riskLevel = RiskLevel.MEDIUM;
      reportCount += 5;
    }

    if (hasHighReports) {
      riskLevel = RiskLevel.HIGH;
      isSpam = true;
      reportCount += 15;
    }

    // Known spam patterns (for demo)
    const spamPatterns = ['+8612345678', '+8898765432', '0812345678'];
    if (spamPatterns.some(pattern => phoneNumber.includes(pattern))) {
      riskLevel = RiskLevel.CRITICAL;
      isFraud = true;
      reportCount = 42;
    }

    return {
      phoneNumber,
      isSpam,
      isFraud,
      riskLevel,
      reportCount,
      sources: [
        {
          name: 'UnknownPhone',
          result: isSpam ? 'spam' : 'safe',
          confidence: 0.85,
          reportCount,
        },
        {
          name: 'Tellows',
          result: isFraud ? 'fraud' : isSpam ? 'spam' : 'safe',
          confidence: 0.75,
        },
        {
          name: 'Community',
          result: isSpam || isFraud ? 'spam' : 'safe',
          confidence: 0.90,
          reportCount,
        },
      ],
      lastReported: hasHighReports ? new Date(Date.now() - 86400000) : undefined,
    };
  }

  private async getCachedResult(phoneNumber: string): Promise<NumberVerificationResult | null> {
    try {
      const cached = await getCache(`verify:${phoneNumber}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private async cacheResult(phoneNumber: string, result: NumberVerificationResult): Promise<void> {
    try {
      await setCache(
        `verify:${phoneNumber}`,
        JSON.stringify(result),
        CACHE_DURATION.NUMBER_VERIFICATION
      );
    } catch (error) {
      console.error('Failed to cache verification result:', error);
    }
  }
}
