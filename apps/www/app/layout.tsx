import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster as NewYorkSonner } from "@/components/ui/sonner"
import {
  Toaster as DefaultToaster,
  Toaster as NewYorkToaster,
} from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { AnimatedBackgroundGuides } from "@/components/background-guides"
import { ThemeProvider } from "@/components/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeSwitcher } from "@/components/theme-switcher"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · Cult UI`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,

  /* Google ignores meta-keywords for ranking, but others may use them. */
  keywords: [
    "shadcn",
    "shadcn ui",
    "shadcn components",
    "shadcn blocks",
    "shadcn templates",
    "shadcn animate",
    "tailwind css",
    "next.js 15",
    "typescript ui kit",
  ],

  authors: [{ name: "Jordan Gilliam", url: "https://cult-ui.com" }],
  creator: "Jordan Gilliam",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "Cult UI",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Cult UI – Shadcn UI Components, Blocks & Templates",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@nolansym",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "relative min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <AnimatedBackgroundGuides />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <div className="relative z-10 flex min-h-screen flex-col ">
                {children}
              </div>
            </div>
            <TailwindIndicator />
            <ThemeSwitcher />
            <Analytics />

            <GoogleAnalytics gaId="G-5K1GVTD1JG" />

            <NewYorkToaster />
            <DefaultToaster />
            <NewYorkSonner />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
