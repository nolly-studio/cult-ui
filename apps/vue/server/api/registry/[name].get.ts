import { promises as fs } from "fs"
import path from "path"
import { createError, getRouterParam } from "h3"
import { defineCachedEventHandler } from "nitropack/runtime"
import { registry } from "~/registry/index"

const registryMap = new Map(
  registry.items.map((item) => [item.name, item])
)

export default defineCachedEventHandler(
  async (event) => {
    const name = getRouterParam(event, "name")

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing component name",
      })
    }

    const component = registryMap.get(name)

    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: "Component not found",
      })
    }

    if (!component.files?.length) {
      throw createError({
        statusCode: 400,
        statusMessage: "Component has no files",
      })
    }

    const filesWithContent = await Promise.all(
      component.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path)
        const content = await fs.readFile(filePath, "utf8")
        return { ...file, content }
      })
    )

    return { ...component, files: filesWithContent }
  },
  { maxAge: 60 * 60 }
)
