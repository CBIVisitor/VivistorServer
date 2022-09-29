import { DB, db } from '../../context'
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()


export interface DepartmentInput {
    id?: number
    name: string 
    directorateId : number
}

export const DepartmentDefs = `
    createDepartment(data: DepartmentInput): Department
    updateDepartment(data: DepartmentInput): Department
    deleteDepartment(data: Int): Department
    deleteDepartments : Int
`

export const DepartmentQueries = `
     GetDepartments: [Department!]!
`

export const DepartmentType = `
    type Department{
        id: Int!
        name: String 
        directorateId :Int
    }
    input DepartmentInput {
        id: Int!
        name: String  
        directorateId :Int
    }
`
export var DepartmentResolvers =
{
    GetDepartments: (_parent: any, _args: any, db: DB) => {
        return db.prisma.department.findMany()
    }
}
export var DepartmentMutations =
{
    createDepartment: async (
        _parent: any,
        args: { data: DepartmentInput },
        db: DB,
    ) => { 
        


        try {
            const data = await db.prisma.department.create({
                data: {
                    name:args.data.name,
                    directorateId: args.data.directorateId
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateDepartment: (
        _parent: any,
        args: { data: DepartmentInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.department.update({
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
    deleteDepartment: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.department.delete({
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
    deleteDepartments: (
        _parent: any
    ) => {
        try {
            return prisma.department.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
