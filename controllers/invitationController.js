import Invitation from "../models/invitation.js";
import EventAttendee from "../models/eventAttendee.js";   
import Event from "../models/event.js";
// import { stat } from "fs";
// import { error } from "console";

export const respondToInvitation = async (req, res ) => {
    try{
        const userId = req.user.userId;
        const {invitationId} = req.params;
        const {status} = req.body;

        if(!["Accepted","Rejected"].includes(status)){
            return res.status(400).json({error: "Invalid status. Must be 'Accepted' or 'Rejected'"});
        }

        const invitation = await Invitation.getInvitationById(Number(invitationId));
        if(!invitation){
            return res.status(404).json({ error: "Invitation not found" });
        }
        if(invitation.recipientId !== userId){
            return res.status(403).json({error: "You can only respond to your own invitations"});
        }
        if(invitation.status !== "Pending"){
            return res.status(400).json({error: "This invitation has already been responded to"});
        }

        const updatedInvitation = await Invitation.updateStatus(Number(invitationId), status);

        if(status === "Accepted"){
            await EventAttendee.addAttendee({
                eventId: invitation.eventId,
                userId: userId,
                roleInEvent: "attendee"
            });
        }   

        return res.json({
            message: `Invitation ${status.toLowerCase()}`,
            invitation: updatedInvitation
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getMyInvitations = async (req, res) => {

    try{
        const userId = req.user.userId;
        const invitations = await Invitation.getInvitationsForUser(userId);

        return res.json({ invitations });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getEventInvitations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { eventId } = req.params;

        const event = await Event.findEventById(Number(eventId));

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.organizerId !== userId) {
            return res.status(403).json({ error: "Only the organizer can view event invitations" });
        }

        const invitations = await Invitation.getInvitationsByEvent(Number(eventId));

        return res.json(invitations);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


