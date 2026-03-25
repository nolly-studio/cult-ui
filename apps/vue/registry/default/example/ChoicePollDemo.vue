<script setup lang="ts">
import { ref } from 'vue'
import { ChoicePoll } from '../ui/choice-poll'

const integrations = [
  { id: 'slack', label: 'Slack', description: 'Team communication and notifications' },
  { id: 'notion', label: 'Notion', description: 'Documentation and knowledge base' },
  { id: 'github', label: 'GitHub', description: 'Code repositories and CI/CD' },
  { id: 'google-drive', label: 'Google Drive', description: 'File storage and collaboration' },
  { id: 'dropbox', label: 'Dropbox', description: 'Cloud file storage' },
  { id: 'supabase', label: 'Supabase', description: 'Database and authentication' },
]

// Basic example state
const basicSelected = ref('')
const basicHasVoted = ref(false)
const basicVotes = { slack: 234, notion: 189, github: 156, 'google-drive': 98 }

// With results state
const resultsSelected = ref('')
const resultsHasVoted = ref(false)
const resultsVotes = { slack: 100, notion: 189, github: 256, 'google-drive': 98 }

// Multiple selection state
const multiSelected = ref<string[]>([])
const multiHasVoted = ref(false)
const multiVotes = { slack: 100, notion: 189, github: 256, 'google-drive': 198, dropbox: 98, supabase: 156 }

// Compact example state
const compactSelected = ref('')
</script>

<template>
  <div class="grid gap-8 md:grid-cols-1">
    <div class="space-y-4">
      <h3 class="font-semibold text-lg">Single Selection</h3>
      <div class="w-full max-w-lg rounded-lg border p-6">
        <h4 class="text-lg font-semibold mb-1">Vote for Next Integration</h4>
        <p class="text-sm text-muted-foreground mb-4">Help us prioritize which integration to build next</p>
        <ChoicePoll.Root
          :has-voted="basicHasVoted"
          :value="basicSelected"
          :votes="basicVotes"
          show-results
          @update:value="(v: string | string[]) => basicSelected = Array.isArray(v) ? (v[0] ?? '') : v"
        >
          <ChoicePoll.Options>
            <ChoicePoll.Option v-for="integration in integrations.slice(0, 4)" :key="integration.id" :value="integration.id">
              <ChoicePoll.Indicator />
              <div class="flex flex-1 items-center justify-between gap-2">
                <ChoicePoll.Label>{{ integration.label }}</ChoicePoll.Label>
                <ChoicePoll.Percentage />
              </div>
            </ChoicePoll.Option>
          </ChoicePoll.Options>
          <ChoicePoll.Footer />
          <div v-if="!basicHasVoted" class="pt-2">
            <button class="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm" :disabled="!basicSelected" @click="basicHasVoted = true">
              Submit Vote
            </button>
          </div>
        </ChoicePoll.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="font-semibold text-lg">With Results</h3>
      <div class="w-full max-w-lg rounded-lg border p-6">
        <h4 class="text-lg font-semibold mb-1">Vote for Next Integration</h4>
        <p class="text-sm text-muted-foreground mb-4">Help us prioritize which integration to build next</p>
        <ChoicePoll.Root
          :has-voted="resultsHasVoted"
          :value="resultsSelected"
          :votes="resultsVotes"
          show-results
          @update:value="(v: string | string[]) => resultsSelected = Array.isArray(v) ? (v[0] ?? '') : v"
        >
          <ChoicePoll.Options>
            <ChoicePoll.Option v-for="integration in integrations.slice(0, 4)" :key="integration.id" :value="integration.id">
              <ChoicePoll.Indicator />
              <div class="flex flex-1 items-center justify-between gap-2">
                <ChoicePoll.Label>{{ integration.label }}</ChoicePoll.Label>
                <ChoicePoll.Percentage />
              </div>
            </ChoicePoll.Option>
          </ChoicePoll.Options>
          <ChoicePoll.Footer />
          <div v-if="!resultsHasVoted" class="pt-2">
            <button class="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm" :disabled="!resultsSelected" @click="resultsHasVoted = true">
              Submit Vote
            </button>
          </div>
        </ChoicePoll.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="font-semibold text-lg">Multiple Selection</h3>
      <div class="w-full max-w-lg rounded-lg border p-6">
        <h4 class="text-lg font-semibold mb-1">Choose Your Top Integrations</h4>
        <p class="text-sm text-muted-foreground mb-4">Select up to 3 integrations you'd like us to prioritize</p>
        <ChoicePoll.Root
          :has-voted="multiHasVoted"
          :value="multiSelected"
          :votes="multiVotes"
          multiple
          show-results
          @update:value="(v: string | string[]) => multiSelected = v as string[]"
        >
          <ChoicePoll.Options>
            <ChoicePoll.Option
              v-for="integration in integrations"
              :key="integration.id"
              :value="integration.id"
              :disabled="!multiHasVoted && multiSelected.length >= 3 && !multiSelected.includes(integration.id)"
            >
              <ChoicePoll.Indicator />
              <div class="flex flex-1 flex-col gap-0.5">
                <ChoicePoll.Label>{{ integration.label }}</ChoicePoll.Label>
                <span class="text-muted-foreground text-xs">{{ integration.description }}</span>
              </div>
              <ChoicePoll.Percentage />
            </ChoicePoll.Option>
          </ChoicePoll.Options>
          <ChoicePoll.Footer />
          <div v-if="!multiHasVoted" class="pt-2">
            <button class="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm" :disabled="multiSelected.length === 0" @click="multiHasVoted = true">
              Submit {{ multiSelected.length > 0 ? `(${multiSelected.length} selected)` : '' }}
            </button>
          </div>
        </ChoicePoll.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="font-semibold text-lg">Compact</h3>
      <div class="w-full max-w-sm">
        <ChoicePoll.Root
          :value="compactSelected"
          @update:value="(v: string | string[]) => compactSelected = Array.isArray(v) ? (v[0] ?? '') : v"
        >
          <ChoicePoll.Header>
            <ChoicePoll.Title class="text-base">Quick Poll</ChoicePoll.Title>
            <ChoicePoll.Description>Which feature would you like next?</ChoicePoll.Description>
          </ChoicePoll.Header>
          <ChoicePoll.Options class="gap-1.5">
            <ChoicePoll.Option class="p-3" value="dark-mode">
              <ChoicePoll.Indicator />
              <ChoicePoll.Label class="text-sm">Dark Mode</ChoicePoll.Label>
            </ChoicePoll.Option>
            <ChoicePoll.Option class="p-3" value="mobile-app">
              <ChoicePoll.Indicator />
              <ChoicePoll.Label class="text-sm">Mobile App</ChoicePoll.Label>
            </ChoicePoll.Option>
            <ChoicePoll.Option class="p-3" value="api">
              <ChoicePoll.Indicator />
              <ChoicePoll.Label class="text-sm">API Access</ChoicePoll.Label>
            </ChoicePoll.Option>
          </ChoicePoll.Options>
        </ChoicePoll.Root>
      </div>
    </div>
  </div>
</template>
