import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Automatically execute the `protectRoute` middleware strictly regulating ALL downstream task routes without repeating logic
router.use(protectRoute);

// Collection-based manipulation matching standardized REST guidelines
router.route('/')
  .get(getTasks)       // Handles returning ALL applicable tasks securely
  .post(createTask);   // Handles establishing new contexts

// Entity-based manipulation
router.route('/:id')
  .put(updateTask)     // Mutates localized node fields securely
  .delete(deleteTask); // Cascades finalizations securely

export default router;
