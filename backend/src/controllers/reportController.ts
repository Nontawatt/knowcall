import { Request, Response } from 'express';
import { AppError } from '../middlewares/errorHandler';

export const createReport = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, reason, description } = req.body;

    if (!phoneNumber || !reason) {
      throw new AppError('Phone number and reason are required', 400);
    }

    // Mock report creation
    const report = {
      id: Date.now().toString(),
      userId: 'user123',
      phoneNumber,
      reason,
      description,
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      data: report,
      message: 'Report submitted successfully',
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
        error: 'Failed to create report',
      });
    }
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      throw new AppError('Phone number is required', 400);
    }

    // Mock reports
    const reports = [
      {
        id: '1',
        userId: 'user456',
        phoneNumber,
        reason: 'spam',
        description: 'โทรขายสินค้าบ่อยมาก',
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        userId: 'user789',
        phoneNumber,
        reason: 'fraud',
        description: 'แอบอ้างเป็นเจ้าหน้าที่ธนาคาร',
        createdAt: new Date(Date.now() - 172800000),
      },
    ];

    res.json({
      success: true,
      data: reports,
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
        error: 'Failed to get reports',
      });
    }
  }
};
