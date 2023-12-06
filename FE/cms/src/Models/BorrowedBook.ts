import { Book } from "./Book";
import { LateFee } from "./LateFee";
import { Member } from "./Member";

export class BorrowedBook {
    constructor(
      public TransactionId: number,
      public MemberId: number,
      public BookId: number,
      public BorrowDate: Date | null,
      public DueDate: Date | null,
      public ReturnDate: Date | null,
      public Member: Member,
      public Book: Book,
      public LateFees: LateFee[]
    ) {}
  }