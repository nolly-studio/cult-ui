import { type Registry } from "shadcn/registry"

import { examples } from "@/registry/examples"
import { ui } from "@/registry/ui"

export const registry = {
  name: "cult/ui",
  homepage: "https://cult-ui.com",
  items: [...ui, ...examples],
} satisfies Registry
