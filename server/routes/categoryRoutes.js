import express from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.use('/:id', (req, res, next) => {
  if (req.method === 'DELETE') return deleteCategory(req, res, next);
  return next();
});

router.route('/')
  .get(getCategories)
  .post(createCategory);

export default router;
