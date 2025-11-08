import { Request, Response } from 'express';
import { NumberVerificationService } from '../services/numberVerificationService';
import { AppError } from '../middlewares/errorHandler';
import { RiskLevel } from '@shared/types';

const verificationService = new NumberVerificationService();

export const verifyPhone = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      throw new AppError('Phone number is required', 400);
    }

    const result = await verificationService.verifyNumber(phoneNumber);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to verify phone number',
      });
    }
  }
};

export const getBlockedNumbers = async (req: Request, res: Response) => {
  try {
    // Mock data for prototype
    const blockedNumbers = [
      {
        id: '1',
        number: '+66812345678',
        countryCode: 'TH',
        isInternational: false,
        reason: 'spam',
        source: 'community',
        reportCount: 15,
        riskLevel: RiskLevel.HIGH,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        number: '+8612345678',
        countryCode: 'CN',
        isInternational: true,
        reason: 'fraud',
        source: 'regulatory',
        reportCount: 42,
        riskLevel: RiskLevel.CRITICAL,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    res.json({
      success: true,
      data: blockedNumbers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get blocked numbers',
    });
  }
};

export const checkIfBlocked = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      throw new AppError('Phone number is required', 400);
    }

    const result = await verificationService.verifyNumber(phoneNumber);
    const isBlocked = result.isSpam || result.isFraud;

    res.json({
      success: true,
      data: {
        phoneNumber,
        isBlocked,
        riskLevel: result.riskLevel,
        reason: result.isSpam ? 'spam' : result.isFraud ? 'fraud' : null,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to check phone number',
      });
    }
  }
};
