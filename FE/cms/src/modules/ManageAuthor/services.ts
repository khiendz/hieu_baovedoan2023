import { Account, Author } from "Models";
import { AddAccount, AddAuthor, DeleteAccountById, DeleteAuthorById, UpdateAuthor } from "services";

export const changeAuthor = async (author: Author) => {
    try {
        const result = await UpdateAuthor(author);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddAuthor = async (author: Author) => {
    try {
        const result = await AddAuthor(author);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheAuthor = async (authorId: number) => {
    if (!authorId) return null;

    try {
        const result = await DeleteAuthorById(authorId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, authors: Author[], setAuthors: any) => {
    const result = await clearTheAuthor(key);
    const newData = authors.filter(
        (item: Author) => item.AuthorId !== key
    );
    if (result.status == 200)
        setAuthors(newData);
    return result;
};

export const handleAdd = async (author: Author, setAuthors: any, authors: Author[]) => {
    const result = await handleAddAuthor(author);
    if (result.data && result.status == 200)
        setAuthors([
            { ...result.data },
            ...authors,
        ]);
    return result;
};
