"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.cultLogoBasic className="h-6 w-6 fill-black  " />
          <span className=" text-lg font-bold sm:inline-block">cult ui</span>
          <span className="sr-only">{siteConfig.name}</span>
        </MobileLink>

        <div className="flex flex-col space-y-3 bg-background pt-4">
          <a
            href="https://pro.cult-ui.com/blocks"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-base font-semibold transition-colors hover:text-foreground/80"
            )}
          >
            Blocks <span className="text-xs text-cyan-500">(8 new)</span>
          </a>
          <a
            href="https://pro.cult-ui.com/sections"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-base font-semibold transition-colors hover:text-foreground/80"
            )}
          >
            Sections <span className="text-xs text-cyan-500">(10 new)</span>
          </a>
          <a
            href="https://newcult.co"
            className={cn(
              "text-base font-semibold transition-colors hover:text-foreground/80"
            )}
          >
            Templates <span className="text-xs text-cyan-500">(1 new)</span>
          </a>
        </div>

        <ScrollArea className="my-4 mr-2 h-[calc(100vh-12rem)] rounded-sm px-3 pb-2 shadow-inner ring-1 ring-border/60">
          <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((subItem) => (
                    <React.Fragment key={subItem.href || subItem.title}>
                      {subItem.href ? (
                        <MobileLink
                          href={subItem.href}
                          onOpenChange={setOpen}
                          className="text-muted-foreground"
                        >
                          {subItem.title}
                          {subItem.label && (
                            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                              {subItem.label}
                            </span>
                          )}
                        </MobileLink>
                      ) : (
                        <>
                          <span className="text-sm font-medium">
                            {subItem.title}
                          </span>
                          {subItem.items?.length && (
                            <div className="ml-4 flex flex-col space-y-2">
                              {subItem.items.map((nestedItem) => (
                                <MobileLink
                                  key={nestedItem.href ?? ""}
                                  href={nestedItem.href ?? "#"}
                                  onOpenChange={setOpen}
                                  className="text-sm text-muted-foreground"
                                >
                                  {nestedItem.title}
                                  {nestedItem.label && (
                                    <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                      {nestedItem.label}
                                    </span>
                                  )}
                                </MobileLink>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
