// /components/NextBreadcrumb.tsx
"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type TBreadCrumbProps = {
    homeElement?: ReactNode;
    separator: ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
};

const Breadcrumb = ({
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks,
}: TBreadCrumbProps) => {

    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);

    return (
        <div>
            <Card className="flex px-3 py-2 bg-primary-foreground">

                {/* <li className={listClasses}>
                    <Link href={`/dashboard`}>{homeElement}</Link>
                </li> */}
                {/* {pathNames.length > 0 && separator} */}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
                    return (
                        <React.Fragment key={index}>
                            <div className="flex items-center p-0">
                                <Button variant={"ghost"} className={itemClasses} asChild size="sm">
                                    <Link href={href}>{itemLink}</Link>
                                </Button>
                                {pathNames.length !== index + 1 && <ChevronRight className="text-muted-foreground" />}
                            </div>
                        </React.Fragment>
                    );
                })}
            </Card>
        </div>
    );
};
export default Breadcrumb;

