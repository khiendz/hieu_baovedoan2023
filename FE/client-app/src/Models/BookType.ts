import { Book } from "./Book";

// model/BookType.ts
export class BookType {
    constructor(
      public BookTypeID: number,
      public Name: string,
      public Description: string | null,
      public Img: string | null,
      public Books: Book[]
    ) {}
  }