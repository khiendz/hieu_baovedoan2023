import getConfig from 'next/config';
import axios from 'axios'; // Add this line to import Axios
import { userService } from 'services/user-service';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

async function get(url: any) {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader(url)
    };
    return axios(url, requestOptions).then(handleResponse);
}

async function post(url: any, body: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        data: JSON.stringify(body) // Change 'body' to 'data' for Axios
    };
    const result = handleResponse(await axios(url, requestOptions));
    return result;
}

async function put(url: any, body: any) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        data: JSON.stringify(body) // Change 'body' to 'data' for Axios
    };
    return axios(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: any) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return axios(url, requestOptions).then(handleResponse);
}

// rest of the code remains unchanged

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    if (response && response?.data) 
        return response.data;

   else 
    return {
        data: null,
        message: "Có lỗi gì đó xảy ra",
        state: 401
    }
}