import axios from 'axios';
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

export async function getPublisherByName(id: string,tags: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/publisher-by-name/${id}?tags=${tags}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllPublisher () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/publisher?tag=1`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllPublisherWithRelative () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/publisher/all-publisher-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}



