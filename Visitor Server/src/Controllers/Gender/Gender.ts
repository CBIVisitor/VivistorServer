import { DB, db } from '../../context'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export interface GenderInput {
    id?: number
    name?: string
}

export const GenderDefs = `
    createGender(data: String): Gender
    updateGender(data: GenderInput): Gender
    deleteGender(data: Int): Gender
    deleteGenders : Int
`

export const GenderQueries = `
     GetGenders: [Gender!]!
`
 
export const GenderType = `
    type Gender{
        id: Int!
        name: String
    }
    input GenderInput {
        id: Int!
        name: String
    }
`
export var GenderResolvers =
{
    GetGenders: (_parent: any, _args: any, db: DB) => {
        return db.prisma.gender.findMany()
    }
}
export var GenderMutations =
{
    createGender: async (
        _parent: any,
        args: { data: string },
        db: DB,
    ) => {
        try {
            const data = await db.prisma.gender.create({
                data: {
                    name: args.data
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateGender: (
        _parent: any,
        args: { data: GenderInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.gender.update({
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
    deleteGender: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.gender.delete({
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
    deleteGenders: (
        _parent: any
    ) => {
        try {
            return prisma.gender.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
