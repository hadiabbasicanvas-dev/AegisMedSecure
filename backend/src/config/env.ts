import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/aegis_db',
  JWT_SECRET: process.env.JWT_SECRET || 'placeholder_secret',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'placeholder_key',
};
