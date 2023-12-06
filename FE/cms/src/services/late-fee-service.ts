import { LateFee } from 'Models';
import { Member } from 'Models/Member';
import axios from 'axios';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getLateFeeById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/late-fee/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllLateFee () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/late-fee`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}


export async function UpdateLateFee(lateFee: LateFee) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/late-fee`, lateFee);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee:', e);
    }

    return null;
}

export async function AddLateFee(lateFee: LateFee) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/late-fee`, lateFee);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee:', e);
    }

    return null;
}

export async function DeleteLateFeeById(lateFeeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/late-fee?lateFeeId=${lateFeeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee:', e);
    }

    return null;
}
