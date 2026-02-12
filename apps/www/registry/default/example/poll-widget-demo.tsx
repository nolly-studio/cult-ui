"use client"

import { useCallback, useMemo, useState } from "react"

import { PollWidget } from "../ui/poll-widget"

const DEMO_OPTIONS = [
  { id: "speed", label: "Faster builds" },
  { id: "dx", label: "Better DX" },
  { id: "docs", label: "Clearer docs" },
] as const

const BASE_VOTES = { speed: 41, dx: 28, docs: 30 }

function usePollState() {
  const [votes, setVotes] = useState<Record<string, number>>(BASE_VOTES)
  const [hasVoted, setHasVoted] = useState(false)

  const onVote = useCallback((selectedIds: string[]) => {
    setVotes((prev) => {
      const next: Record<string, number> = { ...prev }
      for (const id of selectedIds) {
        next[id] = (next[id] ?? 0) + 1
      }
      return next
    })
    setHasVoted(true)
  }, [])

  return { votes, hasVoted, onVote }
}

export default function PollWidgetDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-10 py-6">
      <InlineDemo />
      <PopoverDemo />
      <DialogDemo />
    </div>
  )
}

function InlineDemo() {
  const { votes, hasVoted, onVote } = usePollState()
  const options = useMemo(
    () => DEMO_OPTIONS.map((o) => ({ id: o.id, label: o.label })),
    []
  )

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Inline (default)
      </h3>
      <div className="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Which feature matters most?"
          description="Pick one, then submit to see results and success state."
          options={options}
          votes={votes}
          hasVoted={hasVoted}
          onVote={onVote}
          mode="inline"
        >
          <PollWidget.Content>
            <PollWidget.Question />
            <PollWidget.Options>
              {options.map((opt) => (
                <PollWidget.Option key={opt.id} value={opt.id}>
                  <PollWidget.Indicator />
                  <PollWidget.Label>{opt.label}</PollWidget.Label>
                  <PollWidget.Percentage />
                </PollWidget.Option>
              ))}
            </PollWidget.Options>
            <PollWidget.Results />
            <PollWidget.Submit />
          </PollWidget.Content>
        </PollWidget>
      </div>
    </div>
  )
}

function PopoverDemo() {
  const { votes, hasVoted, onVote } = usePollState()
  const options = useMemo(
    () => DEMO_OPTIONS.map((o) => ({ id: o.id, label: o.label })),
    []
  )

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Popover mode
      </h3>
      <div className="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Vote from a popover"
          description="Opens in a popover when you click the trigger."
          options={options}
          votes={votes}
          hasVoted={hasVoted}
          onVote={onVote}
          mode="popover"
        >
          <PollWidget.Trigger label="Open poll" />
          <PollWidget.Content>
            <PollWidget.Question />
            <PollWidget.Options>
              {options.map((opt) => (
                <PollWidget.Option key={opt.id} value={opt.id}>
                  <PollWidget.Indicator />
                  <PollWidget.Label>{opt.label}</PollWidget.Label>
                  <PollWidget.Percentage />
                </PollWidget.Option>
              ))}
            </PollWidget.Options>
            <PollWidget.Results />
            <PollWidget.Submit />
          </PollWidget.Content>
        </PollWidget>
      </div>
    </div>
  )
}

function DialogDemo() {
  const { votes, hasVoted, onVote } = usePollState()
  const options = useMemo(
    () => DEMO_OPTIONS.map((o) => ({ id: o.id, label: o.label })),
    []
  )

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Dialog mode</h3>
      <div className="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Vote in a dialog"
          description="Opens in a modal dialog when you click the trigger."
          options={options}
          votes={votes}
          hasVoted={hasVoted}
          onVote={onVote}
          mode="dialog"
        >
          <PollWidget.Trigger label="Open poll" />
          <PollWidget.Content>
            <PollWidget.Question />
            <PollWidget.Options>
              {options.map((opt) => (
                <PollWidget.Option key={opt.id} value={opt.id}>
                  <PollWidget.Indicator />
                  <PollWidget.Label>{opt.label}</PollWidget.Label>
                  <PollWidget.Percentage />
                </PollWidget.Option>
              ))}
            </PollWidget.Options>
            <PollWidget.Results />
            <PollWidget.Submit />
          </PollWidget.Content>
        </PollWidget>
      </div>
    </div>
  )
}
