<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { VoteTally } from '../ui/vote-tally'
import type { VoteTallyValue } from '../ui/vote-tally'

const FEATURES = [
  { id: 'dark-mode', title: 'Dark Mode', description: 'Add system-wide dark mode support with automatic detection' },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', description: 'Customizable keyboard shortcuts for power users' },
  { id: 'export-pdf', title: 'Export to PDF', description: 'Export documents and reports as PDF files' },
  { id: 'api-access', title: 'API Access', description: 'Public API for third-party integrations' },
  { id: 'mobile-app', title: 'Mobile App', description: 'Native iOS and Android applications' },
]

const votes = ref<VoteTallyValue>({
  'dark-mode': 142,
  'keyboard-shortcuts': 89,
  'export-pdf': 67,
  'api-access': 203,
  'mobile-app': 156,
})

const votedItems = ref<Set<string>>(new Set(['dark-mode']))
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-10 py-6">
    <div class="rounded-lg border border-border bg-card p-4">
      <div class="w-full max-w-md">
        <VoteTally
          :value="votes"
          :voted-items="votedItems"
          :features="FEATURES"
          @update:value="votes = $event"
          @update:voted-items="votedItems = $event"
        />
      </div>
    </div>
  </div>
</template>
