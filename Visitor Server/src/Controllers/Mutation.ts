 
import { BankDefs, BankMutations } from "./Bank/Bank";
import { DepartmentDefs, DepartmentMutations } from "./Department/Department";
import { DirectorateDefs, DirectorateMutations } from "./Directorate/Directorate";
import { DoorDefs, DoorMutations } from "./Door/Door";
import { EventDefs, EventMutations } from "./Event/Event";
import { GenderMutations, GenderDefs } from "./Gender/Gender";
import { MinistryDefs, MinistryMutations } from "./Ministry/Ministry";
import { PersonDefs, PersonMutations } from "./Person/Person";
import { ProfileDefs, ProfileMutations } from "./Profile/Profile";
import { VisitorDefs, VisitorMutations } from "./Visitor/Visitor";
import { logsDefs, logsMutations } from "./VisitorLogs/VisitorLogs";


export const MutationDefs = `
    type Mutation {
        ${GenderDefs}
        ${logsDefs}
        ${PersonDefs}
        ${DoorDefs}
        ${EventDefs}
        ${ProfileDefs}
        ${VisitorDefs} 
        ${BankDefs} 
        ${MinistryDefs} 
        ${DirectorateDefs} 
        ${DepartmentDefs} 
    }
` 

export const Mutation = {
    GenderMutations,
    ProfileMutations,
    logsMutations,
    DoorMutations,
    EventMutations,
    PersonMutations,
    VisitorMutations,
    BankMutations,
    MinistryMutations,
    DepartmentMutations,
    DirectorateMutations
};
