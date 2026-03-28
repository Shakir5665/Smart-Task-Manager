import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // 2. Hash the password security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // 2. Compare incoming password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};
