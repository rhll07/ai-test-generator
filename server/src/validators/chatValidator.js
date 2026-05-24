import { z } from 'zod';

export const chatSchema = z.object({
  body: z.object({
    projectId: z.string().min(1),
    message: z.string().min(2).max(5000)
  })
});
