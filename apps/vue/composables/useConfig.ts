import { useLocalStorage } from "@vueuse/core"

import type { Style } from "@/registry/styles"
import type { Theme } from "@/registry/themes"

export type Config = {
  style: Style["name"]
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
  theme: Theme["name"]
  radius: number
}

const defaultConfig: Config = {
  style: "default",
  packageManager: "pnpm",
  installationType: "cli",
  theme: "zinc",
  radius: 0.5,
}

export function useConfig() {
  const config = useLocalStorage<Config>("config", defaultConfig)
  return config
}
