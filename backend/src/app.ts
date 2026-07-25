import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { securityHeaders } from './middlewares/securityHeaders';
import { globalRateLimiter } from './middlewares/rateLimiter';
import { requestLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Middleware Pipeline
app.use(securityHeaders);
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(globalRateLimiter);

// API Version 1 Gateway
app.use('/api/v1', routes);

// Custom Global Error Handler
app.use(errorHandler);

export default app;
