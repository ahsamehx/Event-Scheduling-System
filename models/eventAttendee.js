import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @typedef {Object} EventAttendeeModel
 * @property {(data: Object) => Promise<any>} addAttendee
 * @property {(eventId: number, userId: number) => Promise<any>} findAttendee
 * @property {(eventId: number) => Promise<any[]>} getAttendeesByEvent
 * @property {(eventId: number, userId: number) => Promise<any>} removeAttendee
 */

/** @type {EventAttendeeModel} */

export const EventAttendee = {
  async addAttendee(data) {
    return await prisma.eventAttendee.create({ data,
        include: {
            user:{
                select: {userId: true, firstname:true, lastname:true, email:true}
            },
            event: {
                select: { eventId: true, title: true, eventDate: true }
            }
        }
     });
  },

  async findAttendee(eventId, userId) {
    return await prisma.eventAttendee.findUnique({
        where:{
            eventId_userId: { eventId, userId }
        },
        include: {
            user:{
                select: {userId: true, firstname:true, lastname:true, email:true}
            },
        }
    });
  },

  async getEventAttendees(eventId) {
    return await prisma.eventAttendee.findMany({
        where: { eventId },
        include: {
            user:{
                select: {userId: true, firstname:true, lastname:true, email:true}
            },
        }
    });
  },

  async removeAttendee(eventId, userId) {
    return await prisma.eventAttendee.delete({
        where:{
            eventId_userId: { eventId, userId }
        }
    });
  }
};

export default EventAttendee;