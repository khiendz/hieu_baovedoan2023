import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getAuthorById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await axios.get(`${domainBE}/api/author/${id}`);
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
        const res: any = await axios.get(`${domainBE}/api/author-by-name/${id}?tags=${tags}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllAuthor () {
    try {
        const res: any = await axios.get(`${domainBE}/api/author?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllAuthorWithRelative () {
    try {
        const res: any = await axios.get(`${domainBE}/api/author/all-author-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}



