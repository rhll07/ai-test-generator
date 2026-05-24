import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import repositoryRoutes from './routes/repositoryRoutes.js';
import generationRoutes from './routes/generationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

export const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173','http://10.32.60.219:5173'],
    credentials: true
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/generate', generationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/export', exportRoutes);

app.use(notFound);
app.use(errorHandler);
