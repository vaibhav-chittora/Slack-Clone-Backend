import { JOIN_CHANNEL_EVENT } from '../utils/common/eventConstants.js';

export default function messageHandler(io, socket) {
  socket.on(JOIN_CHANNEL_EVENT, async function joinChannelHandler(data, cb) {
    const roomId = data.channelId;
    socket.join(roomId);
    console.log(`User ${socket.id} joined channel ${roomId}`);
    cb?.({
      success: true,
      message: 'Joined channel successfully',
      data: roomId
    });
  });
}
