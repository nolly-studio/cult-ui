import { promises as fs } from "fs"
import path from "path"

import { highlightCode } from "@/lib/highlight-code"

export interface BlockChunk {
  name: string
  description: string
  file: string
  code?: string
}

export interface Block {
  name: string
  style: string
  description?: string
  code: string
  highlightedCode: string
  chunks?: BlockChunk[]
  container?: {
    height?: string
    className?: string | null
  }
}

export async function getBlockCode(source: string): Promise<string> {
  const filepath = path.join(process.cwd(), source)
  return await fs.readFile(filepath, "utf-8")
}

export async function highlightBlockCode(code: string): Promise<string> {
  return await highlightCode(code)
}
