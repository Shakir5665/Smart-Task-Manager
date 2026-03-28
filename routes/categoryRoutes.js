import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce authentication middleware on all category endpoints
router.use(protectRoute);

router.route('/')
  .get(getCategories)
  .post(createCategory);

export default router;
