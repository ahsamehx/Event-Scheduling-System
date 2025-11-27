import prisma from  "../config/prismaClient.js";

/**
 * @typedef {Object} RegistrationModel
 * @property {(eventId: number, userId: number, responseStatus: string) => Promise<any>} createOrUpdateRegistration
 * @property {(eventId: number, userId: number) => Promise<any>} getRegistration
 * @property {(eventId: number) => Promise<any[]>} getRegistrationsByEvent
 * @property {(userId: number, userId: number) => Promise<any[]>} getUserRegistrations
 * @property {(registrationId: number, userId: number) => Promise<any>} deleteRegistration
 */

/** @type {RegistrationModel} */
export const Registration = {
    async createOrUpdateRegistration(eventId, userId, responseStatus) {
        return await prisma.registration.upsert({
            where: {
                eventId_userId: { eventId, userId }
            },
            update: {
                responseStatus,
                registrationDate: new Date()
            },
            create: {
                eventId,
                userId,
                responseStatus
            },
            include:{
                user:{
                    select: {userId: true, name: true, email:true}
                },
                event: {
                    select: {eventId: true, title: true, eventDate: true}
                }
            }
        });
    },

    async getRegistration(eventId, userId) {
        return await prisma.registration.findUnique({
            where: {
                eventId_userId: { eventId, userId }
            },
            include:{
                user:{
                    select: {userId: true, name: true, email:true}
                },
                event: {
                    select: {eventId: true, title: true, eventDate: true}
                }
            }
        });
    },

    async getRegistrationsByEvent(eventId) {
        return await prisma.registration.findMany({
            where: { eventId },
            include:{
                user:{
                    select: {userId: true, name: true, email:true}
                },
            }
        });
    },

    async getUserRegistrations(userId) {
        return await prisma.registration.findMany({
            where: { userId },
            include:{
                event: {
                    select: {eventId: true, title: true, eventDate: true}
                }
            }
        });
    },

    async deleteRegistration(eventId, userId) {
        return await prisma.registration.delete({
            where: {
                eventId_userId: { eventId, userId }
            }
        });
    }


};

export default Registration;


