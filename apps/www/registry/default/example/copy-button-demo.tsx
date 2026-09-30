"use client"

import { CopyButton } from "@/registry/default/ui/copy-button"

const sampleCode = "npm install @radix-ui/react-slot"
const sampleUrl = "https://github.com/vercel/next.js"

function CopyableRow({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "group relative flex w-full max-w-xl items-stretch overflow-hidden rounded-2xl border border-border/70",
        "bg-gradient-to-b from-muted/40 to-muted/20 text-left",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05),0_1px_0_0_rgba(255,255,255,0.06)_inset]",
        "ring-1 ring-black/[0.04] dark:from-muted/25 dark:to-muted/10 dark:ring-white/[0.06]",
        "transition-[box-shadow,background-color,border-color] duration-200 ease-out",
        "[@media(hover:hover)]:hover:border-border [@media(hover:hover)]:hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
        "dark:[@media(hover:hover)]:hover:shadow-[0_4px_18px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <div className="min-w-0 flex-1 px-4 py-3.5 leading-snug">{children}</div>
      <div
        className={[
          "flex shrink-0 items-center border-border/60 border-l bg-muted/30 px-1 py-1.5",
          "dark:bg-muted/15",
          "[@media(hover:hover)]:group-hover:bg-muted/45 dark:[@media(hover:hover)]:group-hover:bg-muted/25",
        ].join(" ")}
      >
        <CopyButton
          className="text-muted-foreground [@media(hover:hover)]:hover:text-foreground"
          layout="inline"
          size="icon-sm"
          value={value}
          variant="ghost"
        />
      </div>
    </div>
  )
}

function CopyButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <CopyableRow value={sampleCode}>
        <code className="font-mono text-foreground text-sm tracking-tight antialiased">
          {sampleCode}
        </code>
      </CopyableRow>
      <CopyableRow value={sampleUrl}>
        <span className="text-pretty text-muted-foreground text-sm leading-relaxed">
          {sampleUrl}
        </span>
      </CopyableRow>
    </div>
  )
}

export default CopyButtonDemo
