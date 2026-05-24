import { Router } from 'express';
import * as projectController from '../controllers/projectController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createProjectSchema, projectIdSchema, updateProjectSchema } from '../validators/projectValidator.js';

const router = Router();

router.use(requireAuth);
router.route('/').get(asyncHandler(projectController.listProjects)).post(validate(createProjectSchema), asyncHandler(projectController.createProject));
router
  .route('/:id')
  .get(validate(projectIdSchema), asyncHandler(projectController.getProject))
  .put(validate(updateProjectSchema), asyncHandler(projectController.updateProject))
  .delete(validate(projectIdSchema), asyncHandler(projectController.deleteProject));

export default router;
