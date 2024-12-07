import { PrismaClient } from "@prisma/client";

// Menambahkan global variable untuk menyimpan instance PrismaClient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Membuat instance PrismaClient atau menggunakan yang sudah ada jika di dev mode
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Memastikan Prisma hanya diinisialisasi sekali di environment selain production
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
