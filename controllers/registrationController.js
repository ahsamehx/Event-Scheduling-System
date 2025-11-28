import Registration from "../models/registration.js";
import Event from "../models/Event.js";
import EventAttendee from "../models/EventAttendee.js";

export const respondToEvent = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.eventId);
        const {responseStatus} = req.body;

        const validStatuses = ['Going', 'Maybe', 'NotGoing'];
        if (!validStatuses.includes(responseStatus)) {
            return res.status(400).json({ 
                error: "Invalid response status. Must be Going, Maybe, or NotGoing" 
            });
        }

        const event = await Event.findEventById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const registration = await Registration.createOrUpdateRegistration(
            eventId,
            userId,
            responseStatus
        );

        return res.json({
            message: "Response registered successfully",
            registration
        });


    } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getEventRegistrations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.eventId);

        const event = await Event.findEventById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.organizerId !== userId) {
            return res.status(403).json({ 
                error: "Only the organizer can view registrations" 
            });
        }

        const registrations = await Registration.getRegistrationsByEvent(eventId);

        return res.json({
            eventId,
            eventTitle: event.title,
            registrations
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserRegistrations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const registrations = await Registration.getUserRegistrations(userId);

        return res.json(registrations);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteRegistration = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.eventId);

        const registration = await Registration.getRegistration(eventId, userId);
        if (!registration) {
            return res.status(404).json({ error: "Registration not found" });
        }

        await Registration.deleteRegistration(eventId, userId);

        return res.json({ message: "Registration cancelled successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
        