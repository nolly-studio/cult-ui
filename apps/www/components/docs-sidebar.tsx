"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { SidebarNavItem } from "types/nav";

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
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

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
      <span className="shrink-0 rounded-sm border border-black bg-[#adfa1d] px-1.5 py-0.5 text-[10px] leading-none text-black">
        {label}
      </span>
    );
  }

  if (label === "recent") {
    return (
      <span className="shrink-0 rounded-sm border border-black bg-cyan-200 px-1.5 py-0.5 text-[10px] leading-none text-black">
        {label}
      </span>
    );
  }

  if (label === "updated") {
    return (
      <span className="shrink-0 rounded-sm border border-black bg-pink-400 px-1.5 py-0.5 text-[10px] leading-none text-black">
        {label}
      </span>
    );
  }

  return (
    <span className="bg-muted text-foreground shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] leading-none">
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
          <SidebarMenuItem
            key={`${item.title}-${index}`}
            className="mr-1 hover:cursor-pointer"
          >
            {item.href && !item.disabled ? (
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  "min-w-0 justify-between gap-2",
                  depth > 0 && "h-7 text-[0.75rem]",
                  item.external && "pr-3"
                )}
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  data-sidebar-active={isActive ? "true" : undefined}
                >
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  <LabelBadge label={item.label} />
                </Link>
              </SidebarMenuButton>
            ) : (
              <div
                className={cn(
                  "font-pixel-square text-foreground flex h-8 min-w-0 items-center justify-between gap-2 rounded-md px-2 text-[1rem] font-medium",
                  depth > 0 && "h-7 text-[0.75rem]"
                )}
              >
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
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
      '[data-sidebar-active="true"]'
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
        <div className="from-background via-background/80 to-background/50 pointer-events-none absolute -top-1 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b blur-xs" />
        <div className="from-background via-background/80 to-background/50 pointer-events-none absolute bottom-8 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-t blur-xs" />
        <div className="via-border absolute top-12 right-0 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent to-transparent lg:flex" />
        <SidebarContent
          ref={containerRef}
          className="no-scrollbar mx-auto h-[calc(100svh-10rem)] w-(--sidebar-menu-width) overflow-x-hidden px-2 pb-2"
        >
          {docsConfig.sidebarNav.map((section, index) => (
            <SidebarGroup
              key={`${section.title}-${index}`}
              className="pt-6 first:pt-6"
            >
              <SidebarGroupLabel className="font-pixel-square text-foreground px-2 text-[1rem] font-semibold tracking-wide uppercase">
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
