import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// @desc    Get all categories for current user
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.user.userId },
      orderBy: { id: 'desc' }
    });
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

// @desc    Create a new category for current user
// @route   POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        userId: req.user.userId // Inherit nested context automatically extracted from JWT
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};
