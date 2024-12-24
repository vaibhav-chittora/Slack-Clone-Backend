import mongoose from 'mongoose';

const workSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workspace name is required'],
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
      required: [true, 'Join code is required']
      // unique: true
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
