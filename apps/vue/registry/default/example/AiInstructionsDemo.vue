<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Instructions,
  InstructionsContent,
  InstructionsCreateDialog,
  InstructionsCreateTrigger,
  InstructionsEmpty,
  InstructionsFooter,
  InstructionsGroup,
  InstructionsItem,
  InstructionsList,
  InstructionsSearch,
  InstructionsTrigger,
  type Instruction,
} from '../ui/ai-instructions'

const SAMPLE_INSTRUCTIONS: Instruction[] = [
  {
    id: 'concise',
    title: 'Be Concise',
    description: 'Keep responses short and to the point',
    content:
      'Provide brief, focused responses. Avoid unnecessary elaboration unless specifically requested. Get to the point quickly.',
  },
  {
    id: 'code-examples',
    title: 'Include Code Examples',
    description: 'Always include relevant code snippets',
    content:
      'When explaining technical concepts, always include working code examples that demonstrate the concept. Use appropriate syntax highlighting.',
  },
  {
    id: 'explain-reasoning',
    title: 'Explain Your Reasoning',
    description: 'Walk through your thought process step by step',
    content:
      'Before providing a solution, explain the reasoning behind your approach. Break down complex problems into smaller steps.',
  },
  {
    id: 'typescript',
    title: 'Prefer TypeScript',
    description: 'Use TypeScript over JavaScript when possible',
    content:
      'Write all code examples in TypeScript with proper type annotations. Include interfaces and type definitions.',
  },
  {
    id: 'accessibility',
    title: 'Consider Accessibility',
    description: 'Ensure solutions are accessible to all users',
    content:
      'Include ARIA attributes, semantic HTML, keyboard navigation support, and screen reader considerations in all UI-related code.',
  },
]

const activeInstructions = ref<string[]>(['concise'])
const instructions = ref<Instruction[]>(SAMPLE_INSTRUCTIONS)

const activeInstructionItems = computed(() =>
  activeInstructions.value
    .map((id) => instructions.value.find((i) => i.id === id))
    .filter(Boolean)
)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="rounded-lg border bg-card p-4">
      <p class="mb-3 text-muted-foreground text-sm">
        Configure AI behavior with custom instructions. Click the button below
        to manage your active instructions.
      </p>
      <Instructions
        v-model:instructions="instructions"
        v-model:value="activeInstructions"
      >
        <InstructionsTrigger />
        <InstructionsContent>
          <InstructionsSearch />
          <InstructionsList>
            <InstructionsEmpty />
            <InstructionsGroup heading="Available Instructions">
              <InstructionsItem
                v-for="instruction in instructions"
                :key="instruction.id"
                :instruction="instruction"
              />
            </InstructionsGroup>
          </InstructionsList>
          <InstructionsFooter>
            <InstructionsCreateTrigger />
          </InstructionsFooter>
        </InstructionsContent>
        <InstructionsCreateDialog />
      </Instructions>
    </div>
    <div v-if="activeInstructions.length > 0" class="rounded-lg border bg-muted/50 p-3">
      <p class="mb-2 font-medium text-xs">
        Active ({{ activeInstructions.length }}):
      </p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="item in activeInstructionItems"
          :key="item!.id"
          class="rounded-md bg-primary/10 px-2 py-0.5 text-primary text-xs"
        >
          {{ item!.title }}
        </span>
      </div>
    </div>
  </div>
</template>
