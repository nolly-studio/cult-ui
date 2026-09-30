"use client"

import { MoreHorizontalIcon } from "lucide-react"

import {
  AnimatedCard,
  AnimatedCardAction,
  AnimatedCardButton,
  AnimatedCardContent,
  AnimatedCardDescription,
  AnimatedCardFooter,
  AnimatedCardHeader,
  AnimatedCardTitle,
} from "@/registry/default/ui/animated-card"

export default function AnimatedCardDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-10">
      <AnimatedCard aria-label="Composable animated card example">
        <AnimatedCardHeader>
          <AnimatedCardTitle>Composable card</AnimatedCardTitle>
          <AnimatedCardDescription>
            Header, content, and footer slots share the same gradient rim and
            frosted surface as the polished search field. Footer actions use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">
              AnimatedCardButton
            </code>{" "}
            so labels stay high-contrast in dark mode.
          </AnimatedCardDescription>
          <AnimatedCardAction>
            <AnimatedCardButton
              aria-label="More options"
              size="icon"
              type="button"
              variant="secondary"
            >
              <MoreHorizontalIcon aria-hidden className="size-4" />
            </AnimatedCardButton>
          </AnimatedCardAction>
        </AnimatedCardHeader>

        <AnimatedCardContent>
          <p className="text-foreground/90 text-sm leading-relaxed">
            Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">
              AnimatedCardContent
            </code>{" "}
            for the main body between the header and footer. Tab through the
            header action or footer buttons to see focus-within on the rim.
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-muted-foreground text-sm">
            <li>
              <span className="text-foreground/90">AnimatedCardHeader</span> —
              title, description, optional action
            </li>
            <li>
              <span className="text-foreground/90">AnimatedCardFooter</span> —
              primary actions aligned to the end
            </li>
          </ul>
        </AnimatedCardContent>

        <AnimatedCardFooter className="justify-between gap-3">
          <AnimatedCardButton type="button" variant="secondary">
            Cancel
          </AnimatedCardButton>
          <AnimatedCardButton type="button" variant="primary">
            Continue
          </AnimatedCardButton>
        </AnimatedCardFooter>
      </AnimatedCard>

      <AnimatedCard
        aria-label="Minimal animated card"
        className="max-w-md self-center"
      >
        <AnimatedCardHeader>
          <AnimatedCardTitle>Minimal layout</AnimatedCardTitle>
          <AnimatedCardDescription>
            Title and description only — no content slot or footer. Same rim and
            hover behavior.
          </AnimatedCardDescription>
        </AnimatedCardHeader>
      </AnimatedCard>
    </div>
  )
}
