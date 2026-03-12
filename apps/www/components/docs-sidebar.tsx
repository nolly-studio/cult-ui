"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { SidebarNavItem } from "types/nav";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

function getIsActive(pathname: string | null, href?: string) {
	if (!pathname || !href) {
		return false;
	}

	if (href === "/docs") {
		return pathname === href;
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

function LabelBadge({ label }: { label?: string }) {
	if (!label) {
		return null;
	}

	if (label === "new") {
		return (
			<span className="rounded-sm border border-black bg-[#adfa1d] px-1.5 py-0.5 text-[10px] leading-none text-black">
				{label}
			</span>
		);
	}

	if (label === "recent") {
		return (
			<span className="rounded-sm border border-black bg-cyan-200 px-1.5 py-0.5 text-[10px] leading-none text-black">
				{label}
			</span>
		);
	}

	if (label === "updated") {
		return (
			<span className="rounded-sm border border-black bg-pink-400 px-1.5 py-0.5 text-[10px] leading-none text-black">
				{label}
			</span>
		);
	}

	return (
		<span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] leading-none text-foreground">
			{label}
		</span>
	);
}

function DocsSidebarItems({
	items,
	pathname,
	depth = 0,
}: {
	items: SidebarNavItem[];
	pathname: string | null;
	depth?: number;
}) {
	return (
		<SidebarMenu className={cn(depth > 0 && "pl-[2px]")}>
			{items.map((item, index) => {
				const hasChildren = item.items.length > 0;
				const isActive = getIsActive(pathname, item.href);

				return (
					<SidebarMenuItem key={`${item.title}-${index}`}>
						{item.href && !item.disabled ? (
							<SidebarMenuButton
								asChild
								isActive={isActive}
								className={cn(
									"justify-between ",
									depth > 0 && "h-7 text-[0.75rem]",
									item.external && "pr-3",
								)}
							>
								<Link
									href={item.href}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noreferrer" : undefined}
									data-sidebar-active={isActive ? "true" : undefined}
								>
									<span className="truncate">{item.title}</span>
									<LabelBadge label={item.label} />
								</Link>
							</SidebarMenuButton>
						) : (
							<div
								className={cn(
									"flex h-8 items-center justify-between rounded-md px-2 text-[1rem] font-medium font-pixel-square text-foreground",
									depth > 0 && "h-7 text-[0.75rem]",
								)}
							>
								<span className="truncate">{item.title}</span>
								<LabelBadge label={item.label} />
							</div>
						)}

						{hasChildren ? (
							<DocsSidebarItems
								items={item.items}
								pathname={pathname}
								depth={depth + 1}
							/>
						) : null}
					</SidebarMenuItem>
				);
			})}
		</SidebarMenu>
	);
}

export function DocsSidebar() {
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!pathname) return;

		const activeLink = containerRef.current?.querySelector<HTMLElement>(
			'[data-sidebar-active="true"]',
		);
		if (!activeLink) return;

		requestAnimationFrame(() => {
			activeLink.scrollIntoView({
				block: "center",
				inline: "nearest",
			});
		});
	}, [pathname]);

	return (
		<Sidebar className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-7rem)] overscroll-none bg-transparent lg:flex">
			<div className="h-(--top-spacing) shrink-0" />
			<div className="relative mt-2 h-full overflow-hidden">
				{/* <div className="h-9" /> */}
				<div className="pointer-events-none absolute -top-1 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
				<div className="pointer-events-none absolute bottom-8 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
				<div className="absolute top-12 right-0 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
				<SidebarContent
					ref={containerRef}
					className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2 pb-2 h-[calc(100svh-10rem)]"
				>
					{docsConfig.sidebarNav.map((section, index) => (
						<SidebarGroup
							key={`${section.title}-${index}`}
							className="pt-6 first:pt-6 "
						>
							<SidebarGroupLabel className="px-2 text-[1rem] font-semibold font-pixel-square uppercase tracking-wide text-foreground">
								{section.title}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<DocsSidebarItems items={section.items} pathname={pathname} />
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</div>
		</Sidebar>
	);
}
