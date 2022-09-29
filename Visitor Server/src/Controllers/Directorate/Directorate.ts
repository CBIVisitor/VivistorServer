import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()


export interface DirectorateInput {
    id?: number
    name: string 
}

export const DirectorateDefs = `
    createDirectorate(data: DirectorateInput): Directorate
    updateDirectorate(data: DirectorateInput): Directorate
    deleteDirectorate(data: Int): Directorate
    deleteDirectorates : Int
`

export const DirectorateQueries = `
     GetDirectorates: [Directorate!]!
`

export const DirectorateType = `
    type Directorate{
        id: Int!
        name: String 
    }
    input DirectorateInput {
        id: Int!
        name: String  
    }
`
export var DirectorateResolvers =
{
    GetDirectorates: (_parent: any, _args: any, db: DB) => {
        return db.prisma.directorate.findMany()
    }
}
export var DirectorateMutations =
{
    createDirectorate: async (
        _parent: any,
        args: { data: DirectorateInput },
        db: DB,
    ) => {
        


        try {
            const data = await db.prisma.directorate.create({
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
    updateDirectorate: (
        _parent: any,
        args: { data: DirectorateInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.directorate.update({
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
    deleteDirectorate: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.directorate.delete({
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
    deleteDirectorates: (
        _parent: any
    ) => {
        try {
            return prisma.directorate.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
