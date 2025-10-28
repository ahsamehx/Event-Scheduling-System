import { PrismaClient } from '@prisma/client';

let prisma;

export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

const connectDB = async () => {
  try {
    const client = getPrisma();
    await client.$connect();
    console.log('Prisma connected to PostgreSQL');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
