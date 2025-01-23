import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channel.js';
import messageRepository from '../repositories/message.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspace.js';

export const getMessagesService = async (messageParams, page, limit, user) => {
  const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(
    messageParams.channelId
  );

  const workspace = channelDetails.workspaceId;
  const isMember = isUserMemberOfWorkspace(workspace, user);

  if (!isMember) {
    throw new ClientError({
      explanation: 'Invalid data sent from the client',
      message: 'User is not a member of workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }

  const messages = await messageRepository.getPaginatedMessages(
    messageParams,
    page,
    limit
  );

  return messages;
};

export const createMessageService = async (message) => {
  const newMessage = await messageRepository.create(message);
  return newMessage;
};
