"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";

import { DistortedGlass } from "./distorted-glass";
import { AlertBanner } from "./alert-banner";

interface SiteHeaderProps {
	githubLink?: React.ReactNode;
}

export function SiteHeader({ githubLink }: SiteHeaderProps) {
	let pathname = usePathname();
	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full",
				pathname?.includes("/docs")
					? "-mb-12 bg-[#FAFAFA]   backdrop-blur supports-[backdrop-filter]:bg-background dark:bg-background lg:backdrop-blur-xl"
					: "-mb-14",
			)}
		>
			<AlertBanner />
			<div className="relative z-10 flex h-14 items-center px-2">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-between space-x-2 justify-end">
					<nav className="flex items-center gap-2">
						<Link
							href="https://pro.cult-ui.com/pricing"
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({ size: "sm" }),
								"inline-flex shrink-0 font-semibold",
							)}
						>
							Get Cult Pro
						</Link>
						{githubLink ?? (
							<Link
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={cn(
										buttonVariants({
											variant: "ghost",
										}),
										"w-9 px-0",
									)}
								>
									<Icons.gitHub className="size-4" />
									<span className="sr-only">GitHub</span>
								</div>
							</Link>
						)}
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={cn(
									buttonVariants({
										variant: "ghost",
									}),
									"w-9 px-0",
								)}
							>
								<Icons.twitter className="size-3 fill-current" />
								<span className="sr-only">Twitter</span>
							</div>
						</Link>
						{pathname?.includes("/docs") ? <ModeToggle /> : null}
					</nav>
				</div>
			</div>

			{!pathname?.includes("/docs") ? (
				<div className="relative z-0 hidden lg:block lg:w-full -mt-[17px]">
					<DistortedGlass></DistortedGlass>
				</div>
			) : null}
		</header>
	);
}
