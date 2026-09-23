"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FeaturePoll } from "../ui/feature-poll";

const features = [
  {
    id: "speed",
    label: "Faster builds",
    description: "Reduce compile and CI time",
  },
  {
    id: "dx",
    label: "Better DX",
    description: "Improved tooling and workflows",
  },
  {
    id: "docs",
    label: "Clearer docs",
    description: "More examples and guides",
  },
  { id: "a11y", label: "Accessibility", description: "Stronger a11y defaults" },
];

function FeaturePollBasicExample() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="w-full max-w-lg">
      <FeaturePoll.Root
        onValueChange={(value) =>
          setSelected(Array.isArray(value) ? (value[0] ?? "") : value)
        }
        value={selected}
      >
        <FeaturePoll.Header>
          <FeaturePoll.Title>Which feature matters most?</FeaturePoll.Title>
          <FeaturePoll.Description>
            Pick one option to help us prioritize the roadmap.
          </FeaturePoll.Description>
        </FeaturePoll.Header>

        <FeaturePoll.Options>
          {features.map((feature) => (
            <FeaturePoll.Option key={feature.id} value={feature.id}>
              <FeaturePoll.Indicator />
              <div className="flex flex-1 flex-col gap-0.5">
                <FeaturePoll.Label>{feature.label}</FeaturePoll.Label>
                <span className="text-muted-foreground text-xs">
                  {feature.description}
                </span>
              </div>
            </FeaturePoll.Option>
          ))}
        </FeaturePoll.Options>
      </FeaturePoll.Root>
    </div>
  );
}

function FeaturePollWithResultsExample() {
  const [selected, setSelected] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);

  const votes = {
    speed: 42,
    dx: 28,
    docs: 30,
    a11y: 18,
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Vote for the next release focus</CardTitle>
        <CardDescription>
          Results appear after you submit your vote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FeaturePoll.Root
          hasVoted={hasVoted}
          onValueChange={(value) =>
            setSelected(Array.isArray(value) ? (value[0] ?? "") : value)
          }
          showResults
          value={selected}
          votes={votes}
        >
          <FeaturePoll.Options>
            {features.map((feature) => (
              <FeaturePoll.Option key={feature.id} value={feature.id}>
                <FeaturePoll.Indicator />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <FeaturePoll.Label>{feature.label}</FeaturePoll.Label>
                  <FeaturePoll.Percentage />
                </div>
                <FeaturePoll.Progress />
              </FeaturePoll.Option>
            ))}
          </FeaturePoll.Options>

          <FeaturePoll.Footer />

          {!hasVoted && (
            <div className="pt-2">
              <Button
                className="w-full"
                disabled={!selected}
                onClick={() => setHasVoted(true)}
              >
                Submit Vote
              </Button>
            </div>
          )}
        </FeaturePoll.Root>
      </CardContent>
    </Card>
  );
}

function FeaturePollMultipleExample() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  const votes = {
    speed: 42,
    dx: 28,
    docs: 30,
    a11y: 18,
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Choose up to 2 priorities</CardTitle>
        <CardDescription>
          Select the features you want us to focus on next.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FeaturePoll.Root
          hasVoted={hasVoted}
          multiple
          onValueChange={(value) => setSelected(value as string[])}
          showResults
          value={selected}
          votes={votes}
        >
          <FeaturePoll.Options>
            {features.map((feature) => (
              <FeaturePoll.Option
                disabled={
                  !hasVoted &&
                  selected.length >= 2 &&
                  !selected.includes(feature.id)
                }
                key={feature.id}
                value={feature.id}
              >
                <FeaturePoll.Indicator />
                <FeaturePoll.Label>{feature.label}</FeaturePoll.Label>
                <FeaturePoll.Percentage />
              </FeaturePoll.Option>
            ))}
          </FeaturePoll.Options>

          <FeaturePoll.Footer />

          {!hasVoted && (
            <div className="pt-2">
              <Button
                className="w-full"
                disabled={selected.length === 0}
                onClick={() => setHasVoted(true)}
              >
                Submit {selected.length > 0 && `(${selected.length} selected)`}
              </Button>
            </div>
          )}
        </FeaturePoll.Root>
      </CardContent>
    </Card>
  );
}

export default function FeaturePollDemo() {
  return (
    <div className="grid gap-8 md:grid-cols-1">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic</h3>
        <FeaturePollBasicExample />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Results</h3>
        <FeaturePollWithResultsExample />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Multiple Selection</h3>
        <FeaturePollMultipleExample />
      </div>
    </div>
  );
}
