import { DB } from '../../context'
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


export interface PersonInput {
    id?: number
    username?: string    
    password?: string
    
}

export const PersonDefs = `
    createPerson(data: String): Person
    updatePerson(data: PersonInput): Person
    deletePerson(data: Int): Person
    deletePersons : Int
    
`

export const PersonQueries = `
     GetPersons: [Person!]!
     PersonSignIn(data: PersonInput):  Person!
    
`
 



 
export const PersonType = `

 type Role{
        id: Int!
        name: String   
    }


    type RoleForPerson{
        id: Int!  
        person :Person
        role : Role
    }

    type Person{
        id: Int!
        username: String 
        password: String
        roleForPerson: [RoleForPerson]
    }
    input PersonInput {
        id: Int!
        username: String
        password: String
    }
`
export var PersonResolvers =
{
    GetPersons: (_parent: any, _args: any, db: DB) => {
        return db.prisma.person.findMany()
    },
    PersonSignIn: (_parent: any, args: { data: PersonInput }, db: DB) => {

        console.log(args.data.username)
        console.log(args.data.password)
 
        return prisma.person.findFirst({
            where: {
                username: args.data.username,
                password: args.data.password
            },
            include:{
                roleForPerson: {
                    include:{
                        role:true
                    }
                }
            }
        }).then(data => {
            console.log(data)
            if (data){

                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60),
                    data: `${data.username}${data.password}` 
                }, 'AhmedAbdulshakour');
                data.password = token

                //var decoded = jwt.verify(token, 'AhmedAbdulshakour');
                //console.log(decoded) // bar
            }

            console.log("data*********************************************************")
            console.log(data )
            return data
        }).catch(error => {
            console.log(error)
            return null
        })



       //return db.prisma.person.findMany()
    }
}
export var PersonMutations =
{
    createPerson: async (
        _parent: any,
        args: { data: string },
        db: DB,
    ) => {
        try {
            const data = await db.prisma.person.create({
                data: {
                    username: args.data,
                    password: args.data
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updatePerson: (
        _parent: any,
        args: { data: PersonInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.person.update({
            where: {
                id: args.data.id,
            },
            data: {
                username: args.data.username,
                password: args.data.password
            },
        }).then(data => {
            return data
        }).catch(error => {
            console.log(error)
            return null
        })
    },
    deletePerson: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.person.delete({
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
    deletePersons: (
        _parent: any
    ) => {
        try {
            return prisma.person.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
