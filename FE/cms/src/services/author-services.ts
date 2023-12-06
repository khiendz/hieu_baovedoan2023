import { Author } from 'Models/Author';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getAuthorById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/author/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAuthorByName(id: string,tags: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/author-by-name/${id}?tags=${tags}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllAuthor () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/author?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllAuthorWithRelative () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/author/all-author-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateAuthor(author: Author) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/author`, author);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}


export async function AddAuthor(author: Author) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/author`, author);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

export async function DeleteAuthorById(authorId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/author?authorId=${authorId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating author:', e);
    }

    return null;
}

