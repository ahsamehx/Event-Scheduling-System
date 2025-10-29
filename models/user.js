  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();

  /**
 * @typedef {Object} UserModel
 * @property {(data: Object) => Promise<any>} createUser
 * @property {(email: string) => Promise<any>} findUserByEmail
 * @property {(id: number) => Promise<any>} findUserById
 * @property {() => Promise<any[]>} getAllUsers
 * @property {(id: number) => Promise<any>} deleteUser
 * @property {(id: number, data: Object) => Promise<any>} updateUser
 */

/** @type {UserModel} */

  export const User = {
  
    async createUser(data) {
      if (data.role) {
        data.role = data.role.toLowerCase(); 
      }
       return await prisma.user.create({ data });
    },

    
    async findUserByEmail(email) {
      return await prisma.user.findUnique({
        where: { email },
      });
    },

    
    async findUserById(id) {
      return await prisma.user.findUnique({
        where: { id },
      });
    },

    
    async getAllUsers() {
      return await prisma.user.findMany();
    },

    
    async deleteUser(id) {
      return await prisma.user.delete({
        where: { id },
      });
    },

    
    async updateUser(id, data) {
      return await prisma.user.update({
        where: { id },
        data,
      });
    },
  };

export default User;