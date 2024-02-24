"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import { docsConfig } from "@/config/docs";

type MobileSidebarProp = {
	// isDesktopWidth: boolean;
};

export function MobileSidebar({ }: MobileSidebarProp) {
	const [open, setOpen] = React.useState(false);

	const paths = usePathname();
	const pathNames = paths.split("/").filter((path) => path || "");
	const currentPathName = `/${pathNames.slice(0, pathNames.length + 1).join("/")}`;

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className={`mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden`}
				>
					<AlignLeft className="h-5 w-5" />
					<span className="sr-only">Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pr-0">
				<ScrollArea className="my-4 h-[calc(100vh-3rem)] pb-10">
					<div className="flex flex-col space-y-2 pr-6">
						<MobileLink href="/dashboard" className="items-center max-w-24" onOpenChange={setOpen}>
							<span className="font-bold text-lg">Dashboard</span>
						</MobileLink>
						{docsConfig.sidebarNav.map((item, index) => (
							<div key={index} className="flex flex-col space-y-2 pt-4">
								<h4 className="font-bold">{item.title}</h4>
								{item?.items?.length &&
									item.items.map((item) => (
										<React.Fragment key={item.href}>
											{!item.disabled &&
												(item.href ? (
													<MobileLink
														href={item.href}
														onOpenChange={setOpen}
														className={cn(
															buttonVariants({
																variant: item.href === currentPathName ? "default" : "ghost",
															}),
															`${currentPathName === item.href ? "text-background dark:text-background" : "text-muted-foreground"} w-full justify-start px-2 cursor-pointer`
														)}
													>
														{item.title}
													</MobileLink>
												) : (
													item.title
												))}
										</React.Fragment>
									))}
							</div>
						))}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
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
