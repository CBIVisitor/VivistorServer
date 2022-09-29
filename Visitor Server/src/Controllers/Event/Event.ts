import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()


export interface EventInput {
    id?: number
    name?: string
    fromDate?: Date
    toDate?: Date
}

export const EventDefs = `
    createEvent(data: EventInput): Event
    updateEvent(data: EventInput): Event
    deleteEvent(data: Int): Event
    deleteEvents : Int
`

export const EventQueries = `
     GetEvents: [Event!]!
`

export const EventType = `
    type Event{
        id: Int!
        name: String
        fromDate: DateTime
        toDate: DateTime 
    }
    input EventInput {
        id: Int!
        name: String 
        fromDate: DateTime
        toDate: DateTime 
    }
`
export var EventResolvers =
{
    GetEvents: (_parent: any, _args: any, db: DB) => {
        return db.prisma.event.findMany({})
    }
}
export var EventMutations =
{
    createEvent: async (
        _parent: any,
        args: { data: EventInput },
        db: DB,
    ) => {
        let ev: Prisma.EventCreateInput = {
            name: args.data.name,
            fromDate: new Date(args?.data?.fromDate || ''),
            toDate: new Date(args?.data?.toDate || '')
        } 
        try {
            const data = await db.prisma.event.create({
                data: ev
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateEvent: (
        _parent: any,
        args: { data: EventInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.event.update({
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
    deleteEvent: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.event.delete({
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
    deleteEvents: (
        _parent: any
    ) => {
        try {
            return prisma.event.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
