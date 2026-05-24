import { z } from 'zod';

const generationType = z.enum(['unit', 'integration', 'api', 'edge-case', 'validation', 'negative', 'mixed']);

export const generateTestsSchema = z.object({
  body: z.object({
    projectId: z.string().min(1),
    generationType: generationType.default('mixed'),
    testingGoal: z.string().min(5).max(2000),
    codeSnippet: z.string().max(50000).optional().default(''),
    instructions: z.string().max(5000).optional().default('')
  })
});

export const regenerateTestsSchema = z.object({
  body: z.object({
    generationId: z.string().min(1),
    instructions: z.string().max(5000).optional().default('')
  })
});

export const feedbackSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    status: z.enum(['approved', 'rejected', 'pending']),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().max(2000).optional().default('')
  })
});
