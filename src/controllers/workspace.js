import { StatusCodes } from 'http-status-codes';

import { createWorkspace as createWorkspaceService } from '../services/workSpace.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const createWorkSpaceController = async (req, res) => {
  try {
    const workspace = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(workspace, 'Workspace created Successfully'));
  } catch (error) {
    console.log('Error in create workspace controller', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
