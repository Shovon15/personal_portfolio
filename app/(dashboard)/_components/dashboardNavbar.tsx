import { AlignLeft } from "lucide-react";
import { MobileSidebar } from "./Sidebar/mobileSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ThemeToggle } from "@/components/themeProvider/themeToggle";
import { useAuth } from "@/context/authProvider";
import Spinner from "@/components/spinner";

type NavProps = {
    handleSidebar: () => void;
    isSidebarOpen: boolean;
    // isDesktopWidth: boolean;
}

const DashboardNavbar = ({ handleSidebar, isSidebarOpen }: NavProps) => {

    // const { user } = useSelector((state: any) => state.auth);
    const { user, isLoading } = useAuth();

    // const user = {
    //     avatar: {
    //         url:"https://github.com/shadcn.png"
    //     },
    //     name: "shovon"
    // };

    return (
        <nav className="sticky top-0 z-50 w-full border-b dark:border-slate-100 bg-secondary dark:bg-secondary px-10">
            <div className="flex h-16 justify-between items-center">
                <div className="flex gap-4 items-center">
                    <MobileSidebar />
                    {isSidebarOpen && (
                        // <TooltipWrapper content="menu">
                        <Button variant="ghost" className="px-2.5" onClick={handleSidebar}>
                            <AlignLeft className="w-5 h-5" />
                        </Button>
                        // </TooltipWrapper>
                    )}
                    {/* <Logo /> */}
                </div>
                <div className="flex gap-3">
                    <Button asChild variant={"ghost"}>
                        <Link href="/" className="font-semibold">Home</Link>
                    </Button>
                </div>
                <div className="flex gap-3">
                    {isLoading ? (
                        <div><Spinner/></div> // This is your loading indicator
                    ) : (
                        user && (
                            <>
                                <Avatar>
                                    {user?.avatar?.url ? (
                                        <AvatarImage src={user?.avatar?.url} />
                                    ) : user?.name ? (
                                        <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                                    ) : (
                                        <AvatarFallback></AvatarFallback>
                                    )}
                                </Avatar>
                            </>
                        )
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;