import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * @typedef {Object} RegistrationModel
 * @property {(data: Object) => Promise<any>} createEvent
 * @property {(eventId: number) => Promise<any>} findEventById
 * @property {(organizerId: number) => Promise<any[]>} getEventsByOrganizer
 * @property {(userId: number) => Promise<any[]>} getEventsUserIsInvitedTo
 * @property {(eventId: number, data: Object) => Promise<any>} updateEvent
 * @property {(eventId: number) => Promise<any>} deleteEvent
 * @property {(filters: Object) => Promise<any[]>} searchEvents
 */

/** @type {RegistrationModel} */


export const Event = {

    async createEvent(data) {
        return await prisma.event.create({ 
            data,
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                }
            },
        });
    },

    async findEventById(eventId) {
        return await prisma.event.findUnique({
            where: { eventId },
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                },
                attendees:{
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    }
                },
                registrations:{
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    }
                },
            },
        });
    },

    async getEventsByOrganizer(organizerId) {
        return await prisma.event.findMany({
            where: { organizerId },
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                },
                attendees:{
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    }
                },
            },
            orderBy: { eventDate: 'desc' }
        });
    },

    async getEventsUserIsInvitedTo(userId) {
        return await prisma.event.findMany({
            where: {
                attendees: {
                    some: { 
                        userId: userId,
                        roleInEvent: {in:['attendee','collaborator']} 
                    }
                }
            },
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                },
                attendees:{
                    where: { userId },
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    },

                },
            },
            orderBy: { eventDate: 'desc' }
        });
    },
    async updateEvent(eventId, data) {
        return await prisma.event.update({
            where: { eventId },
            data,
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                }
            },
        });
    },

    async deleteEvent(eventId) {
        return await prisma.event.delete({
            where: { eventId },
        });
    },

    async searchEvents(filters) {
        const {keyword, startDate, endDate, location, userId, role} = filters;
        
        const where = {}; // dynamic where clause

        if (keyword) {
            where.OR = [
                { title: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
            ];
        }

        if(startDate || endDate) {
            where.eventDate = {};
            if(startDate) where.eventDate.gte = new Date(startDate);
            if(endDate) where.eventDate.lte = new Date(endDate);
        }

        if(location) {
            where.location = { contains: location, mode: 'insensitive' };
        }

        if(userId && role) {
            if(role === 'organizer') {
                where.organizerId = userId;
            }
            else if(role === 'attendee' || role === 'collaborator') {
                where.attendees = {
                    some: {
                        userId: userId,
                        roleInEvent: role
                    }
                };
            }
        }
        return await prisma.event.findMany({
            where,
            include: {
                organizer: {
                    select: { userId: true, firstname: true, lastname: true, email: true }
                },
                attendees:{
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    }
                },
                registrations:{
                    include:{
                        user:{
                            select: { userId: true, firstname:true, lastname:true, email:true }
                        }
                    }
                },
            },
            orderBy: { eventDate: 'desc' }
        });
    }
}; 

export default Event;