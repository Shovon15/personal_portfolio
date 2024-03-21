"use client"
import { Button } from "@/components/ui/button";
import { DashboardWrapper } from "../_components/dashboardWrapper";
import Link from "next/link";
// import { useLogoutMutation } from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authProvider";

const DashboardPage = () => {
    // const [logout, { isSuccess, isError }] = useLogoutMutation();
    const { logout } = useAuth()
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push('/');
    };
    return (
        <DashboardWrapper>
            <h1>user</h1>
            <div className="space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <Button asChild>
                        <Link href="/">update Profile</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/">update Password</Link>
                    </Button>
                </div>
                <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </div>
        </DashboardWrapper>
    );
};
export default DashboardPage;
