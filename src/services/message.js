import messageRepository from '../repositories/message.js';

export const getMessagesService = async (messageParams, page, limit) => {
  const messages = await messageRepository.getPaginatedMessages(
    messageParams,
    page,
    limit
  );
  return messages;
};
