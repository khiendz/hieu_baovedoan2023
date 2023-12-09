import { Account } from "./Account.model";

export class User {
    UserId: number | null;
    FirstName: string;
    LastName: string;
    Address: number;
    Phone: number;
    AccountId: number | null;
    Account: Account[];
}