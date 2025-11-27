import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
dotenv.config();

import  {PORT} from './config/env.js';

import cookieParser from 'cookie-parser';
import prisma from  "./config/prismaClient.js";

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

async function startServer() {
  try {
    await prisma.$connect();
    console.log("📦 Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
startServer();

export default app; 