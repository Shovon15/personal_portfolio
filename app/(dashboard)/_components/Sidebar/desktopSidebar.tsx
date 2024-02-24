"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";
// import { TooltipWrapper } from "@/components/tooltipWrapper";

type SidebarProps = {
    handleSidebar: () => void;
    // isSidebarOpen?: boolean;
    // isDesktopWidth: boolean;
};

export default function DesktopSidebar({ handleSidebar }: SidebarProps) {

    // const paths = usePathname();
    // const pathNames = paths.split("/").filter((path) => path || "");
    // console.log(paths, "path")
    // const currentPathName = `/${pathNames.slice(0, pathNames.length + 1).join("/")}`;

    const paths = usePathname();
    const pathNames = paths && paths.split("/").filter((path) => path);
    // if (paths) {
    //     const currentPathName = `/${pathNames.slice(0, pathNames.length + 1).join("/")}`;
    //     console.log(pathNames, currentPathName);
    // } else {
    //     console.log("Path is not available.");
    // }
    let currentPathName = "";

    if (pathNames) {
        currentPathName = `/${pathNames.slice(0, pathNames.length + 1).join("/")}`;
    }


    return (
        <div className="bg-primary dark:bg-primary text-primary-foreground dark:taxt-primary-foreground shadow-xl">
            <div className="flex justify-between items-center p-2 h-16 border-b pl-7">
                <DashboardLink href="/dashboard" className="items-center flex gap-3">
                    <span className="font-bold text-lg">Dashboard</span>
                    {/* <RefreshCw size={18} /> */}
                </DashboardLink>
                {/* <TooltipWrapper content="close"> */}
                <Button onClick={handleSidebar} variant="ghost" className="px-2.5 hidden lg:block">
                    <X className="w-5 h-5" />
                </Button>
                {/* </TooltipWrapper> */}
            </div>
            <ScrollArea className="my-4 h-[calc(100vh-5rem)] pb-10 border-none">
                {docsConfig.sidebarNav.map((item, index) => (
                    <div key={index} className="flex flex-col px-10 space-y-1">
                        <h4 className="font-bold">{item.title}</h4>
                        {item?.items?.length &&
                            item.items.map((item) => (
                                <div key={item.href} className="space-y-2">
                                    {!item.disabled &&
                                        (item.href ? (
                                            <DashboardLink
                                                href={item.href}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: item.href === currentPathName ? "default" : "ghost",
                                                    }),
                                                    `${currentPathName === item.href ? "text-background dark:text-background" : "text-muted-foreground"} w-full justify-start px-2  cursor-pointer`
                                                )}
                                            >
                                                {item.title}
                                            </DashboardLink>
                                        ) : (
                                            item.title
                                        ))}
                                </div>
                            ))}
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}

interface DashboardLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function DashboardLink({ href, onOpenChange, className, children, ...props }: DashboardLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    );
}
