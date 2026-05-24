import { Router } from 'express';
import { z } from 'zod';
import * as generationController from '../controllers/generationController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { feedbackSchema, generateTestsSchema, regenerateTestsSchema } from '../validators/generationValidator.js';

const router = Router();

const projectGenerationsSchema = z.object({
  params: z.object({
    projectId: z.string().min(1)
  })
});

router.use(requireAuth);
router.get('/recent', asyncHandler(generationController.recentGenerations));
router.get('/project/:projectId', validate(projectGenerationsSchema), asyncHandler(generationController.listByProject));
router.post('/tests', validate(generateTestsSchema), asyncHandler(generationController.generateTests));
router.post('/regenerate', validate(regenerateTestsSchema), asyncHandler(generationController.regenerateTests));
router.post('/:id/feedback', validate(feedbackSchema), asyncHandler(generationController.updateFeedback));

export default router;
