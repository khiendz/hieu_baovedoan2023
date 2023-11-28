import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from '../helpers/';

// Kiểm tra xem code đang chạy ở phía client hay server
const isClientSide = typeof window !== 'undefined';
const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

// Sử dụng getConfig() chỉ khi đang chạy ở phía client
const { publicRuntimeConfig = "" } = isClientSide ? getConfig() : {};

const baseUrl = isClientSide ? `${publicRuntimeConfig.apiUrl}/users` : '';
const storedUserData = isClientSide ? localStorage?.getItem('user') : null;
const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
const userSubject = new BehaviorSubject(initialUserData);

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    getAll,
    ReturnUnauthorize
};

export async function login(username: string, password: string) {
    try {
        const url = `${domainBE}/api/users/authenticate`;
        const params = { username, password };
        const res: any = await fetchWrapper.post(url,params);
        if (res.status == 200) {
            userSubject.next(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            return res;
        }
    } catch (e) {
        console.error('Error updating book:', e);
    }

    return null;
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/unauthorize');
}

function ReturnUnauthorize () {
    Router.push('/unauthorize');
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}
