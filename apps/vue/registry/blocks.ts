import type { Registry } from "@/registry/schema"

export const blocks: Registry["items"] = [
  {
    name: "authentication-01",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "block/Authentication01.vue",
        type: "registry:block",
      },
    ],
    category: "Authentication",
    subcategory: "Login",
  },
]
