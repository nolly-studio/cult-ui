"use client"

import {
  MergingBubbles,
  NextLogo,
  VercelLogo,
} from "@/registry/default/ui/merging-bubbles"

function MergingBubblesDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Small</p>
        <MergingBubbles
          size="sm"
          startIcon={<NextLogo />}
          endIcon={<VercelLogo />}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Medium</p>
        <MergingBubbles
          size="md"
          startIcon={<NextLogo />}
          endIcon={<VercelLogo />}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Large</p>
        <MergingBubbles
          size="lg"
          startIcon={<NextLogo />}
          endIcon={<VercelLogo />}
        />
      </div>
    </div>
  )
}

export default MergingBubblesDemo
