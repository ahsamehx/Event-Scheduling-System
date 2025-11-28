import prisma from  "../config/prismaClient.js";


/**
 * @typedef {Object} InvitationModel
 * @property {(data: {eventId: number, senderId: number, recipientId: number, roleInEvent?: string}) => Promise<any>} createInvitation
 * @property {(invitationId: number) => Promise<any>} getInvitationById
 * @property {(eventId: number) => Promise<any[]>} getInvitationsByEvent
 * @property {(userId: number) => Promise<any[]>} getInvitationsForUser
 * @property {(invitationId: number, status: string) => Promise<any>} updateStatus
 * @property {(invitationId: number) => Promise<any>} deleteInvitation
 */

/** @type {InvitationModel} */
export const Invitation = {

    async createInvitation({ eventId, senderId, recipientId, roleInEvent }) {
        return await prisma.invitation.create({
            data: {
                eventId,
                senderId,
                recipientId,
                roleInEvent: roleInEvent || 'attendee'
            },
            include: {
                sender: { select: { userId: true, name: true, email: true } },
                recipient: { select: { userId: true, name: true, email: true } },
                event: { select: { eventId: true, title: true, eventDate: true } }
            }
        });
    },

    async getInvitationById(invitationId) {
        return await prisma.invitation.findUnique({
            where: { invitationId },
            include: {
                sender: true,
                recipient: true,
                event: true,
            }
        });
    },

    async getInvitationsByEvent(eventId) {
        return await prisma.invitation.findMany({
            where: { eventId },
            include: {
                sender: { select: { userId: true, name: true} },
                recipient: { select: { userId: true, name: true } }
            }
        });
    },

    async getInvitationsForUser(userId) {
        return await prisma.invitation.findMany({
            where: { recipientId: userId },
            include: {
                event: { select: { eventId: true, title: true, eventDate: true } },
                sender: { select: { userId: true, name: true} }
            }
        });
    },

    async findInvitationByEventAndRecipient(eventId, recipientId) {
        return await prisma.invitation.findUnique({
            where: {
                eventId_recipientId: {  
                    eventId,
                    recipientId
                }
            }
        });
    },

    async updateStatus(invitationId, status) {
        return await prisma.invitation.update({
            where: { invitationId },
            data: { 
                status,
                respondedAt: new Date()
            },
            include: {
                event: true,
                sender: true,
                recipient: true,
            }
        });
    },

    async deleteInvitation(invitationId) {
        return await prisma.invitation.delete({
            where: { invitationId }
        });
    }
};

export default Invitation;