import { Router } from 'express';
import { z } from 'zod';
import * as chatController from '../controllers/chatController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { chatSchema } from '../validators/chatValidator.js';

const router = Router();

const listChatsSchema = z.object({
  params: z.object({
    projectId: z.string().min(1)
  })
});

router.use(requireAuth);
router.post('/', validate(chatSchema), asyncHandler(chatController.sendMessage));
router.get('/:projectId', validate(listChatsSchema), asyncHandler(chatController.listChats));

export default router;
