import { existsSync, readdirSync, readFileSync } from "node:fs"
import { builtinModules } from "node:module"
import path from "node:path"
import { registryItemSchema } from "shadcn/schema"

type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; type: string }[]
}

const ROOT = path.resolve(import.meta.dirname, "..")
const BUILD_DIR = path.join(ROOT, "public/r")
const DOCS_DIR = path.join(ROOT, "content/docs/components")

// Peer packages every shadcn project already has.
const PROVIDED = new Set(["react", "react-dom", "next", ...builtinModules])

const read = (file: string) => readFileSync(path.join(ROOT, file), "utf8")
const registry: { items: RegistryItem[] } = JSON.parse(read("registry.json"))
const names = new Set(registry.items.map((item) => item.name))
const errors: string[] = []

/** `@scope/pkg/sub@^1.0.0` → `@scope/pkg` */
function packageName(spec: string) {
  const withoutVersion = spec.replace(/(?!^)@[^/]*$/, "")
  const parts = withoutVersion.split("/")
  return withoutVersion.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

/** `button`, `@cult-ui/button`, or `https://…/r/button.json` → `button` */
function dependencyName(dep: string) {
  return dep
    .split("/")
    .at(-1)!
    .replace(/\.json$/, "")
}

function isCultReference(dep: string) {
  return dep.startsWith("@cult-ui/") || /cult-ui\.com\/r\//.test(dep)
}

function importsOf(source: string) {
  const code = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
  const specs = new Set<string>()
  const patterns = [
    /\b(?:import|export)\b[^'"`;]*?\bfrom\s*["']([^"']+)["']/g,
    /\bimport\s*["']([^"']+)["']/g,
    /\bimport\(\s*["']([^"']+)["']\s*\)/g,
  ]
  for (const pattern of patterns) {
    for (const [, spec] of code.matchAll(pattern)) specs.add(spec)
  }
  return specs
}

function checkImports(item: RegistryItem, file: string, source: string) {
  const declared = new Set((item.dependencies ?? []).map(packageName))
  const registryDeps = item.registryDependencies ?? []
  const ownFiles = new Set(
    item.files.map((f) => path.basename(f.path).replace(/\.[^.]+$/, ""))
  )

  for (const spec of importsOf(source)) {
    if (spec.startsWith(".") || spec === "@/lib/utils") continue

    const local = spec.match(
      /^@\/(components\/ui|registry\/default\/ui)\/(.+)$/
    )
    if (local) {
      const [, folder, name] = local
      if (ownFiles.has(name)) continue
      const declaredDep = registryDeps.find((d) => dependencyName(d) === name)
      if (!declaredDep) {
        errors.push(
          `${item.name}: ${file} imports "${spec}" but registryDependencies is missing "${name}"`
        )
      } else if (
        folder === "registry/default/ui" &&
        !isCultReference(declaredDep)
      ) {
        errors.push(
          `${item.name}: "${name}" is a Cult UI item, so declare it as "@cult-ui/${name}" or its URL, not "${declaredDep}"`
        )
      }
      continue
    }

    if (spec.startsWith("@/")) {
      errors.push(
        `${item.name}: ${file} imports "${spec}", which no registry item installs`
      )
      continue
    }

    const pkg = packageName(spec.replace(/^node:/, ""))
    if (!PROVIDED.has(pkg) && !declared.has(pkg)) {
      errors.push(
        `${item.name}: ${file} imports "${spec}" but dependencies is missing "${pkg}"`
      )
    }
  }
}

function checkBuild(item: RegistryItem) {
  const builtPath = path.join(BUILD_DIR, `${item.name}.json`)
  if (!existsSync(builtPath)) {
    errors.push(
      `${item.name}: public/r/${item.name}.json is missing. Run \`pnpm registry:build\``
    )
    return
  }
  const built = JSON.parse(readFileSync(builtPath, "utf8"))
  const same = (a: unknown, b: unknown) =>
    JSON.stringify(a ?? []) === JSON.stringify(b ?? [])
  const stale =
    !same(built.dependencies, item.dependencies) ||
    !same(built.registryDependencies, item.registryDependencies) ||
    item.files.some(
      (file, index) => built.files?.[index]?.content !== read(file.path)
    )
  if (stale) {
    errors.push(
      `${item.name}: public/r/${item.name}.json is out of date. Run \`pnpm registry:build\``
    )
  }
}

for (const item of registry.items) {
  const parsed = registryItemSchema.safeParse(item)
  if (!parsed.success) {
    errors.push(
      `${item.name}: invalid registry item: ${parsed.error.issues[0]?.message}`
    )
  }

  for (const dep of item.registryDependencies ?? []) {
    if (isCultReference(dep) && !names.has(dependencyName(dep))) {
      errors.push(
        `${item.name}: registryDependency "${dep}" does not exist in registry.json`
      )
    }
  }

  let filesExist = true
  for (const file of item.files) {
    if (!existsSync(path.join(ROOT, file.path))) {
      errors.push(`${item.name}: file "${file.path}" does not exist`)
      filesExist = false
      continue
    }
    if (item.type === "registry:ui")
      checkImports(item, file.path, read(file.path))
  }

  if (filesExist) checkBuild(item)
}

for (const file of readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"))) {
  const mdx = readFileSync(path.join(DOCS_DIR, file), "utf8")
  const references = [
    ...mdx.matchAll(/@cult-ui\/([a-z0-9-]+)/g),
    ...mdx.matchAll(/<Component(?:Preview|Source)\b[^>]*?\bname="([^"]+)"/g),
  ]
  for (const [, name] of references) {
    if (!names.has(name)) {
      errors.push(
        `docs/components/${file}: references "${name}", which is not in registry.json`
      )
    }
  }
}

if (errors.length > 0) {
  console.error(`Registry check failed with ${errors.length} problem(s):\n`)
  console.error(errors.map((e) => `  - ${e}`).join("\n"))
  process.exit(1)
}

console.log(`Registry check passed for ${registry.items.length} items.`)
