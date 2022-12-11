import {AxiosResponse} from 'axios';
import {api, clearAuthVars, CommonResponse} from '@/api/axios';

export interface LoginRequest{
    account: string;
    password: string;
}

export function login(request: LoginRequest) {
    return api.post(`api/account/login`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            clearAuthVars();
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export function logout() {
    return api.delete(`api/account/logout`).then((response: AxiosResponse<CommonResponse>) => {
        clearAuthVars()
        // location.reload()
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }

    })
}

export interface JoinRequest{
    uid: string,
    'nick-name': string,
    email: string,
    password: string
}

export function join(request: JoinRequest) {
    return api.post('/api/account/join',request).then((response: AxiosResponse<CommonResponse>) => {
        if(response.data.code!=0){
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}