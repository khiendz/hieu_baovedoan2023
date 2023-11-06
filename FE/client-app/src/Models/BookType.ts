import { Book } from "./Book";
import { Book_BookType } from "./Book_BookType";

// model/BookType.ts
export class BookType {
  BookTypeId: number;
  Name: string;
  Description: string | null;
  Img: string | null;
  Book_BookType: Book_BookType[];
  Book: Book[];
}