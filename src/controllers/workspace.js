import { StatusCodes } from 'http-status-codes';

import { verifyTokenService } from '../services/user.js';
import {
  addChannelToWorkSpaceService,
  addMemberToWorkspaceService,
  createWorkspace as createWorkspaceService,
  deleteWorkspaceService,
  getWorkSpaceByJoinCodeService,
  getWorkspaceService,
  getWorkspacesUserIsMemberOfService,
  joinWorkspaceService,
  resetWorkspaceJoinCodeService,
  updateWorkspaceService
} from '../services/workspace.js';
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

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
  try {
    const workspaces = await getWorkspacesUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(workspaces, 'Workspaces fetched successfully'));
  } catch (error) {
    console.log('Error in getWorkspacesUserIsMemberOfController', error);
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'));
  } catch (error) {
    console.log('Error in delete Workspace controller - ', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const getWorkspaceController = async (req, res) => {
  try {
    const response = await getWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Error in get Workspace controller - ', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const getWorkSpaceByJoinCodeController = async (req, res) => {
  try {
    const response = await getWorkSpaceByJoinCodeService(
      req.params.joincode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Error in getWorkspaceByJoincode controller -', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const updateWorkspaceController = async (req, res) => {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'workspace updated successfully.'));
  } catch (error) {
    console.log('updateWorkspaceController Error -', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'member added to workspace successfully.')
      );
  } catch (error) {
    console.log('addMemberToWorkspaceController Error -', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const addChannelToWorkspaceController = async (req, res) => {
  try {
    const response = await addChannelToWorkSpaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'channel added to workspace successfully.')
      );
  } catch (error) {
    console.log('addChannelToWorkspaceController Error -', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const resetWorkspaceJoinCodeController = async (req, res) => {
  try {
    const response = await resetWorkspaceJoinCodeService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Workspace join code reset successfully.')
      );
  } catch (error) {
    console.log('resetWorkspaceJoinCodeController Error -', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const joinWorkspaceController = async (req, res) => {
  try {
    const response = await joinWorkspaceService(
      req.params.workspaceId,
      req.body.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Joined workspace successfully.'));
  } catch (error) {
    console.log('joinWorkspaceController Error -', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const response = await verifyTokenService(req.params.token);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Email verified successfully.'));
  } catch (error) {
    console.log('verifyEmailController Error -', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
