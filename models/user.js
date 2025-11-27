import prisma from  "../config/prismaClient.js";


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
    return prisma.user.findUnique({
      where: { userId: id },
    });
  },


    
    async getAllUsers() {
      return await prisma.user.findMany();
    },

    
   async deleteUser(id) {
    return prisma.user.delete({
      where: { userId: id },
    });
  },

    
    async updateUser(id, data) {
      return prisma.user.update({
        where: { userId: id },
        data,
      });
    },
  };

export default User;