import { Author } from "./Author";
import { BookType } from "./BookType";
import { BorrowedBook } from "./BorrowedBook";
import { LateFeeType } from "./LateFeeType";
import { Publisher } from "./Publisher";

// model/Book.ts
export class Book {
    constructor(
      public BookId: number | null,
      public Title: string,
      public BookTypeId: number,
      public ISBN: string | null,
      public Quantity: number | null,
      public Location: string | null,
      public PublicYear: Date | null,
      public PublisherId: number | null,
      public AuthorId: number | null,
      public LateFeeTypeId: number | null,
      public Img: string | null,
      public BookType: BookType,
      public Publisher: Publisher,
      public Author: Author | null,
      public Barcode: string | null,
      public BorrowedBook: BorrowedBook[],
      public LateFeeType: LateFeeType
    ) {}
  }