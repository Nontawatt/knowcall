import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export const connectRedis = async () => {
  await redisClient.connect();
};

export const getCache = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

export const setCache = async (key: string, value: string, expiresIn: number = 3600): Promise<void> => {
  await redisClient.setEx(key, expiresIn, value);
};

export const deleteCache = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
