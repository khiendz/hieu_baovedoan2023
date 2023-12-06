import { Payment } from 'Models';
import { Publisher } from 'Models/Publisher';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getPublisherById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/publisher/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllPublisher () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/publisher`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}


export async function UpdatePublisher(publisher: Publisher) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/publisher`, publisher);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating publisher:', e);
    }

    return null;
}

export async function AddPublisher(publisher: Publisher) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/publisher`, publisher);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating publisher:', e);
    }

    return null;
}

export async function DeletePublisherById(publisherId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/publisher?publisherId=${publisherId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating publisher:', e);
    }

    return null;
}

