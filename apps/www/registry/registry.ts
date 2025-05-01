import { type Registry } from "shadcn/registry"

import { examples } from "@/registry/examples"
import { ui } from "@/registry/ui"

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: [...ui, ...examples],
} satisfies Registry
