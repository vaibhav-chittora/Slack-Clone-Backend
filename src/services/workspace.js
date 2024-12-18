import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channel.js';
import workSpaceRepository from '../repositories/workSpace.js';
import ClientError from '../utils/erros/clientError.js';
import ValidationError from '../utils/erros/validationError.js';

const isUserAdminOfWorkspace = async (workspace, userId) => {
  return workspace.members.find(
    (member) => member.memberId.toString() === userId && member.role === 'admin'
  );
};

const isUserMemberOfWorkspace = async (workspace, userId) => {
  return workspace.members.find(
    (member) => member.memberId.toString() === userId
  );
};
export const createWorkspace = async (workspaceData) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const response = await workSpaceRepository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    });

    await workSpaceRepository.addMemberToWorkSpace(
      response._id,
      workspaceData.owner,
      'admin'
    );

    const updatedWorkspace = await workSpaceRepository.addChannelToWorkSpace(
      response._id,
      'general'
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Error in createWorkspace Service', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A workspace with same details already exists.']
        },
        'A workspace with same details already exists.'
      );
    }
  }
};

export const getWorkspacesUserIsMemberOfService = async (memberId) => {
  try {
    const workspaces =
      await workSpaceRepository.fetchAllWorkSpacesByMemberId(memberId);

    return workspaces;
  } catch (error) {
    console.log('Error in getAllWorkspaces service - ', error);

    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await workSpaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        StatusCode: StatusCodes.NOT_FOUND,
        message: 'No workspace found'
      });
    }

    // console.log(workspace.members.memberId.toString());
    const isAllowedToDelete = isUserAdminOfWorkspace(workspace, userId);

    if (isAllowedToDelete) {
      await channelRepository.deleteMany(workspace.channels);

      const deletedResponse = await workSpaceRepository.delete(workspaceId);
      return deletedResponse;
    }

    throw new ClientError({
      explanation:
        'User is either not an admin OR maybe not a part of the workspace. ',
      StatusCode: StatusCodes.UNAUTHORIZED,
      message: 'User is not allowed to delete the workspace'
    });
  } catch (error) {
    console.log('Error in delete Workspace service -', error);
    throw error;
  }
};

export const getWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await workSpaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        StatusCode: StatusCodes.NOT_FOUND,
        message: 'Workspace not found.'
      });
    }

    const IsMember = isUserMemberOfWorkspace(workspace, userId);

    if (!IsMember) {
      throw new ClientError({
        explanation: 'User is not a member of the workspace',
        StatusCode: StatusCodes.UNAUTHORIZED,
        message: 'User is not a member of the workspace '
      });
    }

    return workspace;
  } catch (error) {
    console.log('Error in get Workspace service-', error);
    throw error;
  }
};
