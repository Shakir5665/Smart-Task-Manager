import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

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

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        userId: req.user.userId
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (!Number.isFinite(categoryId)) {
      return res.status(400).json({ message: 'Invalid category id.' });
    }

    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId: req.user.userId },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: 'Category not found or unauthorized operation' });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    res
      .status(200)
      .json({ message: 'Category deleted successfully', deletedId: categoryId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error: error.message });
  }
};
