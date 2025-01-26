import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channel.js';
import messageRepository from '../repositories/message.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspace.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);

    console.log('channel in service layer - ', channel);

    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        StatusCode: StatusCodes.NOT_FOUND,
        message: 'channel not found with the provided Id.'
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    );

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        explanation: 'User is not part of the workspace.',
        StatusCode: StatusCodes.UNAUTHORIZED,
        message:
          'User is not part of the workspace and hence cannot access the channel'
      });
    }

    const messages = await messageRepository.getPaginatedMessages(
      {
        channelId
      },
      1,
      20
    );

    channel.messages = messages;
    return {
      messages,
      _id: channel._id,
      name: channel.name,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
      workspaceId: channel.workspaceId
    };
  } catch (error) {
    console.log('getChannelByIdService Error - ', error);
    throw error;
  }
};
