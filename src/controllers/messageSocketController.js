import { createMessageService } from '../services/message.js';
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT
} from '../utils/common/eventConstants.js';

export const messageHandlers = async (io, socket) => {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const messageResponse = await createMessageService(data);
    socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);

    cb({
      success: true,
      message: 'Successfully created the message',
      data: messageResponse
    });
  });
};
