import { RoleAccount } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getRoleAccountById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/role-account/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllRoleAccount() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/role-account`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateRoleAccount(roleAccount: RoleAccount) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/role-account`, roleAccount);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating account:', e);
    }

    return null;
}

export async function AddRoleAccount(roleAccount: RoleAccount) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/role-account`, roleAccount);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error add role account:', e);
    }

    return null;
}

export async function DeleteRoleAccountById(roleAccountId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/role-account?roleAccountId=${roleAccountId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete role account:', e);
    }

    return null;
}


