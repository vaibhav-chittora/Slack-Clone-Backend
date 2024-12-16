import { z } from 'zod';
export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string().min(3)
});

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
