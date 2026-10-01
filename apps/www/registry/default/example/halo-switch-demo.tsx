"use client"

import { useState } from "react"

import { HaloSwitch } from "@/registry/default/ui/halo-switch"

export default function HaloSwitchDemo() {
  const [notifyOn, setNotifyOn] = useState(true)
  const [compact, setCompact] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md space-y-10">
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Default
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Toggles on and off with a spring-animated thumb and an enlarged tap
            target for easier touch use.
          </p>
          <div className="flex items-center gap-4">
            <HaloSwitch
              checked={notifyOn}
              onCheckedChange={setNotifyOn}
              translucent
            />
            <span className="text-muted-foreground text-sm">
              Notifications {notifyOn ? "on" : "off"}
            </span>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Small
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            A smaller footprint for dense toolbars and compact settings rows.
          </p>
          <div className="flex items-center gap-4">
            <HaloSwitch
              checked={compact}
              onCheckedChange={setCompact}
              size="sm"
              translucent
            />
            <span className="text-muted-foreground text-sm">
              Compact mode {compact ? "on" : "off"}
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
