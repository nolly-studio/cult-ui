import { defineCachedEventHandler } from "nitropack/runtime"
import { registry } from "~/registry/index"

const components = registry.items.map((item) => ({
  name: item.name,
  type: item.type,
  description: item.description,
  dependencies: item.dependencies,
  registryDependencies: item.registryDependencies,
  files: item.files,
}))

export default defineCachedEventHandler(
  () => components,
  { maxAge: 60 * 60 }
)
