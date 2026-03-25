<script setup lang="ts">
import { ref, computed, provide, inject, type InjectionKey, type Ref } from 'vue'

// Types
export type FeatureVotingValue = Record<string, number>

interface FeatureVotingContext {
  votes: Ref<FeatureVotingValue>
  votedFeatures: Ref<Set<string>>
  disabled: boolean
  vote: (featureId: string) => void
  unvote: (featureId: string) => void
  toggleVote: (featureId: string) => void
  getVoteCount: (featureId: string) => number
  hasVoted: (featureId: string) => boolean
}

interface FeatureVotingItemContext {
  featureId: string
  disabled: boolean
}

const FEATURE_VOTING_KEY: InjectionKey<FeatureVotingContext> = Symbol('feature-voting')
const FEATURE_VOTING_ITEM_KEY: InjectionKey<FeatureVotingItemContext> = Symbol('feature-voting-item')

export function useFeatureVoting() {
  const ctx = inject(FEATURE_VOTING_KEY)
  if (!ctx) throw new Error('FeatureVoting components must be used within FeatureVotingRoot')
  return ctx
}

export function useFeatureVotingItem() {
  const ctx = inject(FEATURE_VOTING_ITEM_KEY)
  if (!ctx) throw new Error('FeatureVoting.Item sub-components must be used within FeatureVoting.Item')
  return ctx
}

// Props
interface Props {
  modelValue?: FeatureVotingValue
  defaultValue?: FeatureVotingValue
  votedFeatures?: Set<string>
  defaultVotedFeatures?: Set<string>
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: () => ({}),
  votedFeatures: undefined,
  defaultVotedFeatures: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: FeatureVotingValue]
  'update:votedFeatures': [features: Set<string>]
}>()

// State
const internalVotes = ref<FeatureVotingValue>(props.defaultValue)
const internalVotedFeatures = ref<Set<string>>(props.defaultVotedFeatures ?? new Set())

const votes = computed(() => props.modelValue ?? internalVotes.value)
const votedFeaturesSet = computed(() => props.votedFeatures ?? internalVotedFeatures.value)

function vote(featureId: string) {
  if (props.disabled || votedFeaturesSet.value.has(featureId)) return

  const newVotes = { ...votes.value, [featureId]: (votes.value[featureId] ?? 0) + 1 }
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newVotes)
  } else {
    internalVotes.value = newVotes
  }

  const newVoted = new Set(votedFeaturesSet.value)
  newVoted.add(featureId)
  if (props.votedFeatures !== undefined) {
    emit('update:votedFeatures', newVoted)
  } else {
    internalVotedFeatures.value = newVoted
  }
}

function unvote(featureId: string) {
  if (props.disabled || !votedFeaturesSet.value.has(featureId)) return

  const newVotes = { ...votes.value, [featureId]: Math.max((votes.value[featureId] ?? 0) - 1, 0) }
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newVotes)
  } else {
    internalVotes.value = newVotes
  }

  const newVoted = new Set(votedFeaturesSet.value)
  newVoted.delete(featureId)
  if (props.votedFeatures !== undefined) {
    emit('update:votedFeatures', newVoted)
  } else {
    internalVotedFeatures.value = newVoted
  }
}

function toggleVote(featureId: string) {
  if (votedFeaturesSet.value.has(featureId)) {
    unvote(featureId)
  } else {
    vote(featureId)
  }
}

function getVoteCount(featureId: string) {
  return votes.value[featureId] ?? 0
}

function hasVoted(featureId: string) {
  return votedFeaturesSet.value.has(featureId)
}

provide(FEATURE_VOTING_KEY, {
  votes: computed(() => votes.value) as unknown as Ref<FeatureVotingValue>,
  votedFeatures: computed(() => votedFeaturesSet.value) as unknown as Ref<Set<string>>,
  disabled: props.disabled,
  vote,
  unvote,
  toggleVote,
  getVoteCount,
  hasVoted,
})
</script>

<template>
  <ul
    aria-label="Feature voting list"
    :data-disabled="disabled ? true : undefined"
  >
    <slot
      :votes="votes"
      :voted-features="votedFeaturesSet"
      :vote="vote"
      :unvote="unvote"
      :toggle-vote="toggleVote"
      :get-vote-count="getVoteCount"
      :has-voted="hasVoted"
    />
  </ul>
</template>
