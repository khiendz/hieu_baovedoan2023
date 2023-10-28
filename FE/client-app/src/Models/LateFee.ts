import { BorrowedBook } from "./BorrowedBook";
import { Payment } from "./Payment";

// model/LateFee.ts
export class LateFee {
    constructor(
      public LateFeeId: number,
      public TransactionId: number,
      public FeeAmount: number,
      public BorrowedBook: BorrowedBook,
      public Payment: Payment[]
    ) {}
  }
  