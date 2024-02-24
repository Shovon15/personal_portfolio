"use client";

import React from "react";
import DesktopSidebar from "./_components/Sidebar/desktopSidebar";
import DashboardNavbar from "./_components/dashboardNavbar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Protected from "@/hooks/userHook";


// export const metadata: Metadata = {
//     title: {
//         default: "hello",
//         template: `dashboard`,
//     },
// }


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <Protected>
            <div className="flex">
                <aside
                    className={`${isSidebarOpen ? "w-0" : "w-72"
                        } transition-all duration-300 ease-in-out fixed hidden lg:block`}
                >
                    <DesktopSidebar handleSidebar={handleSidebar} />
                </aside>
                <div className={`${isSidebarOpen ? "" : "lg:ml-72"} flex-grow transition-all duration-300 ease-in-out`}>
                    <DashboardNavbar handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />

                    <div className="bg-secondary dark:bg-secondary min-h-screen">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </Protected>
    );
};

export default DashboardLayout;
