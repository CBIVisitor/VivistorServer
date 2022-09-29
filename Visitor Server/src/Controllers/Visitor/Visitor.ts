import { DB } from '../../context'
import { Prisma, PrismaClient } from "@prisma/client";
import { isDataView } from 'util/types';

const prisma = new PrismaClient()


export interface VisitorInput {
    id?: number
    fullname: string
    email?: string
    job_description?: string
    destination?: string
    mobile?: string
    h_Name?: string
    h_Department?: string
    h_Directorate?: string
    fromDate: Date
    toDate?: Date
    note?: string
    printId?: number
    Department?: number
    Directorate?: number
    Profile?: number
    Author: number
    Gender?: number
    Event?: number
    Door?: number
    Ministry?: number
    Bank?: number
    isActive?: boolean
}

export const VisitorDefs = `
    createVisitor(data: VisitorInput): Visitor 
    updateVisitor(data: VisitorInput): Visitor
    deleteVisitor(data: Int): Visitor
    deleteVisitors : Int
`

export const VisitorQueries = `
     GetVisitors: [Visitor!]! 
`

export const VisitorType = `
    type Visitor {
        id: Int 
        fullname: String!
        email: String 
        job_description: String
        destination: String
        mobile: String
        h_Name: String
        h_Department: String
        h_Directorate: String
        note: String
        fromDate: DateTime!
        toDate: DateTime
        printId: Int
        Department: Department
        Directorate: Directorate
        Profile: Profile
        Event: Event
        Door: Door
        Bank: Bank
        Ministry: Ministry
        Author: Int!
        Gender: Gender
        isActive:Boolean
    }
    input VisitorInput {
        id: Int 
        fullname: String!
        email: String
        job_description: String
        destination: String
        mobile: String
        h_Name: String
        h_Department: String
        h_Directorate: String
        note: String
        fromDate: DateTime!
        toDate: DateTime
        printId: Int
        Department: Int
        Directorate: Int
        Profile: Int 
        Event: Int
        Bank: Int
        Ministry: Int
        Door: Int
        Author: Int!
        Gender: Int
        isActive:Boolean
    }
`




function getListDates(date1: Date, date2: Date) {
    let Dates: Date[];
    Dates = []

    let day = (1000 * 60 * 60 * 24)
    while (date2 >= date1) {
        //"Friday", "Saturday" 
        if (!(date2.getDay() === 5 || date2.getDay() === 6)) Dates.push(date2)
        date2 = new Date(date2.getTime() - day)
    }
    // console.log(Dates);

    return Dates
}

export var VisitorResolvers =
{

    GetVisitors: (_parent: any, _args: any, db: DB) => {

        let Today = new Date().toISOString().split('T')[0]
        let Tom = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0])
        console.log("--*-*-*-*-*-*--")

        return db.prisma.visitor.findMany({
            where: {
                isActive: true,
                OR: [
                    {
                        Profile: { id: 1 },
                        fromDate: { gte: new Date(Today) }
                    }, 
                    {
                        Profile: { id: 2 },
                        fromDate: new Date(Today)
                    },
                    {
                        Profile: { id: 2 },
                        fromDate: new Date(Today)
                    },
                    {
                        Profile: { id: 4 },
                        toDate: { gte: new Date(Today) }
                    }
                ],

            },
            include: {
                Profile: true,
                Gender: true,
                Door: true,
                Department: true,
                Directorate: true
            },
            orderBy: {
                id: 'desc'
            }
        })

    },

    GetTodayVisitors: (_parent: any, _args: any, db: DB) => {


        let Today = new Date().toISOString().split('T')[0]
        let Tom = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0])

        return prisma.visitor_Logs.findMany({ orderBy: { id: 'desc' } })

        return prisma.visitor_Logs.findMany({

            orderBy: {
                //mainDoorIn: 'desc',
                //subDoorIn: 'desc',
                Visitor: {
                    id: 'asc'
                }
            },
            include: {
                door: true,
                Visitor: true
            },
            where: {
                day: {
                    gte: new Date(Today),
                    lt: new Date(Tom)
                }
            }
        })

    }

}
export var VisitorMutations =
{
    createVisitor: async (
        _parent: any,
        args: { data: VisitorInput },
        db: DB,
    ) => {
        try {
            let visitor: Prisma.VisitorCreateInput
            let visitorData = args.data
            let visitor_Logs: Prisma.Visitor_LogsCreateWithoutVisitorInput[] = []
            let oneLogs: Prisma.Visitor_LogsCreateWithoutVisitorInput

            console.log('visitorData --------- ', visitorData);




            visitor = {
                fullname: visitorData.fullname,
                email: visitorData.email,
                job_description: visitorData.job_description,
                destination: visitorData.destination,
                mobile: visitorData.mobile,
                h_Name: visitorData.h_Name,
                h_Department: visitorData.h_Department,
                h_Directorate: visitorData.h_Directorate,
                note: visitorData.note,
                fromDate: visitorData.fromDate,
                toDate: visitorData.toDate,
                Author: {
                    connect: {
                        id: 1
                    }
                },
                Profile: {
                    connect: {
                        id: visitorData.Profile,
                    },
                },


            }
            let Event: number = visitorData.Event || 0
            if (Event > 0) { visitor.Event = { connect: { id: Event }, } }

            let door: number = visitorData.Door || 0
            if (door > 0) { visitor.Door = { connect: { id: door }, } }
            let gender: number = visitorData.Gender || 0
            if (gender > 0) { visitor.Gender = { connect: { id: gender }, } }

            let bank: number = visitorData.Bank || 0
            if (bank > 0) { visitor.Bank = { connect: { id: bank }, } }

            let ministry: number = visitorData.Ministry || 0
            if (ministry > 0) { visitor.Ministry = { connect: { id: visitorData.Ministry } } }

            let department: number = visitorData.Department || 0
            if (department > 0) { visitor.Department = { connect: { id: visitorData.Department } } }


            let directorate: number = visitorData.Directorate || 0
            if (directorate > 0) { visitor.Directorate = { connect: { id: visitorData.Directorate } } }

            visitor_Logs = []
            let Profile: Number = visitorData.Profile || 0
            let Door: number = visitorData.Door || 0


            if (Profile == 4) {
                let Dates: Date[] = getListDates(new Date(visitorData.fromDate), new Date(visitorData?.toDate || ''));
                Dates.forEach(element => {
                    oneLogs = {
                        day: new Date(element),
                        online: true,
                        door: { connect: { id: Door } }
                    }

                    visitor_Logs.push(oneLogs)
                });
            } else if (Profile == 2) {
                oneLogs = {
                    mainDoorIn: new Date(),
                    day: new Date(visitorData.fromDate), online: true, door: { connect: { id: Door } }
                }
                visitor_Logs.push(oneLogs)
            } else {
                oneLogs = { day: new Date(visitorData.fromDate), online: true, door: { connect: { id: Door } } }
                visitor_Logs.push(oneLogs)
            }
            visitor.Logs = { create: visitor_Logs }
            console.log('{--- visitor ---}', visitor);
            console.log('{--- ----------------------------------------------------- ---}');
            console.log(JSON.stringify(visitor, null, 4));
            const data = await db.prisma.visitor.create({ data: visitor, include: { Door: true, Department: true, Directorate: true, Profile: true } });
            return data;
        } catch (error) {
            console.log(error);
            console.log(error);
            return null;
        }
    },
    updateVisitor: (
        _parent: any,
        args: { data: VisitorInput },
        db: DB,
    ) => {
        console.log("------------------------------")


        return prisma.visitor.update({
            where: {
                id: args.data.id,
            },
            data: {
                fullname: args.data.fullname,
                fromDate: args.data.fromDate,
                authorId: 1
            },
        }).then((data: any) => {
            return data
        }).catch((error: any) => {
            console.log(error)
            return null
        })
    },
    deleteVisitor: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {

        const deleteLogs = prisma.visitor_Logs.deleteMany({
            where: {
                visitorId: args.data,
            },
        })

        const deleteVisitor = prisma.visitor.delete({
            where: {
                id: args.data,
            },
        })

        return prisma.$transaction([deleteLogs, deleteVisitor])
            .then((data: any[]) => {
                console.log(data[1])
                return data[1]
            }).catch((error: any) => {
                console.log(error)
                return null
            })
    },
    deleteVisitors: (
        _parent: any
    ) => {
        try {
            return prisma.visitor.deleteMany().then((data: { count: any; }) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },

}
export var VisitorSubscription =
{
    GetVisitors: (_parent: any, _args: any, db: DB) => {
        return db.prisma.visitor.findMany({
            where: {
                isActive: true,
            },
            include: {
                Profile: true,
                Gender: true,
                Door: true
            },
        })

    },
    GetTodayVisitors: (_parent: any, _args: any, db: DB) => {


        let Today = new Date().toISOString().split('T')[0]
        let Tom = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0])


        return prisma.visitor_Logs.findMany({
            include: {
                door: true,
                Visitor: true
            },
            where: {
                day: {
                    gte: new Date(Today),
                    lt: new Date(Tom)
                }
            }
        })

    }

}