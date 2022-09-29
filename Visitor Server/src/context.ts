import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export interface DB {
    prisma: PrismaClient
}

export const db: DB = {
    prisma: prisma, 
}


