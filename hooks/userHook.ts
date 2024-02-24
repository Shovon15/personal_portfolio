import React from "react";
import useUserAuth from "./userAuth";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
};

const Protected = ({ children }: Props) => {
    const isAuthenticated = useUserAuth();
    return isAuthenticated ? children : redirect("/login");
};

export default Protected;


