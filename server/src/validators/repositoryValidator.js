import { z } from 'zod';

export const uploadRepositorySchema = z.object({
  body: z.object({
    projectId: z.string().optional(),
    projectName: z.string().min(2).max(120).optional()
  })
});

export const githubRepositorySchema = z.object({
  body: z.object({
    repositoryUrl: z.string().url(),
    branch: z.string().min(1).max(120).default('main'),
    projectId: z.string().optional(),
    projectName: z.string().min(2).max(120).optional()
  })
});
