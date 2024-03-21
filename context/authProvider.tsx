"use client";

import { get } from "@/utils/fetchApi";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    avatar?: {
        url: string;
    };
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    fetchData: () => Promise<void>;
    logout: () => Promise<void>;
}

const initialAuthContext: AuthContextType = {
    user: null,
    isLoading: true,
    fetchData: async () => { },
    logout: async () => { },
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(initialAuthContext.user);
    const [isLoading, setIsLoading] = useState(initialAuthContext.isLoading);

    const fetchData = async () => {
        const token = Cookies.get("token");

        if (token) {
            setIsLoading(true);
            try {
                const response = await get(`/user-info`);
                const data = response.data?.payload.user;
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            localStorage.removeItem("user");
            setUser(null);
            setIsLoading(false);
        }
    };

    const logout = async () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };

    useEffect(() => {
        fetchData();
    }, []);

    const authInfo = {
        user,
        isLoading,
        fetchData,
        logout
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
}
