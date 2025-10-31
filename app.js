import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import router from './routes/routes.js';
dotenv.config();

import  {PORT} from './config/env.js';

import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Welcome to the Event Scheduling System API!');
});

app.use('/api/v1', router);



app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; 