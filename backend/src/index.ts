import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { logger } from './config/logger';
import { errorHandler } from './middlewares/errorHandler';
import phoneRoutes from './routes/phoneRoutes';
import userRoutes from './routes/userRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'KnowCall API is running' });
});

app.use('/api/phones', phoneRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// Error handling
app.use(errorHandler);

// Start server
const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📱 KnowCall API v1.0.0`);
});

export default app;
