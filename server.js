import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Enable JSON parsing for incoming request bodies

// Route imports
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// Basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Smart Task Manager API!', status: 'running' });
});

// Register routes here
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Global Error Handler Middleware
// Must be defined AFTER all other routes so it catches whatever falls through or triggers an error
app.use(errorHandler);

// Start the server if not running in production serverless environment like Vercel
if (process.env.NODE_ENV !== 'production' || process.env.RUN_LOCAL === 'true') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for serverless deployment (Vercel)
export default app;
