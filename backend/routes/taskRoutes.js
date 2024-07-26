import express from "express";
import { getTasks, getTask, createTask, updateTask, deleteTask, deleteTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, createTask).delete(protect, deleteTasks);
router.route('/:id').get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);

export default router;
