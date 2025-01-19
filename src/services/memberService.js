import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/user.js';
import workSpaceRepository from '../repositories/workSpace.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspace.js';

export const isMemberPartOfWorkspaceService = async (workspaceId, memberId) => {
  const workspace = await workSpaceRepository.getById(workspaceId);

  if (!workspace) {
    throw new ClientError({
      explanation: 'Invalid data sent from the client ',
      message: 'Workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }

  const isUserAMember = await isUserMemberOfWorkspace(workspace, memberId);

  if (!isUserAMember) {
    throw new ClientError({
      explanation: 'Invalid data sent from the client ',
      message: 'User is not a member of workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }

  const user = await userRepository.getById(memberId);
  return user;
};
