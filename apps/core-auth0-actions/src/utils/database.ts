const { PrismaClient } = require('database');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export default prisma;
