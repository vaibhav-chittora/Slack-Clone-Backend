import express from 'express';

import {
  getMessagesController,
  getPreSignedUrlFromAws
} from '../../controllers/message.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pre-signed-url', isAuthenticated, getPreSignedUrlFromAws);

router.get('/:channelId', isAuthenticated, getMessagesController);

export default router;
