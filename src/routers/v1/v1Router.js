import express from 'express';

import channelRouter from './channel.js';
import memberRouter from './members.js';
import userRouter from './user.js';
import workspaceRouter from './workspace.js';
import messageRouter from './message.js';
const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
router.use('/messages', messageRouter);

export default router;
