import { z } from "zod"

export const blockChunkSchema = z.object({
  name: z.string(),
  description: z.string(),
  component: z.any(),
  file: z.string(),
  code: z.string().optional(),
  container: z
    .object({
      className: z.string().nullish(),
    })
    .optional(),
})

export const registryFileSchema = z.object({
  path: z.string(),
  type: z.enum([
    "registry:ui",
    "registry:component",
    "registry:example",
    "registry:block",
    "registry:lib",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
    "registry:internal",
  ]),
  content: z.string().optional(),
  target: z.string().optional(),
})

export const registryEntrySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryFileSchema),
  source: z.string().optional(),
  type: z.enum([
    "registry:ui",
    "registry:component",
    "registry:example",
    "registry:block",
    "registry:lib",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
    "registry:internal",
  ]),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  chunks: z.array(blockChunkSchema).optional(),
})

export const registrySchema = z.object({
  name: z.string(),
  homepage: z.string(),
  items: z.array(registryEntrySchema),
})

export type RegistryEntry = z.infer<typeof registryEntrySchema>

export type Registry = z.infer<typeof registrySchema>

export const blockSchema = registryEntrySchema.extend({
  type: z.literal("registry:block"),
  style: z.enum(["default", "new-york"]),
  component: z.any(),
  container: z
    .object({
      height: z.string().optional(),
      className: z.string().nullish(),
    })
    .optional(),
  code: z.string(),
  highlightedCode: z.string(),
})

export type Block = z.infer<typeof blockSchema>

export type BlockChunk = z.infer<typeof blockChunkSchema>
