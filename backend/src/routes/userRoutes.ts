import express from 'express';
import {
  getUserSettings,
  updateUserSettings,
  getWhitelist,
  addToWhitelist,
  removeFromWhitelist,
  getBlacklist,
  addToBlacklist,
  removeFromBlacklist
} from '../controllers/userController';

const router = express.Router();

// User settings
router.get('/settings', getUserSettings);
router.put('/settings', updateUserSettings);

// Whitelist
router.get('/whitelist', getWhitelist);
router.post('/whitelist', addToWhitelist);
router.delete('/whitelist/:id', removeFromWhitelist);

// Blacklist
router.get('/blacklist', getBlacklist);
router.post('/blacklist', addToBlacklist);
router.delete('/blacklist/:id', removeFromBlacklist);

export default router;
