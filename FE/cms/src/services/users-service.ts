import { User } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getUserById(id: number) {
    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/user/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllUser() {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/user`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function UpdateUser(user: User) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/user`, user);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating account:', e);
    }

    return null;
}

export async function AddUser(user: User) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/user`, user);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error add user:', e);
    }

    return null;
}

export async function DeleteUserById(userId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/user?userId=${userId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error delete account:', e);
    }

    return null;
}


