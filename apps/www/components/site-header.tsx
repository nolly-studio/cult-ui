"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { ghStars } from "@/lib/fetchGhStars"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
// import { AlertBanner } from "@/components/alert-banner"
// import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"

import { DistortedGlass } from "./distorted-glass"

export function SiteHeader() {
  let pathname = usePathname()
  const stars = ghStars()

  return (
    <>
      {/* <AlertBanner /> */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full    ",
          pathname?.includes("/docs")
            ? "-mb-12 bg-[#FAFAFA]   backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:backdrop-blur-xl dark:bg-[#171517]"
            : "-mb-14"
        )}
      >
        <div className="flex h-14 items-center  px-2 ">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {!pathname?.includes("/docs") ? (
              <div className="hidden lg:block lg:w-full">
                <DistortedGlass></DistortedGlass>
              </div>
            ) : null}

            {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div> */}
            <nav className="flex items-center ">
              {/* <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-auto px-0"
                  )}
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub {stars || "2.3k+"}</span>
                </div>
              </Link> */}
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "  rounded-xl transition-all hover:bg-muted/50"
                )}
              >
                <Icons.gitHub className="mr-1 h-auto w-5" />
                {stars || "2.3k"}+
              </Link>
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
                  <Icons.twitter className="h-3 w-3 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              {pathname?.includes("/docs") ? <ModeToggle /> : null}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
