<script setup lang="ts">
/**
 * Interactive poll/voting widget (inline mode).
 *
 * Uses CSS transitions instead of Framer Motion AnimatePresence.
 * For popover/dialog modes, wrap externally with the appropriate Vue component.
 */

import { computed, ref, watch } from 'vue'
import { cva } from 'class-variance-authority'
import { BarChart3, Check } from 'lucide-vue-next'

import { cn } from '@/lib/utils'

/* ── Types ── */

export interface PollOption {
  id: string
  label: string
  description?: string
}

export type PollWidgetAnimationPhase = 'idle' | 'voting' | 'results' | 'success'

/* ── Variants ── */

const optionVariants = cva(
  [
    'group relative flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 text-left',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      state: {
        idle: [
          'border-border bg-background hover:border-primary/50 hover:bg-accent/50',
        ],
        selected: [
          'border-primary bg-primary/5 shadow-sm',
          'hover:border-primary hover:bg-primary/10',
        ],
        voted: ['cursor-default border-border bg-muted/30'],
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  },
)

const indicatorVariants = cva(
  [
    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      state: {
        idle: 'border-muted-foreground/30 bg-background',
        selected: 'border-primary bg-primary text-primary-foreground',
        voted: 'border-muted-foreground/30 bg-muted',
      },
      multiple: {
        true: 'rounded-sm',
        false: 'rounded-full',
      },
    },
    defaultVariants: {
      state: 'idle',
      multiple: false,
    },
  },
)

const progressVariants = cva(
  [
    'absolute inset-y-0 left-0 rounded-l-lg',
    'transition-all duration-500 ease-out',
  ],
  {
    variants: {
      state: {
        idle: 'bg-transparent',
        selected: 'bg-primary/10',
        voted: 'bg-muted/50',
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  },
)

/* ── Props ── */

const props = withDefaults(
  defineProps<{
    question: string
    description?: string
    options: PollOption[]
    multiple?: boolean
    disabled?: boolean
    votes?: Record<string, number>
    hasVoted?: boolean
    autoCollapseDelay?: number
    successDuration?: number
    successTitle?: string
    successDescription?: string
    class?: string
  }>(),
  {
    multiple: false,
    disabled: false,
    votes: () => ({}),
    hasVoted: false,
    autoCollapseDelay: 2500,
    successDuration: 1500,
    successTitle: 'Thanks for voting!',
    successDescription: 'Your vote has been recorded',
  },
)

const emit = defineEmits<{
  vote: [selectedIds: string[]]
}>()

/* ── State ── */

const selected = ref<string[]>([])
const animationPhase = ref<PollWidgetAnimationPhase>('idle')

const totalVotes = computed(() =>
  Object.values(props.votes).reduce((sum, count) => sum + count, 0),
)

const showResults = computed(
  () => props.hasVoted || animationPhase.value === 'results',
)

const canSubmit = computed(
  () =>
    selected.value.length > 0 &&
    !props.hasVoted &&
    !props.disabled &&
    animationPhase.value === 'idle',
)

/* ── Methods ── */

function select(optionId: string) {
  if (props.disabled || props.hasVoted || animationPhase.value !== 'idle') return

  if (props.multiple) {
    const idx = selected.value.indexOf(optionId)
    if (idx >= 0) {
      selected.value.splice(idx, 1)
    } else {
      selected.value.push(optionId)
    }
  } else {
    if (selected.value.includes(optionId)) {
      selected.value = []
    } else {
      selected.value = [optionId]
    }
  }
}

function isSelected(optionId: string): boolean {
  return selected.value.includes(optionId)
}

function getPercentage(optionId: string): number {
  if (totalVotes.value === 0) return 0
  return Math.round(((props.votes[optionId] ?? 0) / totalVotes.value) * 100)
}

function getOptionState(optionId: string): 'idle' | 'selected' | 'voted' {
  if (props.hasVoted) return 'voted'
  if (isSelected(optionId)) return 'selected'
  return 'idle'
}

function submitVote() {
  if (selected.value.length === 0 || animationPhase.value !== 'idle') return

  animationPhase.value = 'voting'

  setTimeout(() => {
    emit('vote', [...selected.value])
    animationPhase.value = 'results'

    setTimeout(() => {
      animationPhase.value = 'success'

      if (props.autoCollapseDelay > 0) {
        setTimeout(() => {
          animationPhase.value = 'idle'
        }, props.successDuration)
      }
    }, props.autoCollapseDelay)
  }, 400)
}

/* ── Watch hasVoted ── */

watch(
  () => props.hasVoted,
  (voted) => {
    if (voted && animationPhase.value === 'idle') {
      animationPhase.value = 'results'
    }
  },
)

/* ── Keyboard navigation ── */

const optionsContainerRef = ref<HTMLDivElement | null>(null)

function handleOptionsKeyDown(event: KeyboardEvent) {
  const container = optionsContainerRef.value
  if (!container) return

  const buttons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      '[data-slot="poll-widget-option"]:not([disabled])',
    ),
  )
  const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)
  let nextIndex = currentIndex

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1
      break
    case 'Home':
      event.preventDefault()
      nextIndex = 0
      break
    case 'End':
      event.preventDefault()
      nextIndex = buttons.length - 1
      break
    default:
      break
  }

  buttons[nextIndex]?.focus()
}

/* ── Computed helpers ── */

const votedOptionLabels = computed(() =>
  selected.value
    .map((id) => props.options.find((o) => o.id === id)?.label)
    .filter(Boolean),
)

const isSubmitting = computed(() => animationPhase.value === 'voting')

const showSubmitButton = computed(
  () =>
    !props.hasVoted &&
    animationPhase.value !== 'results' &&
    animationPhase.value !== 'success',
)
</script>

<template>
  <div data-slot="poll-widget" :class="cn('flex flex-col gap-3', props.class)">
    <!-- Success state -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 blur-sm"
      enter-to-class="opacity-100 translate-y-0 blur-0"
      leave-active-class="transition-all duration-300 ease-out"
      leave-from-class="opacity-100 translate-y-0 blur-0"
      leave-to-class="opacity-0 translate-y-4 blur-sm"
      mode="out-in"
    >
      <div
        v-if="animationPhase === 'success'"
        key="success"
        class="flex min-h-[120px] flex-col items-center justify-center"
      >
        <div
          data-slot="poll-widget-success"
          class="flex flex-col items-center gap-2 text-center"
        >
          <svg
            aria-hidden="true"
            class="-mt-1"
            fill="none"
            height="40"
            viewBox="0 0 32 32"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Success</title>
            <path
              class="fill-primary/20"
              d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
            />
            <path
              class="stroke-primary"
              d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.4"
            />
          </svg>
          <div class="space-y-1">
            <h3 class="font-medium text-primary text-sm">{{ props.successTitle }}</h3>
            <p class="mx-auto max-w-xs text-pretty text-muted-foreground text-xs">
              {{ props.successDescription }}
            </p>
            <p v-if="votedOptionLabels.length > 0" class="text-muted-foreground text-xs">
              You voted for:
              <span class="font-medium text-foreground">{{ votedOptionLabels.join(', ') }}</span>
            </p>
            <p class="pt-1 text-muted-foreground text-xs">
              {{ totalVotes.toLocaleString() }} total {{ totalVotes === 1 ? 'vote' : 'votes' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Normal poll content -->
      <div v-else key="poll-content" class="flex flex-col gap-3">
        <!-- Question -->
        <div data-slot="poll-widget-question" class="flex flex-col gap-1">
          <h3 class="font-semibold text-base tracking-tight">{{ props.question }}</h3>
          <p v-if="props.description" class="text-muted-foreground text-sm">
            {{ props.description }}
          </p>
        </div>

        <!-- Options -->
        <div
          ref="optionsContainerRef"
          data-slot="poll-widget-options"
          class="flex flex-col gap-2"
          role="listbox"
          @keydown="handleOptionsKeyDown"
        >
          <button
            v-for="option in props.options"
            :key="option.id"
            :aria-disabled="props.disabled || props.hasVoted"
            :aria-selected="isSelected(option.id)"
            :class="cn(optionVariants({ state: getOptionState(option.id) }))"
            :data-disabled="props.disabled ? true : undefined"
            :data-percentage="getPercentage(option.id)"
            :data-selected="isSelected(option.id) ? true : undefined"
            data-slot="poll-widget-option"
            :data-state="getOptionState(option.id)"
            :data-value="option.id"
            :disabled="props.disabled || props.hasVoted"
            role="option"
            type="button"
            @click="select(option.id)"
          >
            <!-- Progress bar -->
            <span
              v-if="showResults"
              aria-hidden="true"
              :class="
                cn(
                  progressVariants({
                    state: isSelected(option.id) ? 'selected' : 'voted',
                  }),
                )
              "
              :style="{ width: `${getPercentage(option.id)}%`, transition: 'width 0.8s ease-out' }"
            />

            <!-- Content -->
            <span class="relative z-10 flex w-full items-center gap-3">
              <!-- Indicator -->
              <span
                aria-hidden="true"
                :class="
                  cn(
                    indicatorVariants({
                      state: getOptionState(option.id),
                      multiple: props.multiple,
                    }),
                  )
                "
                data-slot="poll-widget-indicator"
              >
                <Check
                  v-if="isSelected(option.id)"
                  :class="
                    cn(
                      'h-2.5 w-2.5 transition-transform duration-200',
                      isSelected(option.id) ? 'scale-100' : 'scale-0',
                    )
                  "
                  :stroke-width="3"
                />
              </span>

              <!-- Label -->
              <span class="flex-1 font-medium text-sm" data-slot="poll-widget-label">
                {{ option.label }}
                <span
                  v-if="option.description"
                  class="block font-normal text-muted-foreground text-xs"
                >
                  {{ option.description }}
                </span>
              </span>

              <!-- Percentage -->
              <span
                v-if="showResults"
                :class="
                  cn(
                    'min-w-[3ch] text-right font-medium text-muted-foreground text-xs tabular-nums',
                  )
                "
                data-slot="poll-widget-percentage"
              >
                {{ getPercentage(option.id) }}%
              </span>
            </span>
          </button>
        </div>

        <!-- Results summary -->
        <div
          data-slot="poll-widget-results"
          class="flex items-center justify-between text-muted-foreground text-xs"
        >
          <span class="flex items-center gap-1.5">
            <BarChart3 class="size-3" />
            {{ totalVotes.toLocaleString() }} {{ totalVotes === 1 ? 'vote' : 'votes' }}
          </span>
          <span v-if="props.hasVoted" class="flex items-center gap-1.5 text-primary">
            <Check class="size-3" />
            <span>You voted</span>
          </span>
        </div>

        <!-- Submit button -->
        <button
          v-if="showSubmitButton"
          :class="
            cn(
              'inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors',
              'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
            )
          "
          data-slot="poll-widget-submit"
          :disabled="!canSubmit || isSubmitting"
          type="button"
          @click="submitVote"
        >
          <template v-if="isSubmitting">
            <span
              class="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
            Submitting...
          </template>
          <template v-else>
            Submit Vote
          </template>
        </button>
      </div>
    </Transition>
  </div>
</template>
