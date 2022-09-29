import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()


export interface MinistryInput {
    id?: number
    name: string 
}

export const MinistryDefs = `
    createMinistry(data: MinistryInput): Ministry
    updateMinistry(data: MinistryInput): Ministry
    deleteMinistry(data: Int): Ministry
    deleteMinistrys : Int
`

export const MinistryQueries = `
     GetMinistrys: [Ministry!]!
`

export const MinistryType = `
    type Ministry{
        id: Int!
        name: String 
    }
    input MinistryInput {
        id: Int!
        name: String  
    }
`
export var MinistryResolvers =
{
    GetMinistrys: (_parent: any, _args: any, db: DB) => {
        return db.prisma.ministry.findMany()
    }
}
export var MinistryMutations =
{
    createMinistry: async (
        _parent: any,
        args: { data: MinistryInput },
        db: DB,
    ) => {
        


        try {
            const data = await db.prisma.ministry.create({
                data: {
                    name:args.data.name
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateMinistry: (
        _parent: any,
        args: { data: MinistryInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.ministry.update({
            where: {
                id: args.data.id,
            },
            data: {
                name: args.data.name
            },
        }).then(data => {
            return data
        }).catch(error => {
            console.log(error)
            return null
        })
    },
    deleteMinistry: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.ministry.delete({
            where: {
                id: args.data,
            }
        }).then(data => {
            return data
        }).catch(error => {
            console.log(error)
            return null
        })
    },
    deleteMinistrys: (
        _parent: any
    ) => {
        try {
            return prisma.ministry.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
