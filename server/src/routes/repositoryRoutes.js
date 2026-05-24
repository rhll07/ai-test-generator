import { Router } from 'express';
import * as repositoryController from '../controllers/repositoryController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { uploadRepository as uploadRepositoryMiddleware } from '../middlewares/uploadMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { githubRepositorySchema, uploadRepositorySchema } from '../validators/repositoryValidator.js';

const router = Router();

router.use(requireAuth);
router.post(
  '/upload',
  uploadRepositoryMiddleware.single('repository'),
  validate(uploadRepositorySchema),
  asyncHandler(repositoryController.uploadRepository)
);
router.post('/github', validate(githubRepositorySchema), asyncHandler(repositoryController.importGitHubRepository));

export default router;
