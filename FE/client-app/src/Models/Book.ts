import { Barcode } from "./Barcode";
import { BookType } from "./BookType";
import { BorrowedBook } from "./BorrowedBook";

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
      public Barcodes: Barcode[],
      public BorrowedBook: BorrowedBook[]
    ) {}
  }