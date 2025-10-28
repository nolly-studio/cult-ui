"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { TooltipProvider } from "@/components/ui/tooltip"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const pathname = usePathname()
  const forcedThemeFromPathname = pathname === "/" ? "light" : undefined
  return (
    <JotaiProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        forcedTheme={forcedThemeFromPathname}
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        {...props}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </JotaiProvider>
  )
}
