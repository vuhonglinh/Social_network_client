import { TokenType, UserType } from '@/type/auth.type';
import axios from 'axios';
import { normalize } from 'path';

class Http {
    public instance;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            withCredentials: true
        });
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (['/login', '/register', '/remember-me'].some(item => item === normalize(url || ''))) {
                    const { access_token, refresh_token } = response.data.data.token as TokenType;
                    const user = response.data.data.user as UserType;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    localStorage.setItem('user', JSON.stringify(user));
                } else if ('/logout' === normalize(url || '')) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user');
                }
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

export const isClient = () => typeof window !== 'undefined';

export const IsAxiosError = (error: any) => {
    return error.isAxiosError || false;
}

const http = new Http().instance;

export default http;
