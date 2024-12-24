import { StatusCodes } from 'http-status-codes';

import User from '../schema/user.js';
import WorkSpace from '../schema/workSpace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channel.js';
import crudRepository from './crudRepository.js';

const workSpaceRepository = {
  ...crudRepository(WorkSpace),

  getWorkspaceDetailsById: async function (workspaceId) {
    const workSpaceDetails = await WorkSpace.findById(workspaceId)
      .populate('members.memberId', 'username avatar email')
      .populate('channels');

    // console.log('Workspace Details in repsoitry', workSpaceDetails);
    return workSpaceDetails;
  },

  getWorkSpaceByName: async function (workspaceName) {
    const workspace = await WorkSpace.findOne({ name: workspaceName });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  },

  getWorkSpaceByJoinCode: async function (joinCode) {
    const workspace = await WorkSpace.findOne({ joinCode });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return workspace;
  },

  addMemberToWorkSpace: async function (workspaceId, memberId, role) {
    const workspace = await WorkSpace.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isValidMember = await User.findById(memberId);
    if (!isValidMember) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMemberAlreadyPartOfWorkSpace = workspace.members.find(
      (member) => member.memberId == memberId
    );

    if (isMemberAlreadyPartOfWorkSpace) {
      throw new ClientError({
        message: 'User is already the part of workspace',
        statusCode: StatusCodes.FORBIDDEN,
        explanation: 'Invalid data sent from the client '
      });
    }

    workspace.members.push({
      memberId,
      role
    });

    await workspace.save();

    return workspace;
  },

  addChannelToWorkSpace: async function (workspaceId, channelName) {
    const workspace =
      await WorkSpace.findById(workspaceId).populate('channels');

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isChannelALreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    );

    if (isChannelALreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId
    });

    workspace.channels.push(channel);

    await workspace.save();

    return workspace;
  },

  fetchAllWorkSpacesByMemberId: async function (memberId) {
    const workspace = await WorkSpace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');

    return workspace;
  }
};

export default workSpaceRepository;
