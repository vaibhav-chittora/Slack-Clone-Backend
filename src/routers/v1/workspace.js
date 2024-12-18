import express from 'express';

import {
  createWorkSpaceController,
  getWorkspacesUserIsMemberOfController
} from '../../controllers/workspace.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkSpaceSchema } from '../../validators/workSpaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  validate(createWorkSpaceSchema),
  createWorkSpaceController
);

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);

export default router;
