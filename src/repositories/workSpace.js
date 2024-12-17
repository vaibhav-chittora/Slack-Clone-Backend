import { StatusCodes } from 'http-status-codes';
import WorkSpace from '../schema/workspace';
import ClientError from '../utils/erros/clientError';
import crudRepository from './crudRepository';
import User from '../schema/user';
import channelRepository from './channel';

const workSpaceRepository = {
  ...crudRepository(WorkSpace),

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
    const workspace = await workspace.findOne({ joinCode });

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

    if (!isMemberAlreadyPartOfWorkSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'User is already the part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({
      memberId,
      role
    });

    await workspace.save();

    return workspace;
  },

  addChannelToWorkSpace: async function (workspaceId, channelName, memberId) {
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
      (channel) => channel.name == channelName
    );

    if (!isChannelALreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const channel = await channelRepository.create({ name: channelName });

    workspace.channels.push(channel);

    await workspace.save();

    return workspace;
  },

  fetchAllWorkSpacesByMemberId: async function (memberId) {
    const workspace = await WorkSpace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username, email avatar');

    return workspace;
  }
};

export default workSpaceRepository;