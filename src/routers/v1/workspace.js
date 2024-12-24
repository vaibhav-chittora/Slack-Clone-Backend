import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkSpaceController,
  deleteWorkspaceController,
  getWorkSpaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updateWorkspaceController
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

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

//  routes

// get a p[articular workspace by id
router.get('/:workspaceId', isAuthenticated, getWorkspaceController);

// fetch all workspaces by joincode
router.get(
  '/join/:joincode',
  isAuthenticated,
  getWorkSpaceByJoinCodeController
);

// update the workspace
router.put('/:workspaceId', isAuthenticated, updateWorkspaceController);

// add member to workspace route
router.put(
  '/:workspaceId/members',
  isAuthenticated,
  addMemberToWorkspaceController
);

// add channel to workspace route
router.put(
  '/:workspaceId/channels',
  isAuthenticated,
  addChannelToWorkspaceController
);

export default router;
