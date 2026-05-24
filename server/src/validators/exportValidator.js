import { z } from 'zod';

export const exportProjectSchema = z.object({
  params: z.object({
    projectId: z.string().min(1)
  })
});
