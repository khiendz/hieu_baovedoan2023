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
    
    try {
        const result = await axios(url, requestOptions);

        if (!result) {
            userService.ReturnNotFoundPage();
            return;
        }
        const response = handleResponse(result);
        return response;
    } catch (e: any) {
        console.log(e);
        return null;
    }
}

async function post(url: any, body: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader(url),
        },
        credentials: 'include',
        data: JSON.stringify(body),
    };
    const result = await axios(url, requestOptions);
    const response = handleResponse(result);
    return response;
}

async function put(url: any, body: any) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        data: JSON.stringify(body)
    };
    const result = await axios(url, requestOptions);
    const response = handleResponse(result);
    return response;
}

async function _delete(url: any) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    const result = await axios(url, requestOptions);
    const response = handleResponse(result);
    return response;
}


function authHeader(url: any) {
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
    if (response.status == 401)
        userService.ReturnUnauthorize();

    if (response.status == 404) 
        userService.ReturnNotFoundPage();

    return response;
}   