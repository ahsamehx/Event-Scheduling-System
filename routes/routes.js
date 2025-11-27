import UserRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import EventRouter from "./eventRoutes.js";

import { Router } from "express";

const router = Router();
router.use('/users', UserRouter);
router.use('/auth', authRouter); 
router.use('/events', EventRouter);

export default router;