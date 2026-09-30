"use client"

import { AgentSuggestCardStack } from "@/registry/default/ui/agent-suggest-card-stack"
import type { SuggestionItem } from "@/registry/default/ui/agent-suggest-card-stack"

const sampleSuggestions: SuggestionItem[] = [
  {
    id: "1",
    title: "Update auth config",
    progress: 100,
    status: "success",
  },
  {
    id: "2",
    title: "Fix type errors",
    progress: 65,
    status: "mixed",
    mixedProgress: { success: 2, error: 1 },
  },
  {
    id: "3",
    title: "Add tests",
    progress: 0,
    status: "error",
  },
]

function AgentSuggestCardStackDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <AgentSuggestCardStack
        width={320}
        height={220}
        headerTitle="Suggestions"
        headerBadge="3"
        commitButtonText="Apply"
        suggestions={sampleSuggestions}
      />
    </div>
  )
}

export default AgentSuggestCardStackDemo
