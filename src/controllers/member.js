import { StatusCodes } from 'http-status-codes';

import { isMemberPartOfWorkspaceService } from '../services/memberService.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const isMemberPartOfWorkspaceController = async (req, res) => {
  try {
    const response = await isMemberPartOfWorkspaceService(
      req.params.workspaceId,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User is member of workspace'));
  } catch (error) {
    console.log('isMemberPartOfWorkspaceController Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
