import mongoose from 'mongoose';

const workSpaceSchema = new mongoose.model(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    members: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },

        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    joinCode: {
      type: String,
      unique: true
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ]
  },
  { timestamps: true }
);

const WorkSpace = mongoose.model('WorkSpace', workSpaceSchema);

export default WorkSpace;
