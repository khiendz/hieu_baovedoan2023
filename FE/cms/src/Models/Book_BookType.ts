import { toHexFormat } from "antd/es/color-picker/color";
import { Book } from "./Book";
import { BookType } from "./BookType";

export class Book_BookType {
    Book_BookTypeId: number;
    BookId: number;
    BookTypeId: number;
    Book: Book;
    BookType: BookType;
    constructor (BookId: number, BookTypeId: number, Book: Book, BookType: BookType) {
      this.BookId = BookId;
      this.BookId;
      this.BookTypeId = BookTypeId;
      this.Book = Book;
      this.BookType = BookType;
    }
  }