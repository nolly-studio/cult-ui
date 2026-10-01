"use client"

import * as React from "react"

import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"

type ComponentCodeData = {
  code: string
  html: string
}

const codeCache = new Map<string, Promise<ComponentCodeData>>()

export function fetchComponentCode(name: string) {
  let request = codeCache.get(name)

  if (!request) {
    request = fetch(`/code/${encodeURIComponent(name)}`).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load code for ${name}`)
      }
      return response.json() as Promise<ComponentCodeData>
    })
    request.catch(() => codeCache.delete(name))
    codeCache.set(name, request)
  }

  return request
}

export function ComponentCode({
  html,
  code,
  name,
  truncated = false,
  language,
  title,
}: {
  html: string
  /** Raw source; when omitted it is read from the rendered `<pre>`. */
  code?: string
  /** Registry name, used to fetch the full source when `truncated`. */
  name?: string
  /** `html` holds only the first lines of the source. */
  truncated?: boolean
  language: string
  title?: string
}) {
  const codeRef = React.useRef<HTMLDivElement>(null)

  const getValue = React.useCallback(() => {
    if (code !== undefined) {
      return code
    }
    if (truncated && name) {
      return fetchComponentCode(name).then((data) => data.code)
    }
    return codeRef.current?.querySelector("pre")?.textContent ?? ""
  }, [code, name, truncated])

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="group relative [&>pre]:max-h-[650px] [&>pre]:overflow-auto"
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <div className="absolute top-2 right-2 z-10 opacity-70 transition-opacity duration-150 group-hover:opacity-100">
        <CopyButton getValue={getValue} className="hover:opacity-100" />
      </div>
      <div ref={codeRef} dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )
}

export function ComponentCodeLoader({
  name,
  title,
  fallback,
}: {
  name: string
  title?: string
  /** Rendered while loading; defaults to a loading message. */
  fallback?: React.ReactNode
}) {
  const [data, setData] = React.useState<ComponentCodeData | null>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    let active = true
    setFailed(false)
    fetchComponentCode(name).then(
      (result) => active && setData(result),
      () => active && setFailed(true)
    )
    return () => {
      active = false
    }
  }, [name])

  if (data) {
    return (
      <ComponentCode
        html={data.html}
        code={data.code}
        language="tsx"
        title={title}
      />
    )
  }

  if (failed) {
    return (
      <p className="text-muted-foreground p-6 text-sm">
        Couldn&apos;t load the code. Refresh the page to try again.
      </p>
    )
  }

  return (
    fallback ?? (
      <p
        role="status"
        className="text-muted-foreground flex min-h-64 items-center justify-center text-sm"
      >
        Loading code…
      </p>
    )
  )
}
