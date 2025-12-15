"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    isAdmin: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, refresh: string, redirectPath?: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.get('/auth/profile/');
                    setUser({
                        ...response.data,
                        isAdmin: response.data.is_staff || response.data.is_superuser
                    });
                } catch (error) {
                    console.error("Auth check failed:", error);
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = (token: string, refresh: string, redirectPath?: string) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refresh);
        // Fetch user profile immediately
        api.get('/auth/profile/').then(res => {
            setUser({
                ...res.data,
                isAdmin: res.data.is_staff || res.data.is_superuser
            });
            router.push(redirectPath || '/'); // Redirect to path or home/dashboard
        }).catch((err: any) => {
            console.error("Failed to fetch profile after login", err);
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
