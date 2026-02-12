"use client"

import { useState } from "react"
import {
  Database01Icon,
  DropboxIcon,
  Github01Icon,
  GoogleIcon,
  NotionIcon,
  SlackIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ChoicePoll } from "../ui/choice-poll"

/* -----------------------------------------------------------------------------
 * Integration options data
 * -------------------------------------------------------------------------- */

const integrations = [
  {
    id: "slack",
    label: "Slack",
    description: "Team communication and notifications",
    icon: SlackIcon,
  },
  {
    id: "notion",
    label: "Notion",
    description: "Documentation and knowledge base",
    icon: NotionIcon,
  },
  {
    id: "github",
    label: "GitHub",
    description: "Code repositories and CI/CD",
    icon: Github01Icon,
  },
  {
    id: "google-drive",
    label: "Google Drive",
    description: "File storage and collaboration",
    icon: GoogleIcon,
  },
  {
    id: "dropbox",
    label: "Dropbox",
    description: "Cloud file storage",
    icon: DropboxIcon,
  },
  {
    id: "supabase",
    label: "Supabase",
    description: "Database and authentication",
    icon: Database01Icon,
  },
]

/* -----------------------------------------------------------------------------
 * Basic Example - Single Selection
 * -------------------------------------------------------------------------- */

function ChoicePollBasicExample() {
  const [selected, setSelected] = useState<string>("")
  const [hasVoted, setHasVoted] = useState(false)

  const votes = {
    slack: 234,
    notion: 189,
    github: 156,
    "google-drive": 98,
  }

  const handleVote = () => {
    setHasVoted(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Vote for Next Integration</CardTitle>
        <CardDescription>
          Help us prioritize which integration to build next
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChoicePoll.Root
          hasVoted={hasVoted}
          onValueChange={(v) =>
            setSelected(Array.isArray(v) ? (v[0] ?? "") : v)
          }
          showResults
          value={selected}
          votes={votes}
        >
          <ChoicePoll.Options>
            {integrations.slice(0, 4).map((integration) => (
              <ChoicePoll.Option key={integration.id} value={integration.id}>
                <ChoicePoll.Indicator />
                <HugeiconsIcon
                  className="h-5 w-5 text-muted-foreground"
                  icon={integration.icon}
                />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <ChoicePoll.Label>{integration.label}</ChoicePoll.Label>
                  <ChoicePoll.Percentage />
                </div>
              </ChoicePoll.Option>
            ))}
          </ChoicePoll.Options>

          <ChoicePoll.Footer />

          {!hasVoted && (
            <div className="pt-2">
              <Button
                className="w-full"
                disabled={!selected}
                onClick={handleVote}
              >
                Submit Vote
              </Button>
            </div>
          )}
        </ChoicePoll.Root>
      </CardContent>
    </Card>
  )
}

/* -----------------------------------------------------------------------------
 * With Results Example
 * -------------------------------------------------------------------------- */

function ChoicePollWithResultsExample() {
  const [selected, setSelected] = useState<string>("slack")
  const [hasVoted, setHasVoted] = useState(false)

  const votes = {
    slack: 234,
    notion: 189,
    github: 156,
    "google-drive": 98,
  }

  const handleVote = () => {
    setHasVoted(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Vote for Next Integration</CardTitle>
        <CardDescription>
          Help us prioritize which integration to build next
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChoicePoll.Root
          hasVoted={hasVoted}
          onValueChange={(v) =>
            setSelected(Array.isArray(v) ? (v[0] ?? "") : v)
          }
          showResults
          value={selected}
          votes={votes}
        >
          <ChoicePoll.Options>
            {integrations.slice(0, 4).map((integration) => (
              <ChoicePoll.Option key={integration.id} value={integration.id}>
                <ChoicePoll.Indicator />
                <HugeiconsIcon
                  className="h-5 w-5 text-muted-foreground"
                  icon={integration.icon}
                />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <ChoicePoll.Label>{integration.label}</ChoicePoll.Label>
                  <ChoicePoll.Percentage />
                </div>
              </ChoicePoll.Option>
            ))}
          </ChoicePoll.Options>

          <ChoicePoll.Footer />

          {!hasVoted && (
            <div className="pt-2">
              <Button
                className="w-full"
                disabled={!selected}
                onClick={handleVote}
              >
                Submit Vote
              </Button>
            </div>
          )}
        </ChoicePoll.Root>
      </CardContent>
    </Card>
  )
}

/* -----------------------------------------------------------------------------
 * Multiple Selection Example
 * -------------------------------------------------------------------------- */

function ChoicePollMultipleExample() {
  const [selected, setSelected] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)

  const votes = {
    slack: 312,
    notion: 287,
    github: 245,
    "google-drive": 198,
    dropbox: 156,
    supabase: 134,
  }

  const handleVote = () => {
    setHasVoted(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Choose Your Top Integrations</CardTitle>
        <CardDescription>
          Select up to 3 integrations you'd like us to prioritize
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChoicePoll.Root
          hasVoted={hasVoted}
          multiple
          onValueChange={(val) => setSelected(val as string[])}
          showResults
          value={selected}
          votes={votes}
        >
          <ChoicePoll.Options>
            {integrations.map((integration) => (
              <ChoicePoll.Option
                disabled={
                  !hasVoted &&
                  selected.length >= 3 &&
                  !selected.includes(integration.id)
                }
                key={integration.id}
                value={integration.id}
              >
                <ChoicePoll.Indicator />
                <HugeiconsIcon
                  className="h-5 w-5 text-muted-foreground"
                  icon={integration.icon}
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <ChoicePoll.Label>{integration.label}</ChoicePoll.Label>
                  <span className="text-muted-foreground text-xs">
                    {integration.description}
                  </span>
                </div>
                <ChoicePoll.Percentage />
              </ChoicePoll.Option>
            ))}
          </ChoicePoll.Options>

          <ChoicePoll.Footer />

          {!hasVoted && (
            <div className="pt-2">
              <Button
                className="w-full"
                disabled={selected.length === 0}
                onClick={handleVote}
              >
                Submit {selected.length > 0 && `(${selected.length} selected)`}
              </Button>
            </div>
          )}
        </ChoicePoll.Root>
      </CardContent>
    </Card>
  )
}

/* -----------------------------------------------------------------------------
 * Compact Inline Example
 * -------------------------------------------------------------------------- */

function ChoicePollCompactExample() {
  const [selected, setSelected] = useState<string>("")

  return (
    <div className="w-full max-w-sm">
      <ChoicePoll.Root
        onValueChange={(v) => setSelected(Array.isArray(v) ? (v[0] ?? "") : v)}
        value={selected}
      >
        <ChoicePoll.Header>
          <ChoicePoll.Title className="text-base">Quick Poll</ChoicePoll.Title>
          <ChoicePoll.Description>
            Which feature would you like next?
          </ChoicePoll.Description>
        </ChoicePoll.Header>

        <ChoicePoll.Options className="gap-1.5">
          <ChoicePoll.Option className="p-3" value="dark-mode">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label className="text-sm">Dark Mode</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option className="p-3" value="mobile-app">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label className="text-sm">Mobile App</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option className="p-3" value="api">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label className="text-sm">API Access</ChoicePoll.Label>
          </ChoicePoll.Option>
        </ChoicePoll.Options>
      </ChoicePoll.Root>
    </div>
  )
}

/* -----------------------------------------------------------------------------
 * Combined Demo
 * -------------------------------------------------------------------------- */

export default function ChoicePollDemo() {
  return (
    <div className="grid gap-8 md:grid-cols-1">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Single Selection</h3>
        <ChoicePollBasicExample />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">With Results</h3>
        <ChoicePollWithResultsExample />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Multiple Selection</h3>
        <ChoicePollMultipleExample />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Compact</h3>
        <ChoicePollCompactExample />
      </div>
    </div>
  )
}
