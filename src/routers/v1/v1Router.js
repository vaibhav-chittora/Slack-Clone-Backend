import express from 'express';

import userRouter from './user.js';
import workspaceRouter from './workspace.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);

export default router;
