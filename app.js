import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import  {PORT} from './config/env.js';

import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Welcome to the Event Scheduling System API!');
});


app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;