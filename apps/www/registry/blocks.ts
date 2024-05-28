import { Registry } from "@/registry/schema"

export const blocks: Registry = [
  {
    name: "authentication-01",
    type: "components:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: ["block/authentication-01.tsx"],
    category: "Authentication",
    subcategory: "Login",
  },
]
