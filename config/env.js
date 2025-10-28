import {config} from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {PORT, SERVER_URL, DATABASE_URL, JWT_SECRET} = process.env;