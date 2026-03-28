import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateReq } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

// @route   POST /api/auth/register
// Applies Zod validator immediately inspecting payload before Controller takes over
router.post('/register', validateReq(registerSchema), registerUser);

// @route   POST /api/auth/login
router.post('/login', validateReq(loginSchema), loginUser);

export default router;
