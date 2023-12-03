import { Book } from "Models/Book";
import { AddBook, DeleteBook, UpdateBook } from "services";

export const changeBook = async (book: Book) => {
    try {
        const result = await UpdateBook(book);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddBook = async (book: Book) => {
    try {
        const result = await AddBook(book);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheBook = async (bookId: number) => {
    if (!bookId) return null;

    try {
        const result = await DeleteBook(bookId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, books: Book[], setBook: any) => {
    const result = await clearTheBook(key);
    const newData = books.filter((item: Book) => item.BookId !== key);
    setBook(newData);
    return result;
};

export const handleAdd = async (book: Book, books: Book[], setBook: any) => {
    const result = await handleAddBook(book);
    if (result)
    setBook([{ ...result.data }, ...books]);
    return result;
};