import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Message Body is Required']
    },
    image: {
      type: String
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender Id is required']
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'Channel Id is required']
    },
    workSpaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkSpace',
      required: [true, 'WorkSpace Id is required']
    }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
