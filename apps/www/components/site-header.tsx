"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { AlertBanner } from "./alert-banner";
import { DistortedGlass } from "./distorted-glass";

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
          ? "supports-[backdrop-filter]:bg-background dark:bg-background -mb-12 bg-[#FAFAFA] backdrop-blur lg:backdrop-blur-xl"
          : "-mb-14"
      )}
    >
      <AlertBanner />
      <div className="relative z-10 flex h-14 items-center px-2">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between justify-end space-x-2">
          <nav className="flex items-center gap-2">
            <Link
              href="https://pro.cult-ui.com/pricing"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden inline-flex shrink-0 font-semibold md:inline-flex"
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
                    "w-9 px-0"
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
                  "w-9 px-0"
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
        <div className="relative z-0 -mt-[17px] hidden lg:block lg:w-full">
          <DistortedGlass></DistortedGlass>
        </div>
      ) : null}
    </header>
  );
}
