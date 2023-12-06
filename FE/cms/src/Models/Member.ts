import { BorrowedBook } from "./BorrowedBook";

// model/Member.ts
export class Member {
    constructor(
      public MemberId: number,
      public Name: string | null,
      public Address: string | null,
      public Phone: number | null,
      public Email: string | null,
      public JoinDate: Date | null,
      public MemberRoleId: number | null,
      public Member: Member,
      public BorrowedBook: BorrowedBook[]
    ) {}
  }