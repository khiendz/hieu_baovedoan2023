import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getBookById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await axios.get(`${domainBE}/api/book/${id}`);
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
        const res: any = await axios.get(`${domainBE}/api/book-by-name/${id}?tags=${tags}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllBook () {
    try {
        const res: any = await axios.get(`${domainBE}/api/book?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllBookWithType () {
    try {
        const res: any = await axios.get(`${domainBE}/api/book/all-book-with-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}



