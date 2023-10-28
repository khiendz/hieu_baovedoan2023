import { Employee } from "./Employee";

// model/UserAccount.ts
export class UserAccount {
    constructor(
      public UserId: number,
      public Username: string | null,
      public Password: string | null,
      public Role: string | null,
      public Employee: Employee[]
    ) {}
  }