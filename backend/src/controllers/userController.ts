import { Request, Response } from 'express';

// Mock user ID for prototype
const MOCK_USER_ID = 'user123';

export const getUserSettings = async (req: Request, res: Response) => {
  try {
    // Mock user settings
    const settings = {
      blockHiddenNumbers: true,
      blockInternational: false,
      blockUnknown: true,
      autoMuteSpam: true,
      enableNotifications: true,
      language: 'th' as const,
    };

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user settings',
    });
  }
};

export const updateUserSettings = async (req: Request, res: Response) => {
  try {
    const settings = req.body;

    // In production, save to database
    res.json({
      success: true,
      data: settings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update user settings',
    });
  }
};

export const getWhitelist = async (req: Request, res: Response) => {
  try {
    // Mock whitelist
    const whitelist = [
      {
        id: '1',
        userId: MOCK_USER_ID,
        phoneNumber: '+66987654321',
        name: 'ธนาคารไทยพาณิชย์',
        createdAt: new Date(),
      },
    ];

    res.json({
      success: true,
      data: whitelist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get whitelist',
    });
  }
};

export const addToWhitelist = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, name } = req.body;

    const entry = {
      id: Date.now().toString(),
      userId: MOCK_USER_ID,
      phoneNumber,
      name,
      createdAt: new Date(),
    };

    res.json({
      success: true,
      data: entry,
      message: 'Added to whitelist successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to whitelist',
    });
  }
};

export const removeFromWhitelist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.json({
      success: true,
      message: 'Removed from whitelist successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove from whitelist',
    });
  }
};

export const getBlacklist = async (req: Request, res: Response) => {
  try {
    // Mock blacklist
    const blacklist = [
      {
        id: '1',
        userId: MOCK_USER_ID,
        phoneNumber: '+66812345678',
        reason: 'Spam calls',
        createdAt: new Date(),
      },
    ];

    res.json({
      success: true,
      data: blacklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get blacklist',
    });
  }
};

export const addToBlacklist = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, reason } = req.body;

    const entry = {
      id: Date.now().toString(),
      userId: MOCK_USER_ID,
      phoneNumber,
      reason,
      createdAt: new Date(),
    };

    res.json({
      success: true,
      data: entry,
      message: 'Added to blacklist successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to blacklist',
    });
  }
};

export const removeFromBlacklist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.json({
      success: true,
      message: 'Removed from blacklist successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove from blacklist',
    });
  }
};
