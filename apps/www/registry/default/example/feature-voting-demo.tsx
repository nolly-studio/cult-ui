"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { FeatureVoting, type FeatureVotingValue } from "../ui/feature-voting";

const FEATURES = [
  {
    id: "dark-mode",
    title: "Dark Mode",
    description: "Add system-wide dark mode support with automatic detection",
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    description: "Customizable keyboard shortcuts for power users",
  },
  {
    id: "export-pdf",
    title: "Export to PDF",
    description: "Export documents and reports as PDF files",
  },
  {
    id: "api-access",
    title: "API Access",
    description: "Public API for third-party integrations",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Native iOS and Android applications",
  },
] as const;

function FeatureVotingExample() {
  const [votes, setVotes] = useState<FeatureVotingValue>({
    "dark-mode": 142,
    "keyboard-shortcuts": 89,
    "export-pdf": 67,
    "api-access": 203,
    "mobile-app": 156,
  });

  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(
    new Set(["dark-mode"])
  );

  return (
    <div className="w-full max-w-md">
      <FeatureVoting.Root
        className="flex flex-col gap-2"
        onValueChange={setVotes}
        onVotedFeaturesChange={setVotedFeatures}
        value={votes}
        votedFeatures={votedFeatures}
      >
        <FeatureVoting.Group
          className="flex flex-col gap-2"
          sortBy="votes-desc"
        >
          {FEATURES.map((feature) => (
            <FeatureVoting.Item
              className={cn(
                "border-border bg-background flex items-start gap-3 rounded-lg border p-3",
                "data-voted:bg-muted",
                "data-disabled:cursor-not-allowed data-disabled:opacity-50"
              )}
              key={feature.id}
              value={feature.id}
            >
              <FeatureVoting.Trigger
                className={cn(
                  "flex shrink-0 flex-col items-center gap-0.5 rounded-md border px-2 py-1.5",
                  "border-border bg-background text-muted-foreground",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  "data-[state=voted]:bg-muted data-[state=voted]:text-foreground",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <ArrowUp aria-hidden className="size-4" />
                <FeatureVoting.Count className="text-xs font-medium tabular-nums" />
              </FeatureVoting.Trigger>

              <div className="flex min-w-0 flex-col gap-0.5">
                <FeatureVoting.Title className="text-foreground text-sm font-medium text-balance">
                  {feature.title}
                </FeatureVoting.Title>
                <FeatureVoting.Description className="text-muted-foreground text-sm text-pretty">
                  {feature.description}
                </FeatureVoting.Description>
              </div>
            </FeatureVoting.Item>
          ))}
        </FeatureVoting.Group>
      </FeatureVoting.Root>
    </div>
  );
}

function FeatureVotingBasicExample() {
  return (
    <div className="w-full max-w-sm">
      <FeatureVoting.Root className="flex flex-col gap-2">
        <FeatureVoting.Item
          className="border-border flex items-center justify-between gap-3 rounded-lg border p-3"
          value="dark-mode"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <FeatureVoting.Title className="text-sm font-medium">
              Dark mode
            </FeatureVoting.Title>
            <FeatureVoting.Description className="text-muted-foreground text-xs">
              System-aware dark theme
            </FeatureVoting.Description>
          </div>
          <div className="flex items-center gap-2">
            <FeatureVoting.Count className="text-sm tabular-nums" />
            <FeatureVoting.Trigger className="rounded-md border px-2 py-1 text-sm">
              Vote
            </FeatureVoting.Trigger>
          </div>
        </FeatureVoting.Item>

        <FeatureVoting.Item
          className="border-border flex items-center justify-between gap-3 rounded-lg border p-3"
          value="keyboard-shortcuts"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <FeatureVoting.Title className="text-sm font-medium">
              Keyboard shortcuts
            </FeatureVoting.Title>
            <FeatureVoting.Description className="text-muted-foreground text-xs">
              Customizable hotkeys
            </FeatureVoting.Description>
          </div>
          <div className="flex items-center gap-2">
            <FeatureVoting.Count className="text-sm tabular-nums" />
            <FeatureVoting.Trigger className="rounded-md border px-2 py-1 text-sm">
              Vote
            </FeatureVoting.Trigger>
          </div>
        </FeatureVoting.Item>
      </FeatureVoting.Root>
    </div>
  );
}

function FeatureVotingSortedExample() {
  return (
    <div className="w-full max-w-sm">
      <FeatureVoting.Root
        className="flex flex-col gap-2"
        defaultValue={{ a: 2, b: 5, c: 1 }}
      >
        <FeatureVoting.Group
          className="flex flex-col gap-2"
          sortBy="votes-desc"
        >
          {[
            { id: "a", title: "Option A" },
            { id: "b", title: "Option B" },
            { id: "c", title: "Option C" },
          ].map((feature) => (
            <FeatureVoting.Item
              className="border-border flex items-center justify-between gap-2 rounded-lg border p-3"
              key={feature.id}
              value={feature.id}
            >
              <FeatureVoting.Title className="text-sm">
                {feature.title}
              </FeatureVoting.Title>
              <div className="flex items-center gap-2">
                <FeatureVoting.Count className="text-sm tabular-nums" />
                <FeatureVoting.Trigger className="rounded-md border px-2 py-1 text-sm">
                  Vote
                </FeatureVoting.Trigger>
              </div>
            </FeatureVoting.Item>
          ))}
        </FeatureVoting.Group>
      </FeatureVoting.Root>
    </div>
  );
}

export default function FeatureVotingDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-10 py-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sorted with vote counts</h3>
        <div className="border-border bg-card rounded-lg border p-4">
          <FeatureVotingExample />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic list</h3>
        <FeatureVotingBasicExample />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sorted by votes</h3>
        <FeatureVotingSortedExample />
      </div>
    </div>
  );
}
