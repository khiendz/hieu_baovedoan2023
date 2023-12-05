import { Account } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getAccountById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/account/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllAccount() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/account`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateAccount(account: Account) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/account`, account);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating account:', e);
    }

    return null;
}

export async function AddAccount(account: Account) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/account`, account);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error add account:', e);
    }

    return null;
}

export async function DeleteAccountById(accountId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/account?accountId=${accountId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete account:', e);
    }

    return null;
}


