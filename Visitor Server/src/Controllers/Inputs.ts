
import { BankType } from "./Bank/Bank";
import { DepartmentType } from "./Department/Department";
import { DirectorateType } from "./Directorate/Directorate";
import { DoorType } from "./Door/Door";
import { EventType } from "./Event/Event";
import { GenderType } from "./Gender/Gender";
import { MinistryType } from "./Ministry/Ministry";
import { PersonType } from "./Person/Person";
import { ProfileType } from "./Profile/Profile";
import { VisitorType } from "./Visitor/Visitor";
import { Visitor_LogsType } from "./VisitorLogs/VisitorLogs";
export const inputs = `
    ${GenderType}
    ${Visitor_LogsType}
    ${DoorType}
    ${ProfileType}
    ${EventType}
    ${PersonType}
    ${VisitorType} 
    ${BankType} 
    ${MinistryType} 
    ${DepartmentType} 
    ${DirectorateType} 
`