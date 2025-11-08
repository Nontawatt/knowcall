import express from 'express';
import { createReport, getReports } from '../controllers/reportController';
import rateLimit from 'express-rate-limit';

const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many reports from this IP, please try again later.',
});

const router = express.Router();

// Create report
router.post('/', reportLimiter, createReport);

// Get reports for a phone number
router.get('/:phoneNumber', getReports);

export default router;
