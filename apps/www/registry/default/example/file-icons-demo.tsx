"use client"

import {
  getIconForLanguageExtension,
  Icons,
} from "@/registry/default/ui/file-icons"

const iconKeys = Object.keys(Icons) as (keyof typeof Icons)[]

function IconsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Icons
        </h3>
        <ul className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {iconKeys.map((key) => {
            const Icon = Icons[key]
            return (
              <li
                key={key}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card p-3"
              >
                <Icon className="size-6 text-foreground" aria-hidden />
                <span className="text-xs text-muted-foreground">{key}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          getIconForLanguageExtension
        </h3>
        <ul className="flex flex-wrap gap-4">
          {(["json", "css", "ts"] as const).map((ext) => (
            <li
              key={ext}
              className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2"
            >
              {getIconForLanguageExtension(ext)}
              <span className="text-sm text-muted-foreground">.{ext}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IconsDemo
