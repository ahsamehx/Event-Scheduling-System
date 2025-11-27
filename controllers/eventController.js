import Event from "../models/Event.js";
import EventAttendee from "../models/EventAttendee.js";
import Invitation from "../models/Invitation.js";

export const createEvent = async (req, res) => {
    try {
        const organizerId = req.user.userId; // added by auth middleware
        const { title, eventDate, location, description } = req.body;

        const newEvent = await Event.createEvent({
            organizerId,
            title,
            eventDate: new Date(eventDate),
            location,
            description
        });

        // Add organizer as attendee
        await EventAttendee.addAttendee({
            eventId: newEvent.eventId,
            userId: organizerId,
            roleInEvent: "organizer"
        });

        return res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getMyOrganizedEvents = async (req, res) => {
    try {
        const userId = req.user.userId;

        const events = await Event.getEventsByOrganizer(userId);

        return res.json(events);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getEventsInvitedTo = async (req, res) => {
    try {
        const userId = req.user.userId;

        const events = await Event.getEventsUserIsInvitedTo(userId);

        return res.json(events);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const inviteUserToEvent = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const eventId = Number(req.params.eventId);
        const recipientId =  Number(req.body.recipientId);

        console.log('senderId:', senderId);
        console.log('eventId:', eventId);   
        console.log('recipientId:', recipientId);

        // Ensure only organizer can invite
        const event = await Event.findEventById(Number(eventId));

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.organizerId !== senderId) {
            return res.status(403).json({ error: "Only organizer can invite users" });
        }

        const existingInvitation = await Invitation.findInvitationByEventAndRecipient(eventId, recipientId);

        if (existingInvitation) {
            return res.status(400).json({ 
                success: false, 
                message: "User is already invited to this event" 
            });
        }

        const invitation = await Invitation.createInvitation(
            Number(eventId),
            senderId,
            recipientId
        );

        return res.json({
            message: "User invited successfully",
            invitation
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { eventId } = req.params;

        const event = await Event.findEventById(Number(eventId));
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.organizerId !== userId) {
            return res.status(403).json({ error: "Only organizer can delete the event" });
        }

        await Event.deleteEvent(Number(eventId));

        return res.json({ message: "Event deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getEventDetails = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findEventById(Number(eventId));
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.json(event);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
