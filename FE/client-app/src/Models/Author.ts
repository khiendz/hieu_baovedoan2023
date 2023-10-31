import { Book } from "./Book";

export class Author {
    AuthorId: number; // id tác giả
    Name: string; // tên tác giả
    Description: string; // mô tả tác giả
    Books: Book[]; //các quyển sách được tác giả sáng tác
  
    constructor(AuthorId: number, Name: string, Description: string, Books: Book[]) {
      this.AuthorId = AuthorId;
      this.Name = Name;
      this.Description = Description;
      this.Books = Books;
    }
  }
  