import express from 'express';

import channelRouter from './channel.js';
import memberRouter from './members.js';
import messageRouter from './message.js';
import paymentRouter from './payment.js';
import userRouter from './user.js';
import workspaceRouter from './workspace.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
router.use('/messages', messageRouter);
router.use('/payments', paymentRouter);

export default router;
