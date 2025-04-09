"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { MainNavLink } from "./clientNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { MobileThemeToggle } from "./MobileThemeToggle";

type Props = {};

const ClientMobileSidebar = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path || "");
  const currentPathName = `/${pathNames
    .slice(0, pathNames.length + 1)
    .join("/")}`;

  return (
    <div className="z-[99999] md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className={`mr-2 px-0 py-0 h-5 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden`}
          >
            <AlignLeft className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <ScrollArea className="my-4 h-[calc(100vh-3rem)] pb-10 ">
            <div className="space-y-3 pr-5">
              {docsConfig.mainNav.map(({ href, title, disabled }) => (
                <div
                  key={href}
                  className="border-b border-primary   py-2 flex justify-center items-center"
                >
                  {!disabled &&
                    (href ? (
                      <MainNavLink
                        href={href}
                        onOpenChange={setOpen}
                        className={cn(
                          `${
                            currentPathName === href
                              ? "text-primary  dark:text-primary"
                              : "text-muted-foreground"
                          } w-full px-2 font-inter cursor-pointer font-semibold`,
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
            <div className=" pt-10">
              <MobileThemeToggle />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientMobileSidebar;
