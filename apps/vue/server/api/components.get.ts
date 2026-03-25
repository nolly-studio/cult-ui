import { defineEventHandler } from "h3"
import { registry } from "~/registry/index"

export default defineEventHandler(() => {
  return registry.items.map((item) => ({
    name: item.name,
    type: item.type,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files: item.files,
  }))
})
