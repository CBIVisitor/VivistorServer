import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()


export interface DoorInput {
    id?: number
    name: string 
}

export const DoorDefs = `
    createDoor(data: DoorInput): Door
    updateDoor(data: DoorInput): Door
    deleteDoor(data: Int): Door
    deleteDoors : Int
`

export const DoorQueries = `
     GetDoors: [Door!]!
`

export const DoorType = `
    type Door{
        id: Int!
        name: String 
    }
    input DoorInput {
        id: Int!
        name: String  
    }
`
export var DoorResolvers =
{
    GetDoors: (_parent: any, _args: any, db: DB) => {
        return db.prisma.door.findMany()
    }
}
export var DoorMutations =
{
    createDoor: async (
        _parent: any,
        args: { data: DoorInput },
        db: DB,
    ) => {
        


        try {
            const data = await db.prisma.door.create({
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
    updateDoor: (
        _parent: any,
        args: { data: DoorInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.door.update({
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
    deleteDoor: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.door.delete({
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
    deleteDoors: (
        _parent: any
    ) => {
        try {
            return prisma.door.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
