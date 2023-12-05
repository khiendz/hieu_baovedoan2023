import { Author, BookType } from "Models";
import { AddAuthor, AddBookType, DeleteAuthorById, DeleteBookType, UpdateBookType } from "services";

export const changeBookType = async (bookType: BookType) => {
    try {
        const result = await UpdateBookType(bookType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddBookType = async (bookType: BookType) => {
    try {
        const result = await AddBookType(bookType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheBookType = async (bookTypeId: number) => {
    if (!bookTypeId) return null;

    try {
        const result = await DeleteBookType(bookTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, bookTypes: BookType[], setBookTypes: any) => {
    const result = await clearTheBookType(key);
    const newData = bookTypes.filter(
        (item: BookType) => item.BookTypeId !== key
    );
    if (result.status == 200)
        setBookTypes(newData);
    return result;
};

export const handleAdd = async (bookType: BookType, setBookTypes: any, bookTypes: BookType[]) => {
    const result = await handleAddBookType(bookType);
    if (result?.data && result.status == 200)
        setBookTypes([
            { ...result?.data },
            ...bookTypes,
        ]);
    return result;
};
