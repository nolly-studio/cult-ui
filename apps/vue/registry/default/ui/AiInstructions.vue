<script setup lang="ts">
import { ref, computed, provide, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '@/lib/utils'

// Types
export interface Instruction {
  id: string
  title: string
  description: string
  content?: string
  isCustom?: boolean
}

interface InstructionsContext {
  activeIds: Ref<string[]>
  toggle: (id: string) => void
  isActive: (id: string) => boolean
  instructions: Ref<Instruction[]>
  addCustom: (instruction: Omit<Instruction, 'id' | 'isCustom'>) => void
  removeCustom: (id: string) => void
  open: Ref<boolean>
  setOpen: (open: boolean) => void
  createDialogOpen: Ref<boolean>
  setCreateDialogOpen: (open: boolean) => void
}

const INSTRUCTIONS_KEY: InjectionKey<InstructionsContext> = Symbol('ai-instructions')

export function useInstructions() {
  const ctx = inject(INSTRUCTIONS_KEY)
  if (!ctx) throw new Error('useInstructions must be used within an Instructions provider')
  return ctx
}

// Props
interface Props {
  modelValue?: string[]
  defaultValue?: string[]
  instructions?: Instruction[]
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: () => [],
  instructions: () => [],
  open: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'update:instructions': [instructions: Instruction[]]
  'update:open': [open: boolean]
}>()

// State
const internalActiveIds = ref<string[]>(props.defaultValue)
const internalInstructions = ref<Instruction[]>(props.instructions)
const internalOpen = ref(false)
const createDialogOpen = ref(false)

const activeIds = computed(() => props.modelValue ?? internalActiveIds.value)
const instructionsList = computed(() => props.instructions ?? internalInstructions.value)
const isOpen = computed(() => props.open ?? internalOpen.value)

const activeIdsRef = ref(activeIds.value)
const instructionsRef = ref(instructionsList.value)
const isOpenRef = ref(isOpen.value)

// Keep refs in sync
import { watch } from 'vue'
watch(activeIds, (val) => { activeIdsRef.value = val })
watch(instructionsList, (val) => { instructionsRef.value = val })
watch(isOpen, (val) => { isOpenRef.value = val })

function toggle(id: string) {
  const prev = activeIds.value
  const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  if (props.modelValue !== undefined) {
    emit('update:modelValue', next)
  } else {
    internalActiveIds.value = next
  }
}

function isActive(id: string) {
  return activeIds.value.includes(id)
}

function addCustom(instruction: Omit<Instruction, 'id' | 'isCustom'>) {
  const newInstruction: Instruction = {
    ...instruction,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    isCustom: true,
  }
  const newList = [...instructionsList.value, newInstruction]
  emit('update:instructions', newList)
  internalInstructions.value = newList
}

function removeCustom(id: string) {
  // Remove from active
  const newActive = activeIds.value.filter((i) => i !== id)
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newActive)
  } else {
    internalActiveIds.value = newActive
  }

  const newList = instructionsList.value.filter((i) => i.id !== id)
  emit('update:instructions', newList)
  internalInstructions.value = newList
}

function setOpen(val: boolean) {
  if (props.open !== undefined) {
    emit('update:open', val)
  } else {
    internalOpen.value = val
  }
}

function setCreateDialogOpen(val: boolean) {
  createDialogOpen.value = val
}

provide(INSTRUCTIONS_KEY, {
  activeIds: activeIdsRef,
  toggle,
  isActive,
  instructions: instructionsRef,
  addCustom,
  removeCustom,
  open: isOpenRef,
  setOpen,
  createDialogOpen,
  setCreateDialogOpen,
})
</script>

<template>
  <div class="relative">
    <!-- Trigger -->
    <slot
      name="trigger"
      :active-count="activeIds.length"
      :open="() => setOpen(true)"
    >
      <button
        :class="cn(
          'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )"
        @click="setOpen(!isOpen)"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        <span>Instructions</span>
        <span
          v-if="activeIds.length > 0"
          class="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground"
        >
          {{ activeIds.length }}
        </span>
      </button>
    </slot>

    <!-- Popover content -->
    <Transition name="popover">
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-80 rounded-lg border bg-popover p-0 shadow-md"
      >
        <!-- Search -->
        <div class="border-b p-2">
          <slot name="search">
            <input
              type="text"
              placeholder="Search instructions..."
              class="w-full rounded-md border-0 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            />
          </slot>
        </div>

        <!-- Instructions list -->
        <div class="max-h-64 overflow-y-auto p-1">
          <div
            v-for="instruction in instructionsList"
            :key="instruction.id"
            :class="cn(
              'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
              isActive(instruction.id) && 'bg-accent'
            )"
            @click="toggle(instruction.id)"
          >
            <div
              :class="cn(
                'flex h-4 w-4 items-center justify-center rounded border',
                isActive(instruction.id)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30'
              )"
            >
              <svg
                v-if="isActive(instruction.id)"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="flex-1 truncate">
              <div class="font-medium">{{ instruction.title }}</div>
              <div class="text-xs text-muted-foreground truncate">{{ instruction.description }}</div>
            </div>
          </div>

          <div
            v-if="instructionsList.length === 0"
            class="py-6 text-center text-sm text-muted-foreground"
          >
            No instructions found.
          </div>
        </div>

        <!-- Footer actions -->
        <div class="border-t p-2">
          <button
            class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            @click="setCreateDialogOpen(true)"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Instruction
          </button>
        </div>
      </div>
    </Transition>

    <!-- Click outside to close -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="setOpen(false)"
    />

    <!-- Create dialog slot -->
    <slot
      name="create-dialog"
      :open="createDialogOpen"
      :set-open="setCreateDialogOpen"
      :add-custom="addCustom"
    />
  </div>
</template>

<style scoped>
.popover-enter-active {
  transition: all 0.2s ease-out;
}
.popover-leave-active {
  transition: all 0.15s ease-in;
}
.popover-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}
.popover-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}
</style>
