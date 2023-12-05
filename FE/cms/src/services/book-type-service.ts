import { BookType } from 'Models';
import axios from 'axios';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 
export const typeRegion = {
    local: 0,
    global: 1
}

export async function getBookTypeByBookId(id: string) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book-type/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllBookType () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/book-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateBookType(bookType: BookType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/book-type`, bookType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function AddBookType(bookType: BookType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/book-type`, bookType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book type:', e);
    }

    return null;
}

export async function DeleteBookType(bookTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/book-type?bookTypeId=${bookTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book type:', e);
    }

    return null;
}




