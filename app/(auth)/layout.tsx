"use client"
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    if (user) {
        return null; // Or any loading indicator or redirect logic
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    );
};

export default ClientLayout;
