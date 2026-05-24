import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { loginSchema, signupSchema } from '../validators/authValidator.js';

const router = Router();

router.post('/signup', validate(signupSchema), asyncHandler(authController.signup));
router.post('/login', validate(loginSchema), asyncHandler(authController.login));
router.get('/me', requireAuth, asyncHandler(authController.me));
router.post('/logout', requireAuth, asyncHandler(authController.logout));

export default router;
