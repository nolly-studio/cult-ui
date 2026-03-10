"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import {
  TerminalAnimationBackgroundGradient,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
  type TerminalLine,
} from "../ui/terminal-animation"

export interface TerminalAnimationDemoProps {
  /** Tab content for each command; defaults to defaultTerminalTabs */
  tabs?: TabContent[]
  /** Background image URL; when unset, BackgroundGradient is used */
  backgroundImage?: string
  /** Force dark mode for the terminal regardless of page theme */
  alwaysDark?: boolean
}

const backgroundImage =
  "/component-images/terminal-animation/terminal-animation-bg-2.png"

const tabs: TabContent[] = [
  {
    label: "install",
    command: "npm install",
    lines: [
      { text: "", delay: 80 },
      {
        text: "added 1,247 packages in 12s",
        color: "text-[#6FF7CC]",
        delay: 400,
      },
      { text: "", delay: 80 },
      {
        text: "  Cult UI is looking for funding",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "    run `npm fund cult-ui` for details",
        color: "text-slate-500",
        delay: 100,
      },
      {
        text: "  +-----------------------+",
        color: "text-[#ED42B5]",
        delay: 120,
      },
      {
        text: "  |       CULT UI         |",
        color: "text-[#ED42B5]",
        delay: 120,
      },
      {
        text: "  |   Shadcn expanded    |",
        color: "text-[#ED42B5]",
        delay: 120,
      },
      {
        text: "  +-----------------------+",
        color: "text-[#ED42B5]",
        delay: 160,
      },
      { text: "", delay: 80 },
      {
        text: "  found 0 vulnerabilities",
        color: "text-[#ADFA1F]",
        delay: 250,
      },
    ],
  },
  {
    label: "build",
    command: "npm run build",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  ▲ Next.js 16.1.6",
        color: "text-slate-300",
        delay: 300,
      },
      { text: "", delay: 80 },
      {
        text: "  Creating an optimized production build...",
        color: "text-slate-400",
        delay: 250,
      },
      {
        text: "  ✓ Compiled successfully",
        color: "text-[#6FF7CC]",
        delay: 200,
      },
      {
        text: "  ✓ Linting and checking validity of types",
        color: "text-[#6FF7CC]",
        delay: 150,
      },
      {
        text: "  ✓ Generating static pages (12/12)",
        color: "text-[#6FF7CC]",
        delay: 150,
      },
      {
        text: "  Route (app)  /  142 kB  |  First Load JS 198 kB",
        color: "text-slate-500",
        delay: 150,
      },
      {
        text: "  Route (app)  /_not-found 872 B | First Load JS 57 kB",
        color: "text-slate-500",
        delay: 150,
      },
      {
        text: "  Route (app)  /about 65 kB | First Load JS 92 kB",
        color: "text-slate-500",
        delay: 150,
      },
      { text: "", delay: 80 },
      {
        text: "  ✓ Build completed in 4.2s",
        color: "text-[#6FF7CC]",
        delay: 300,
      },
    ],
  },
  {
    label: "deploy",
    command: "vercel deploy --prod",
    lines: [
      { text: "", delay: 80 },
      { text: "  Vercel CLI 39.2.0", color: "text-slate-400", delay: 200 },
      { text: "", delay: 80 },
      {
        text: "  > Deploying to production...",
        color: "text-[#ED42B5]",
        delay: 300,
      },
      { text: "", delay: 80 },
      { text: "  ✓ Building", color: "text-[#6FF7CC]", delay: 250 },
      { text: "  ✓ Uploading", color: "text-[#6FF7CC]", delay: 200 },
      { text: "  ✓ Finalizing", color: "text-[#6FF7CC]", delay: 200 },
      { text: "", delay: 80 },
      {
        text: "  Production: https://aisdkagents.vercel.app",
        color: "text-[#ED42B5]",
        delay: 400,
      },
      { text: "", delay: 80 },
      {
        text: "  ✓ Deployment complete",
        color: "text-[#6FF7CC]",
        delay: 250,
      },
    ],
  },
  {
    label: "test",
    command: "npm test",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  PASS  src/components/Button.test.tsx",
        color: "text-slate-400",
        delay: 200,
      },
      {
        text: "    ✓ renders correctly",
        color: "text-[#ADFA1F]",
        delay: 100,
      },
      {
        text: "    ✓ handles click events",
        color: "text-[#ADFA1F]",
        delay: 100,
      },
      {
        text: "  PASS  src/utils/format.test.ts",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "    ✓ formats currency",
        color: "text-[#ADFA1F]",
        delay: 100,
      },
      {
        text: "    ✓ formats dates",
        color: "text-[#ADFA1F]",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "  Test Suites: 2 passed, 2 total",
        color: "text-[#ADFA1F]",
        delay: 200,
      },
      {
        text: "  Tests:       4 passed, 4 total",
        color: "text-[#ADFA1F]",
        delay: 150,
      },
      { text: "  Time:        1.234 s", color: "text-slate-500", delay: 100 },
    ],
  },
]

export function TerminalAnimationDemo() {
  const [animationKey, setAnimationKey] = useState(0)

  return (
    <TerminalAnimationRoot
      key={animationKey}
      alwaysDark={true}
      backgroundImage={backgroundImage}
      className="relative flex w-full justify-center overflow-clip bg-background"
      defaultActiveTab={1}
      hideCursorOnComplete={false}
      tabs={tabs}
    >
      <button
        className="absolute top-4 left-4 z-20 rounded-md border border-white/25 bg-black/45 px-3 py-1.5 font-mono text-[11px] text-white/90 uppercase tracking-wide transition hover:bg-black/65"
        onClick={() => setAnimationKey((prev) => prev + 1)}
        type="button"
      >
        Refresh
      </button>
      <a
        className="absolute top-4 right-4 z-20 rounded-md border border-white/25 bg-black/45 px-3 py-1.5 font-mono text-[11px] text-white/90 uppercase tracking-wide transition hover:bg-black/65"
        download="terminal-animation-image-2.png"
        href={backgroundImage}
      >
        Download BG
      </a>
      {!backgroundImage && <TerminalAnimationBackgroundGradient />}
      <TerminalAnimationContainer className="max-w-[43rem]">
        <TerminalAnimationWindow className="outline-1 outline-white/30 outline-offset-[2px]">
          <TerminalAnimationContent className="min-h-[26rem]">
            <div className="flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-muted-foreground text-sm">
                $
              </span>
              <TerminalAnimationCommandBar
                className="font-mono text-foreground text-sm"
                cursor={<TerminalAnimationBlinkingCursor />}
              />
            </div>

            <TerminalAnimationOutput
              className="mt-1"
              renderLine={(
                line: TerminalLine,
                _i: number,
                visible: boolean
              ) => {
                if (!visible) {
                  return null
                }
                return (
                  <div className="leading-relaxed">
                    <span
                      className={cn(
                        "font-mono text-sm",
                        line.color ?? "text-muted-foreground"
                      )}
                    >
                      {line.text || "\u00A0"}
                    </span>
                  </div>
                )
              }}
            />
            <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-muted-foreground text-sm">
                $
              </span>
              <TerminalAnimationBlinkingCursor />
            </TerminalAnimationTrailingPrompt>
          </TerminalAnimationContent>

          <div className="flex justify-center pb-6">
            <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-border bg-muted/50 px-1 py-1">
              {tabs.map((tab, i) => (
                <TerminalAnimationTabTrigger
                  className={cn(
                    "cursor-pointer rounded-md px-3.5 py-1 font-mono text-sm transition-all duration-150",
                    "data-[state=active]:bg-primary data-[state=active]:font-medium data-[state=active]:text-primary-foreground",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                  )}
                  index={i}
                  key={tab.label}
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  )
}
