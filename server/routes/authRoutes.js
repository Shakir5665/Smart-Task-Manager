import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateReq } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateReq(registerSchema), registerUser);

router.post('/login', validateReq(loginSchema), loginUser);

export default router;
