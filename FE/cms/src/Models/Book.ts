import { Author } from "./Author";
import { BookType } from "./BookType";
import { Book_BookType } from "./Book_BookType";
import { BorrowedBook } from "./BorrowedBook";
import { LateFeeType } from "./LateFeeType";
import { Publisher } from "./Publisher";

// model/Book.ts
export class Book {
  BookId: number;
  Title: string;
  ISBN: string | null;
  Quantity: number | null;
  Location: string | null;
  PublicYear: Date | null;
  Img: string | null;
  Barcode: string;
  PublisherId: number | null;
  AuthorId: number | null;
  LateFeeTypeId: number;

  Publisher: Publisher | null;
  Author: Author | null;
  BorrowedBook: BorrowedBook[];
  Book_BookType: Book_BookType[];
  BookType: BookType[];
}
  