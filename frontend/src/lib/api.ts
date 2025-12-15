import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refresh (optional but good practice)
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
            
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
                        refresh: refreshToken,
                    });
                    
                    if (response.status === 200) {
                        const { access } = response.data;
                        localStorage.setItem('access_token', access);
                        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh token failed, logout user
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/login';
                    }
                }
            } else {
                 if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    // Optional: Redirect to login
                 }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
