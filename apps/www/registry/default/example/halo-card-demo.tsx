"use client"

import { MoreHorizontalIcon } from "lucide-react"

import {
  HaloCard,
  HaloCardAction,
  HaloCardButton,
  HaloCardContent,
  HaloCardDescription,
  HaloCardFooter,
  HaloCardHeader,
  HaloCardTitle,
} from "@/registry/default/ui/halo-card"

export default function HaloCardDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-10">
      <HaloCard aria-label="Composable animated card example">
        <HaloCardHeader>
          <HaloCardTitle>Composable card</HaloCardTitle>
          <HaloCardDescription>
            Header, content, and footer slots share the same gradient rim and
            frosted surface as the polished search field. Footer actions use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">
              HaloCardButton
            </code>{" "}
            so labels stay high-contrast in dark mode.
          </HaloCardDescription>
          <HaloCardAction>
            <HaloCardButton
              aria-label="More options"
              size="icon"
              type="button"
              variant="secondary"
            >
              <MoreHorizontalIcon aria-hidden className="size-4" />
            </HaloCardButton>
          </HaloCardAction>
        </HaloCardHeader>

        <HaloCardContent>
          <p className="text-foreground/90 text-sm leading-relaxed">
            Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">
              HaloCardContent
            </code>{" "}
            for the main body between the header and footer. Tab through the
            header action or footer buttons to see focus-within on the rim.
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-muted-foreground text-sm">
            <li>
              <span className="text-foreground/90">HaloCardHeader</span> —
              title, description, optional action
            </li>
            <li>
              <span className="text-foreground/90">HaloCardFooter</span> —
              primary actions aligned to the end
            </li>
          </ul>
        </HaloCardContent>

        <HaloCardFooter className="justify-between gap-3">
          <HaloCardButton type="button" variant="secondary">
            Cancel
          </HaloCardButton>
          <HaloCardButton type="button" variant="primary">
            Continue
          </HaloCardButton>
        </HaloCardFooter>
      </HaloCard>

      <HaloCard
        aria-label="Minimal animated card"
        className="max-w-md self-center"
      >
        <HaloCardHeader>
          <HaloCardTitle>Minimal layout</HaloCardTitle>
          <HaloCardDescription>
            Title and description only — no content slot or footer. Same rim and
            hover behavior.
          </HaloCardDescription>
        </HaloCardHeader>
      </HaloCard>
    </div>
  )
}
