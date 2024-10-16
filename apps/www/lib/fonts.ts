import {
  JetBrains_Mono as FontMono,
  Inter_Tight as FontSans,
} from "next/font/google"
import localFont from "next/font/local"
// import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

// export const fontSans = localFont({
//   src: "../fonts/haskoy.ttf",
//   variable: "--font-sans",
// })

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
// export const fontSans = GeistSans

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
