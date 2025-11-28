import UserRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import EventRouter from "./eventRoutes.js";
import InvitationRouter from "./invitationRoutes.js";
import RegistrationRouter from "./registrationRoutes.js";
import SearchRouter from "./searchRoutes.js";

import { Router } from "express";

const router = Router();
router.use('/users', UserRouter);
router.use('/auth', authRouter); 
router.use('/events', EventRouter);
router.use("/invitations", InvitationRouter);
router.use("/registrations", RegistrationRouter);
router.use("/search", SearchRouter);

export default router;