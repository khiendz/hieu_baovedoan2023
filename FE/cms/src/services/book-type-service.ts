import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 
export const typeRegion = {
    local: 0,
    global: 1
}

export async function getBookTypeByBookId(id: string) {
    if (!id)
        return null;
    
    try {
        const res: any = await axios.get(`${domainBE}/api/book-type/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllBookType () {
    try {
        const res: any = await axios.get(`${domainBE}/api/book-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}



