import express from 'express';

import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { getMessagesController } from '../../controllers/message.js';

const router = express.Router();

router.get('/message/:channelId', isAuthenticated, getMessagesController);

export default router;
