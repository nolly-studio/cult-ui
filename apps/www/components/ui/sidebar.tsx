import type * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

function SidebarProvider({
	className,
	style,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-provider"
			className={cn("w-full", className)}
			style={
				{
					"--sidebar-width": "18rem",
					"--sidebar-menu-width": "14rem",
					...style,
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}

function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
	return (
		<aside
			data-slot="sidebar"
			className={cn("w-(--sidebar-width) shrink-0", className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			className={cn("flex h-full flex-col overflow-y-auto", className)}
			{...props}
		/>
	);
}

function SidebarGroup({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="sidebar-group"
			className={cn("space-y-1", className)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	...props
}: React.ComponentProps<"h4">) {
	return (
		<h4
			data-slot="sidebar-group-label"
			className={cn(
				"px-2 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			className={cn("space-y-0.5", className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			className={cn("grid gap-0.5", className)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			className={cn("list-none", className)}
			{...props}
		/>
	);
}

function SidebarMenuButton({
	className,
	asChild = false,
	isActive = false,
	type = "button",
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean;
	isActive?: boolean;
}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="sidebar-menu-button"
			data-active={isActive ? "true" : "false"}
			className={cn(
				"relative flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-[0.8rem] font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-foreground",
				className,
			)}
			{...(asChild ? props : { type, ...props })}
		/>
	);
}

export {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
};
