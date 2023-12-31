import { Book } from 'Models/Book';
import axios from 'axios';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getBookById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getBookByName(id: string,tags: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book-by-name/${id}?tags=${tags}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllBook () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllBookWithRelative () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book/all-book-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateBook(book: Book) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/book`, book);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function AddBook(book: Book) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/book`, book);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function DeleteBook(bookId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/book?bookId=${bookId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

