"use client"



import { useAuth } from "@/context/authProvider";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useContext, useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";


type CustomPros = {
    children: React.ReactNode
}

export const Custom = ({ children }: CustomPros) => {
    // const [loading, setLoading] = useState<boolean>(true);

    const { isLoading } = useAuth();
    // console.log(isLoading, "authContext")
    // useEffect(() => {
    //     if (!isLoading) {
    //         setLoading(false);
    //     }
    // }, [isLoading]);

    // console.log(isLoading);

    return (
        <>
            {
                isLoading ?
                    <div className="flex justify-center items-center min-h-screen">
                        <BounceLoader
                            color="#053B50"
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <>{children}</>

            }
        </>
    )

}
