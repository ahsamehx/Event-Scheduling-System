import {Router} from "express";
import{
    respondToInvitation,
    getMyInvitations,
    getEventInvitations
} from "../controllers/invitationController.js";
import authorize from "../Middlewares/auth.js";

const InvitationRouter = Router();

InvitationRouter.get("/my-invitations", authorize, getMyInvitations);

InvitationRouter.patch("/:invitationId/respond", authorize, respondToInvitation);

InvitationRouter.get("/event/:eventId", authorize, getEventInvitations);

export default InvitationRouter;