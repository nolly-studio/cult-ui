<script setup lang="ts">
import { ref, computed, provide, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '@/lib/utils'

// Types
interface FeaturePollContext {
  selected: Ref<string[]>
  multiple: boolean
  disabled: boolean
  showResults: Ref<boolean>
  votes: Ref<Record<string, number>>
  totalVotes: Ref<number>
  hasVoted: Ref<boolean>
  select: (optionId: string) => void
  isSelected: (optionId: string) => boolean
  getPercentage: (optionId: string) => number
}

interface FeaturePollOptionContext {
  optionId: string
  disabled: boolean
}

const FEATURE_POLL_KEY: InjectionKey<FeaturePollContext> = Symbol('feature-poll')
const FEATURE_POLL_OPTION_KEY: InjectionKey<FeaturePollOptionContext> = Symbol('feature-poll-option')

export function useFeaturePoll() {
  const ctx = inject(FEATURE_POLL_KEY)
  if (!ctx) throw new Error('FeaturePoll components must be used within FeaturePollRoot')
  return ctx
}

export function useFeaturePollOption() {
  const ctx = inject(FEATURE_POLL_OPTION_KEY)
  if (!ctx) throw new Error('FeaturePoll.Option sub-components must be used within FeaturePoll.Option')
  return ctx
}

// Props
interface Props {
  modelValue?: string | string[]
  defaultValue?: string | string[]
  multiple?: boolean
  disabled?: boolean
  showResults?: boolean
  votes?: Record<string, number>
  hasVoted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: undefined,
  multiple: false,
  disabled: false,
  showResults: false,
  votes: () => ({}),
  hasVoted: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

// State
const internalSelected = ref<string[]>(
  props.defaultValue
    ? Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
    : []
)

const selected = computed(() => {
  if (props.modelValue !== undefined) {
    return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
  }
  return internalSelected.value
})

const selectedRef = ref(selected.value)
import { watch } from 'vue'
watch(selected, (val) => { selectedRef.value = val })

const totalVotes = computed(() =>
  Object.values(props.votes).reduce((sum, count) => sum + count, 0)
)

const showResultsRef = computed(() => props.showResults)
const votesRef = computed(() => props.votes)
const hasVotedRef = computed(() => props.hasVoted)
const totalVotesRef = computed(() => totalVotes.value)

function select(optionId: string) {
  if (props.disabled) return

  let newSelected: string[]
  if (props.multiple) {
    newSelected = selected.value.includes(optionId)
      ? selected.value.filter((id) => id !== optionId)
      : [...selected.value, optionId]
  } else {
    newSelected = selected.value.includes(optionId) ? [] : [optionId]
  }

  if (props.modelValue !== undefined) {
    emit('update:modelValue', props.multiple ? newSelected : (newSelected[0] ?? ''))
  } else {
    internalSelected.value = newSelected
  }
}

function isSelected(optionId: string) {
  return selected.value.includes(optionId)
}

function getPercentage(optionId: string) {
  if (totalVotes.value === 0) return 0
  return Math.round(((props.votes[optionId] ?? 0) / totalVotes.value) * 100)
}

provide(FEATURE_POLL_KEY, {
  selected: selectedRef,
  multiple: props.multiple,
  disabled: props.disabled,
  showResults: showResultsRef as unknown as Ref<boolean>,
  votes: votesRef as unknown as Ref<Record<string, number>>,
  totalVotes: totalVotesRef as unknown as Ref<number>,
  hasVoted: hasVotedRef as unknown as Ref<boolean>,
  select,
  isSelected,
  getPercentage,
})
</script>

<template>
  <div
    role="group"
    :aria-label="multiple ? 'Multiple choice feature poll' : 'Single choice feature poll'"
    :data-disabled="disabled ? true : undefined"
  >
    <slot
      :selected="selected"
      :select="select"
      :is-selected="isSelected"
      :get-percentage="getPercentage"
      :total-votes="totalVotes"
      :show-results="showResults"
      :has-voted="hasVoted"
    />
  </div>
</template>
