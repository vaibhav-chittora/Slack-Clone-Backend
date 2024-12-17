import express from 'express';

import { createWorkSpaceController } from '../../controllers/workspace.js';
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

export default router;
