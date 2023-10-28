import { Book } from "./Book";

// model/Barcode.ts
export class Barcode {
    constructor(
      public BarcodeId: number,
      public BookId: number,
      public BarcodeValue: string | null,
      public Book: Book
    ) {}
  }