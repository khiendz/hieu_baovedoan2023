import { LateFeeType } from 'Models/LateFeeType';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getLateFeeTypeById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/late-fee-type/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllLateFeeType () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/late-fee-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}


export async function UpdateLateFeeType(lateFeeType: LateFeeType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/late-fee-type`, lateFeeType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee tpye:', e);
    }

    return null;
}

export async function AddLateFeeType(lateFeeType: LateFeeType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/late-fee-type`, lateFeeType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee type:', e);
    }

    return null;
}

export async function DeleteLateFeeTypeById(lateFeeTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/late-fee-type?lateFeeTypeId=${lateFeeTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating late fee type:', e);
    }

    return null;
}
