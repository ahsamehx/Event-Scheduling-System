import UserRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";

import { Router } from "express";

const router = Router();
router.use('/users', UserRouter);
router.use('/auth', authRouter); 

export default router;