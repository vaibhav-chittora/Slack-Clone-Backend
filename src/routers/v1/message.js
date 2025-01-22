import express from 'express';

import { getMessagesController } from '../../controllers/message.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/message/:channelId', isAuthenticated, getMessagesController);

export default router;
