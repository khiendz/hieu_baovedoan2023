import { Book } from 'Models/Book';
import { BorrowedBook } from 'Models/BorrowedBook';
import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getBorrowedBookById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await axios.get(`${domainBE}/api/borrowed-book/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllBorrowedBook () {
    try {
        const res: any = await axios.get(`${domainBE}/api/borrowedBook?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllBorrowedWithRelative () {
    try {
        const res: any = await axios.get(`${domainBE}/api/borrowedBook/all-book-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateBorrowedBook(borrowedBool: BorrowedBook) {
    try {
        const res: any = await axios.put(`${domainBE}/api/borrowed-book`, JSON.stringify(borrowedBool), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function AddBorrowedBook(borrowedBook: BorrowedBook) {
    try {
        const res: any = await axios.post(`${domainBE}/api/borrowed-book`, JSON.stringify(borrowedBook), {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function DeleteBorrowedBook(borrowedBookId: number) {
    try {
        const res: any = await axios.delete(`${domainBE}/api/borrowed-book?borrowedBookId=${borrowedBookId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}
