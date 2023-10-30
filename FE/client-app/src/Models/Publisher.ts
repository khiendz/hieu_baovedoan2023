import { Book } from "./Book";

export class Publisher {
    PublisherId: number;
    Name: string;
    Address?: string | null;
    PHONE?: string | null;
    Website?: string | null;
    Book: Book[];
  
    constructor(
      PublisherId: number,
      Name: string,
      Address?: string | null,
      PHONE?: string | null,
      Website?: string | null,
      Book: Book[] = []
    ) {
      this.PublisherId = PublisherId;
      this.Name = Name;
      this.Address = Address;
      this.PHONE = PHONE;
      this.Website = Website;
      this.Book = Book;
    }
  }