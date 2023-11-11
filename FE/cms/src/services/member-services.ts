import { Member } from 'Models/Member';
import axios from 'axios';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getMemberById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await axios.get(`${domainBE}/api/member/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllMember () {
    try {
        const res: any = await axios.get(`${domainBE}/api/member`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllMemberWithRelative () {
    try {
        const res: any = await axios.get(`${domainBE}/api/member/all-member-with-relative`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateMember(member: Member) {
    try {
        const res: any = await axios.put(`${domainBE}/api/member`, JSON.stringify(member), {
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

export async function AddMember(borrowedBook: Member) {
    try {
        const res: any = await axios.post(`${domainBE}/api/member`, JSON.stringify(borrowedBook), {
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

export async function DeleteMember(memberId: number) {
    try {
        const res: any = await axios.delete(`${domainBE}/api/member?memberId=${memberId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}
