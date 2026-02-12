import { examples } from "@/registry/examples"
import { type Registry } from "@/registry/schema"
import { ui } from "@/registry/ui"

export const registry = {
  name: "cult/ui",
  homepage: "https://cult-ui.com",
  items: [...ui, ...examples],
} satisfies Registry
