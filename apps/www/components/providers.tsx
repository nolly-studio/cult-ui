"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

import { TooltipProvider } from "@/components/ui/tooltip"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()
  const forcedThemeFromPathname = pathname === "/" ? "light" : undefined
  return (
    <JotaiProvider>
      <NextThemesProvider
        {...props}
        forcedTheme={forcedThemeFromPathname}
        defaultTheme="light"
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </JotaiProvider>
  )
}
