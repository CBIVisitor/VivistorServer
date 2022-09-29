import { BankQueries, BankResolvers } from "./Bank/Bank";
import { DepartmentQueries, DepartmentResolvers } from "./Department/Department";
import { DirectorateQueries, DirectorateResolvers } from "./Directorate/Directorate";
import { DoorQueries, DoorResolvers } from "./Door/Door";
import { EventQueries, EventResolvers } from "./Event/Event";
import { GenderResolvers, GenderQueries } from "./Gender/Gender";
import { MinistryQueries, MinistryResolvers } from "./Ministry/Ministry";
import { PersonQueries, PersonResolvers } from "./Person/Person";
import { ProfileQueries, ProfileResolvers } from "./Profile/Profile";
import { VisitorQueries, VisitorResolvers } from "./Visitor/Visitor";
import { logsQueries, logsResolvers } from "./VisitorLogs/VisitorLogs";



export const Resolvers = `
type Query {
    ${GenderQueries}
    ${ProfileQueries}
    ${PersonQueries}
    ${EventQueries}
    ${VisitorQueries}
    ${logsQueries}
    ${DoorQueries}
    ${BankQueries}
    ${MinistryQueries}
    ${DepartmentQueries}
    ${DirectorateQueries}
}
`
//console.log(Resolvers)




export const Query = {
    GenderResolvers,
    ProfileResolvers,
    PersonResolvers,
    VisitorResolvers,
    DoorResolvers,
    EventResolvers,
    logsResolvers,
    BankResolvers,
    MinistryResolvers,
    DepartmentResolvers,
    DirectorateResolvers
};
