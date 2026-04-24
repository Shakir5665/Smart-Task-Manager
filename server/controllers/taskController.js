import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      include: { category: true },
      orderBy: { id: 'desc' }
    });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, categoryId } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required.' });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'PENDING',
        priority: priority ? parseInt(priority) : 1,
        dueDate: dueDate ? new Date(dueDate) : null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        userId: req.user.userId
      },
      include: { category: true }
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, status, priority, dueDate, categoryId } = req.body;

    const task = await prisma.task.findFirst({
      where: { id: taskId, userId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized operation' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        status: status !== undefined ? status : task.status,
        priority: priority !== undefined ? parseInt(priority) : task.priority,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate,
        categoryId: categoryId !== undefined ? (categoryId ? parseInt(categoryId) : null) : task.categoryId,
      },
      include: { category: true }
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const task = await prisma.task.findFirst({
      where: { id: taskId, userId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized operation' });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(200).json({ message: 'Task deleted successfully', deletedId: taskId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};
