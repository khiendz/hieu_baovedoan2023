import { UserAccount } from "./UserAccount";

// model/Employee.ts
export class Employee {
    constructor(
      public EmployeeId: number,
      public Name: string | null,
      public Phone: number | null,
      public WorkSchedule: string | null,
      public UserId: number,
      public UserAccount: UserAccount
    ) {}
  }