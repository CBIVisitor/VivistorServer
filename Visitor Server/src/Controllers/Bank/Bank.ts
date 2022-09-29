import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient() 

export interface BankInput {
    id?: number
    name: string
    nameEnglish: string
    Bankid: number
    status: number 
}

export const BankDefs = `
    createBank(data: BankInput): Bank
    updateBank(data: BankInput): Bank
    deleteBank(data: Int): Bank
    deleteBanks : Int
`

export const BankQueries = `
     GetBanks: [Bank!]!
`

export const BankType = `
    type Bank{
        id: Int!
        name: String 
        nameEnglish: String 
        Bankid: Int
        status: Int!
    }
    input BankInput {
        id: Int!
        name: String 
        nameEnglish: String 
        Bankid: Int
        status: Int!
    }
`
export var BankResolvers =
{
    GetBanks: (_parent: any, _args: any, db: DB) => {
        return db.prisma.bank.findMany()
    }
}
export var BankMutations =
{
    createBank: async (
        _parent: any,
        args: { data: BankInput },
        db: DB,
    ) => { 
        try {
            const data = await db.prisma.bank.create({
                data: {
                    name: args.data.name,
                    nameEnglish: args.data.nameEnglish,
                    Bankid: args.data.Bankid,
                    status: args.data.status,
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateBank: (
        _parent: any,
        args: { data: BankInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.bank.update({
            where: {
                id: args.data.id,
            },
            data: {
                name: args.data.name,
                nameEnglish: args.data.nameEnglish,
                Bankid: args.data.Bankid,
                status: args.data.status,
            },
        }).then((data: any) => {
            return data
        }).catch((error: any) => {
            console.log(error)
            return null
        })
    },
    deleteBank: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.bank.delete({
            where: {
                id: args.data,
            }
        }).then((data: any) => {
            return data
        }).catch((error: any) => {
            console.log(error)
            return null
        })
    },
    deleteBanks: (
        _parent: any
    ) => {
        try {
            return prisma.bank.deleteMany().then((data: { count: any; }) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
