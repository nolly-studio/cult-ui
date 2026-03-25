import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  const config = useRuntimeConfig()
  return `${config.public.appUrl || "https://cult-ui.com"}${path}`
}
