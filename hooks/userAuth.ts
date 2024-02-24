import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUserAuth = () => {
    const { user } = useSelector((state: any) => state.auth);
    if (user) {
        return true;
    }
    return false;
};

export default useUserAuth;
