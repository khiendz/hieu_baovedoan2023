import { Member } from 'Models/Member';
import { MemberRole } from 'Models/MemberRole';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getMemberRoleById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/member-role/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllMemberRole () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/member-role`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateMemberRole(memberRole: MemberRole) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/member-role`, memberRole);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating member role:', e);
    }

    return null;
}

export async function AddMemberRole(memberRole: MemberRole) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/member-role`, memberRole);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating member role:', e);
    }

    return null;
}

export async function DeleteMemberRole(memberRoleId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/member-role?memberRoleId=${memberRoleId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating member role:', e);
    }

    return null;
}
