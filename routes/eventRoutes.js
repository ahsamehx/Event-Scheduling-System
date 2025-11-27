import { Router } from "express";
import {
    createEvent,
    getMyOrganizedEvents,
    getEventsInvitedTo,
    inviteUserToEvent,
    deleteEvent,
    getEventDetails
} from "../controllers/eventController.js";

import authorize from "../Middlewares/auth.js";

const EventRouter = Router();

// Create a new event
EventRouter.post("/", authorize, createEvent);

// Get all events organized by the logged-in user
EventRouter.get("/organized", authorize, getMyOrganizedEvents);

// Get all events the logged-in user is invited to
EventRouter.get("/invited", authorize, getEventsInvitedTo);

// Invite a user to an event (only organizer can do this)
EventRouter.post("/:eventId/invite", authorize, inviteUserToEvent);

// Get details of a specific event
EventRouter.get("/:eventId", authorize, getEventDetails);

// Delete an event (only organizer can do this)
EventRouter.delete("/:eventId", authorize, deleteEvent);

export default EventRouter;
