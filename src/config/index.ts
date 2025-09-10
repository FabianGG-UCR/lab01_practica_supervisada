import dotenv from 'dotenv';
dotenv.config();
export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  port: parseInt(process.env.PORT || '3005'),
  logLevel: process.env.LOG_LEVEL || 'debug',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  //Database url required
  databaseUrl:
    process.env.DATABASE_URL ||
    (() => {
      throw new Error('DATABASE_URL is required');
    })(),
};
