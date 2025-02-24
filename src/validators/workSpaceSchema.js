import { z } from 'zod';

export const createWorkSpaceSchema = z.object({
  name: z.string().min(3)
});

export const addMemberToWorkSpaceSchema = z.object({
  memberId: z.string()
});
export const addChannelToWorkSpaceSchema = z.object({
  channelName: z.string()
});
