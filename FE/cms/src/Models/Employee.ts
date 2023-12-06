import { EmployeeType } from "./EmployeeType";
import { UserAccount } from "./UserAccount";

// model/Employee.ts
export class Employee {
    constructor(
      public EmployeeId: number,
      public Name: string | null,
      public Phone: number | null,
      public WorkSchedule: string | null,
      public EmployeeTypeId: number,
      public EmployeeType: EmployeeType,
      public UserId: number,
      public UserAccount: UserAccount
    ) {}
  }