import { DB, db } from '../../context'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export interface ProfileInput {
    id?: number
    bio?: string
}

export const ProfileDefs = `
    createProfile(data: String): Profile
    updateProfile(data: ProfileInput): Profile
    deleteProfile(data: Int): Profile
    deleteProfiles : Int
`

export const ProfileQueries = `
     GetProfiles: [Profile!]!
`
 
export const ProfileType = `
    type Profile{
        id: Int!
        bio: String
    }
    input ProfileInput {
        id: Int!
        bio: String
    } 
` 
export var ProfileResolvers =
{
    GetProfiles: (_parent: any, _args: any, db: DB) => {
        console.log(db.prisma.profile.findMany({}))
        return db.prisma.profile.findMany({})
    }
}
export var ProfileMutations =
{
    createProfile: async (
        _parent: any,
        args: { data: string },
        db: DB,
    ) => {
        try {
            const data = await db.prisma.profile.create({
                data: {
                    bio: args.data
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateProfile: (
        _parent: any,
        args: { data: ProfileInput },
        db: DB,
    ) => {
        console.log("------------------------------")

        console.log(args.data)
        return prisma.profile.update({
            where: {
                id: args.data.id,
            },
            data: {
                bio: args.data.bio
            },
        }).then(data => {
            return data
        }).catch(error => {
            console.log(error)
            return null
        })
    },
    deleteProfile: (
        _parent: any,
        args: { data: number },
        db: DB,
    ) => {
        return db.prisma.profile.delete({
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
    deleteProfiles: (
        _parent: any
    ) => {
        try {
            return prisma.profile.deleteMany().then((data) => {
                let d = data.count
                return d;
            })
        } catch (error) {
            console.log(error)
        }
    },
}
