import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    projectName: z.string().min(2).max(120),
    repositoryUrl: z.string().url().optional().or(z.literal(''))
  })
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    projectName: z.string().min(2).max(120).optional(),
    repositoryUrl: z.string().url().optional().or(z.literal('')),
    repositorySummary: z.string().optional()
  })
});

export const projectIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});
