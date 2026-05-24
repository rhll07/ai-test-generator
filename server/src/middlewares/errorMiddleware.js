import { env } from '../config/env.js';

export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (env.nodeEnv !== 'test') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    details: err.details || null,
    stack: env.nodeEnv === 'development' ? err.stack : undefined
  });
};
