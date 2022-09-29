import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeResolver } from 'graphql-scalars'  
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive'
import { Query, Resolvers } from './Controllers/Resolver'
import { Mutation, MutationDefs } from './Controllers/Mutation'
import { inputs } from './Controllers/Inputs'

const typeDefs = ` 

    ${Resolvers}
    ${MutationDefs} 
    ${inputs}  
    scalar DateTime
`

const resolvers = {
    Query: {
        ...Query.GenderResolvers,
        ...Query.VisitorResolvers,
        ...Query.ProfileResolvers,
        ...Query.PersonResolvers,
        ...Query.EventResolvers,
        ...Query.DoorResolvers,
        ...Query.logsResolvers,
        ...Query.BankResolvers,
        ...Query.MinistryResolvers,
        ...Query.DepartmentResolvers,
        ...Query.DirectorateResolvers,
    },
    Mutation: {
        ...Mutation.GenderMutations,
        ...Mutation.VisitorMutations,
        ...Mutation.PersonMutations,
        ...Mutation.ProfileMutations,
        ...Mutation.EventMutations,
        ...Mutation.DoorMutations,
        ...Mutation.logsMutations,
        ...Mutation.BankMutations,
        ...Mutation.MinistryMutations,
        ...Mutation.DirectorateMutations,
        ...Mutation.DepartmentMutations
    },
   
    DateTime: DateTimeResolver, 
}
export const schema = makeExecutableSchema({
    resolvers,
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
}) 