import { BookType, BorrowedBook } from "Models";
import { AddBookType, DeleteBookType } from "services";
import { AddBorrowedBook, DeleteBorrowedBookById, UpdateBorrowedBook } from "services/borrowedBook-services";

export const changeBorrowedBook = async (borrowedBook: BorrowedBook) => {
    try {
        const result = await UpdateBorrowedBook(borrowedBook);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddBorrowedBook = async (borrowedBook: BorrowedBook) => {
    try {
        const result = await AddBorrowedBook(borrowedBook);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheBorrowedBook = async (borrowedBookID: number) => {
    if (!borrowedBookID) return null;

    try {
        const result = await DeleteBorrowedBookById(borrowedBookID);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, borrowedBooks: BorrowedBook[], setBorrowedBooks: any) => {
    const result = await clearTheBorrowedBook(key);
    const newData = borrowedBooks.filter(
        (item: BorrowedBook) => item.TransactionId !== key
    );
    if (result?.status == 200)
        setBorrowedBooks(newData);
    return result;
};

export const handleAdd = async (borrowedBook: BorrowedBook, setBorrowedBooks: any, borrowedBooks: BookType[]) => {
    const result = await handleAddBorrowedBook(borrowedBook);
    if (result?.data && result.status == 200)
        setBorrowedBooks([
            { ...result?.data },
            ...borrowedBooks,
        ]);
    return result;
};
