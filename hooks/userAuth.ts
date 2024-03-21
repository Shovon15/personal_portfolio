import { useAuth } from "@/context/authProvider";

const useUserAuth = () => {
    const { isLoading, user } = useAuth();
   
    if (!isLoading && user) {
        return true;
    }
    return false;
};

export default useUserAuth;
