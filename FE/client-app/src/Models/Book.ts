import { BookType } from "./BookType";
import { BorrowedBook } from "./BorrowedBook";
import { Publisher } from "./Publisher";

// model/Book.ts
export class Book {
    constructor(
      public BookId: number | null,
      public Title: string,
      public Author: string | null,
      public BookTypeId: number,
      public ISBN: string | null,
      public Quantity: number | null,
      public Location: string | null,
      public PublicYear: Date | null,
      public Img: string | null,
      public BookType: BookType,
      public Publisher: Publisher,
      public Barcode: string | null,
      public BorrowedBook: BorrowedBook[]
    ) {}
  }