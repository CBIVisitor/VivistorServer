import { DB } from '../../context'
import { PrismaClient } from "@prisma/client";

import { DoorInput } from '../Door/Door';
import { VisitorInput } from '../Visitor/Visitor';

const prisma = new PrismaClient()



export interface Visitor_LogsInput {
    id: number
    mainDoorIn?: Date
    mainDoorOut?: Date
    subDoorIn?: Date
    subDoorOut?: Date
    door: DoorInput
    visitor: VisitorInput
    online: boolean
    isActive?: boolean
}
export interface VInput {
    sDate?: Date
    eDate?: Date
}
export const logsDefs = ` 
    setSubDoorIn(data: Int):DateTime 
    setSubDoorOut(data: Int):DateTime 
    setMainDoorIn(data: Int):DateTime 
    setMainDoorOut(data: Int):DateTime 
`

export const logsQueries = ` 
    Getlogs: [Logs!]!
    GetTodayVisitors: [Logs!]!
    GetLogsVisitors(data:VInput ):[Logs!]!
`

export const Visitor_LogsType = `
    type Logs {
        id: Int 
        mainDoorIn: DateTime
        mainDoorOut: DateTime
        subDoorIn: DateTime
        subDoorOut: DateTime 
        door: Door 
        Visitor: Visitor 
        day: DateTime
        online:Boolean
        isActive:Boolean 
    }
    input Visitor_LogsInput {
        id: Int 
        mainDoorIn: DateTime
        mainDoorOut: DateTime
        subDoorIn: DateTime
        subDoorOut: DateTime 
        door: Int 
        day: DateTime  
        Visitor: Int 
        online:Boolean
        isActive:Boolean
    }
      input VInput {
        sDate: DateTime
        eDate: DateTime
       }
`



function getListDates(date1: Date, date2: Date) {
    let Dates: Date[];
    Dates = []

    let day = (1000 * 60 * 60 * 24)
    while (date2 >= date1) {
        Dates.push(date2)
        date2 = new Date(date2.getTime() - day)
    }
    // console.log(Dates);

    return Dates
}

export var logsResolvers =
{
    Getlogs: (_parent: any, _args: any, db: DB) => {
        return db.prisma.visitor_Logs.findMany({
            where: {
                isActive: true,
            }
        })

    },
    GetTodayVisitors: (_parent: any, _args: any, db: DB) => {


        let Today = new Date().toISOString().split('T')[0]
        let Tom = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0])


        return prisma.visitor_Logs.findMany({
            include: {
                door: true,
                Visitor: {
                    include: {
                        Profile: true,
                        Gender: true,
                        Event: true
                    }
                }
            },
            where: {
                day:  new Date(Today),
                OR: [
                    { mainDoorIn: null },
                    { mainDoorOut: null },
                    { subDoorIn: null },
                    { subDoorOut: null },
                ]
            }, 
            orderBy:{
                Visitor:{
                    id:'desc'
                }
            }
        })

    },
    GetLogsVisitors: (_parent: any, _args: { data: VInput }, db: DB) => {
        console.log(_args?.data)

        let sDate: Date = _args.data.sDate || new Date()
        let eDate: Date = _args.data.eDate || new Date()
        eDate = new Date((new Date(eDate.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]))
  
        let Today = new Date().toISOString().split('T')[0]
        let Tom = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0])


        return prisma.visitor_Logs.findMany({
            include: {
                door: true,
                Visitor: {
                    include: {
                        Profile: true,
                        Gender: true,
                        Event: true
                    }
                }
            },
            where: {
                day: {
                    gte: new Date(sDate),
                    lt: new Date(eDate)
                }
            }
        })

    }   
}
export var logsMutations =
{
    setSubDoorIn: async (
        _parent: any,
        args: { data: number },
        context: DB,
    ) => {
        try {
            let dateNow = new Date();
            console.log(args.data)
            return context.prisma.visitor_Logs.update({
                where: {
                    id: args.data,
                },
                data: {
                    subDoorIn: dateNow,

                }
            }).then((data: any) => {
                console.log(data)

                return data?.subDoorIn
            }).catch((error: any) => {
                console.log(error)
                return null
            })


        } catch (error) {
            console.log(error);
            return null;
        }
    },
    setMainDoorIn: async (
        _parent: any,
        args: { data: number },
        context: DB,
    ) => {
        try {
            let dateNow = new Date();
            console.log(args.data)

            return context.prisma.visitor_Logs.update({
                where: {
                    id: args.data,
                },
                data: {
                    mainDoorIn: dateNow,

                }
            }).then((data: any) => {
                console.log(data)

                return data?.mainDoorIn
            }).catch((error: any) => {
                console.log(error)
                return null
            })


        } catch (error) {
            console.log(error);
            return null;
        }
    },

    setSubDoorOut: async (
        _parent: any,
        args: { data: number },
        context: DB,
    ) => {
        try {
            let dateNow = new Date();
            console.log(args.data)

            return context.prisma.visitor_Logs.update({
                where: {
                    id: args.data,
                },
                data: {
                    subDoorOut: dateNow,

                }
            }).then((data: any) => {
                console.log(data)

                return data?.subDoorOut
            }).catch((error: any) => {
                console.log(error)
                return null
            })


        } catch (error) {
            console.log(error);
            return null;
        }
    }, 
    setMainDoorOut: async (
        _parent: any,
        args: { data: number },
        context: DB,
    ) => {
        try {
            let dateNow = new Date();
            console.log(args.data)

            return context.prisma.visitor_Logs.update({
                where: {
                    id: args.data,
                },
                data: {
                    mainDoorOut: dateNow,
                }
            }).then((data: any) => {
                console.log(data)
                return data?.mainDoorOut
            }).catch((error: any) => {
                console.log(error)
                return null
            })


        } catch (error) {
            console.log(error);
            return null;
        }
    },

}
