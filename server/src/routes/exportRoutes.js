import { Router } from 'express';
import * as exportController from '../controllers/exportController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { exportProjectSchema } from '../validators/exportValidator.js';

const router = Router();

router.use(requireAuth);
router.get('/markdown/:projectId', validate(exportProjectSchema), asyncHandler(exportController.exportMarkdown));
router.get('/pdf/:projectId', validate(exportProjectSchema), asyncHandler(exportController.exportPdf));
router.get('/json/:projectId', validate(exportProjectSchema), asyncHandler(exportController.exportJson));

export default router;
