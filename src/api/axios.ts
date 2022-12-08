import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {App} from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $api: AxiosInstance;
    }
}

export function clearAuthVars() {
    localStorage.removeItem('admin');
    localStorage.removeItem('nick-name');
    localStorage.removeItem('user-id');
    localStorage.removeItem('login');
    localStorage.removeItem('token');
}

const api = axios.create();

export interface CommonResponse {
    code: number;
    data: any;
    message: string;
}

export function installAxios(app: App<Element>) {
    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
}

export {api};