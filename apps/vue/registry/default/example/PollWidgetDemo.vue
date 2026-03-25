<script setup lang="ts">
import { ref, computed } from 'vue'
import { PollWidget } from '../ui/poll-widget'

const DEMO_OPTIONS = [
  { id: 'speed', label: 'Faster builds' },
  { id: 'dx', label: 'Better DX' },
  { id: 'docs', label: 'Clearer docs' },
]

const BASE_VOTES = { speed: 41, dx: 28, docs: 30 }

function usePollState() {
  const votes = ref<Record<string, number>>({ ...BASE_VOTES })
  const hasVoted = ref(false)

  const onVote = (selectedIds: string[]) => {
    const next: Record<string, number> = { ...votes.value }
    for (const id of selectedIds) {
      next[id] = (next[id] ?? 0) + 1
    }
    votes.value = next
    hasVoted.value = true
  }

  return { votes, hasVoted, onVote }
}

const inline = usePollState()
const popover = usePollState()
const dialog = usePollState()

const options = DEMO_OPTIONS.map((o) => ({ id: o.id, label: o.label }))
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-10 py-6">
    <!-- Inline -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-muted-foreground">Inline (default)</h3>
      <div class="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Which feature matters most?"
          description="Pick one, then submit to see results and success state."
          :options="options"
          :votes="inline.votes.value"
          :has-voted="inline.hasVoted.value"
          :on-vote="inline.onVote"
          mode="inline"
        />
      </div>
    </div>

    <!-- Popover -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-muted-foreground">Popover mode</h3>
      <div class="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Vote from a popover"
          description="Opens in a popover when you click the trigger."
          :options="options"
          :votes="popover.votes.value"
          :has-voted="popover.hasVoted.value"
          :on-vote="popover.onVote"
          mode="popover"
        />
      </div>
    </div>

    <!-- Dialog -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-muted-foreground">Dialog mode</h3>
      <div class="rounded-lg border border-border bg-card p-4">
        <PollWidget
          question="Vote in a dialog"
          description="Opens in a modal dialog when you click the trigger."
          :options="options"
          :votes="dialog.votes.value"
          :has-voted="dialog.hasVoted.value"
          :on-vote="dialog.onVote"
          mode="dialog"
        />
      </div>
    </div>
  </div>
</template>
