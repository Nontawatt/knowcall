import express from 'express';
import {
  verifyPhone,
  getBlockedNumbers,
  checkIfBlocked
} from '../controllers/phoneController';

const router = express.Router();

// Verify phone number
router.post('/verify', verifyPhone);

// Get blocked numbers
router.get('/blocked', getBlockedNumbers);

// Check if phone is blocked
router.get('/check/:phoneNumber', checkIfBlocked);

export default router;
