import express from 'express';

import { isMemberPartOfWorkspaceController } from '../../controllers/member.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get(
  '/workspace/:workspaceId',
  isAuthenticated,
  isMemberPartOfWorkspaceController
);

export default router;
