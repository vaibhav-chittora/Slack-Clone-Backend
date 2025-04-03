import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkSpaceController,
  deleteWorkspaceController,
  getWorkSpaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  resetWorkspaceJoinCodeController,
  updateWorkspaceController
} from '../../controllers/workspace.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import {
  addChannelToWorkSpaceSchema,
  addMemberToWorkSpaceSchema,
  createWorkSpaceSchema
} from '../../validators/workSpaceSchema.js';
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
  validate(addMemberToWorkSpaceSchema),
  addMemberToWorkspaceController
);

// add channel to workspace route
router.put(
  '/:workspaceId/channels',
  isAuthenticated,
  validate(addChannelToWorkSpaceSchema),
  addChannelToWorkspaceController
);

// reset workspace join code route
router.put(
  '/:workspaceId/joinCode/reset',
  isAuthenticated,
  resetWorkspaceJoinCodeController
);

export default router;
