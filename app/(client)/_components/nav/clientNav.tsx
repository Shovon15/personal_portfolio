"use client";
import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import ClientMobileSidebar from "./clientSidebar";
import { ThemeToggle } from "@/components/themeProvider/themeToggle";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "../../../../public/logo/coding.png";
import { useAuth } from "@/context/authProvider";

type Props = {};

const ClientNav = (props: Props) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path || "");
  const currentPathName = `/${pathNames
    .slice(0, pathNames.length + 1)
    .join("/")}`;

  // const { user } = useSelector((state: any) => state.auth);
  const { user } = useAuth();

  return (
    <nav className="bg-primary-foreground border-b border-gray-200 w-full sticky top-0 z-[9]">
      <div className="max-w-screen-2xl h-16 mx-auto flex justify-between items-center md:px-10 px-5">
        {/* ---------------------logo */}
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image src={logo} alt="logo" width={30} height={30} />
          <h1 className={cn("text-primary/90 font-bold")}>Shovon Mahamud</h1>
        </Link>
        {/* <Image src={logo} alt="logo" width={160} height={30} /> */}
        {/* -------------------------nav links */}
        <div className="hidden md:flex gap-3">
          {docsConfig.mainNav.map(({ href, title, disabled }) => (
            <div key={href} className="">
              {!disabled &&
                (href ? (
                  <MainNavLink
                    href={href}
                    className={cn(
                      `${
                        currentPathName === href
                          ? "text-primary  dark:text-primary"
                          : "text-muted-foreground"
                      } w-full justify-start px-2 font-inter cursor-pointer font-semibold`,
                    )}
                  >
                    {title}
                  </MainNavLink>
                ) : (
                  title
                ))}
            </div>
          ))}
        </div>
        {/* -------------------------user-------------*/}
        <div className="hidden md:flex gap-2">
          {user && (
            <>
              <Link href="/dashboard">
                <Avatar>
                  {user?.avatar?.url ? (
                    <AvatarImage src={user.avatar.url} />
                  ) : user?.name ? (
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                  ) : (
                    <AvatarFallback></AvatarFallback>
                  )}
                </Avatar>
              </Link>
            </>
          )}
          {/* -----------------------------------theme button  */}
          <ThemeToggle />
        </div>

        {/* ---------------------------------mobile side bar */}
        <ClientMobileSidebar />
      </div>
    </nav>
  );
};

export default ClientNav;

interface MainNavLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function MainNavLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MainNavLinkProps) {
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
