<script lang="ts">
import { ref, computed, provide, inject, defineComponent, h, type InjectionKey, type PropType } from 'vue'

export type VoteTallyValue = Record<string, number>

interface VoteTallyContextValue {
  votes: () => VoteTallyValue
  votedItems: () => Set<string>
  disabled: () => boolean
  vote: (itemId: string) => void
  unvote: (itemId: string) => void
  toggleVote: (itemId: string) => void
  getVoteCount: (itemId: string) => number
  hasVoted: (itemId: string) => boolean
}

interface VoteTallyItemContextValue {
  itemId: string
  disabled: () => boolean
}

const VoteTallyKey: InjectionKey<VoteTallyContextValue> = Symbol('VoteTally')
const VoteTallyItemKey: InjectionKey<VoteTallyItemContextValue> = Symbol('VoteTallyItem')

export const VoteTallyRoot = defineComponent({
  name: 'VoteTallyRoot',
  props: {
    modelValue: { type: Object as PropType<VoteTallyValue>, default: undefined },
    defaultValue: { type: Object as PropType<VoteTallyValue>, default: () => ({}) },
    votedItems: { type: Object as PropType<Set<string>>, default: undefined },
    defaultVotedItems: { type: Object as PropType<Set<string>>, default: () => new Set<string>() },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'update:votedItems'],
  setup(props, { slots, emit }) {
    const internalVotes = ref<VoteTallyValue>({ ...props.defaultValue })
    const internalVotedItems = ref<Set<string>>(new Set(props.defaultVotedItems))

    const votes = computed(() => props.modelValue !== undefined ? props.modelValue : internalVotes.value)
    const votedItemsSet = computed(() => props.votedItems !== undefined ? props.votedItems : internalVotedItems.value)

    function setVotes(updater: (prev: VoteTallyValue) => VoteTallyValue) {
      const newVal = updater(votes.value)
      if (props.modelValue !== undefined) {
        emit('update:modelValue', newVal)
      } else {
        internalVotes.value = newVal
      }
    }

    function setVotedItems(updater: (prev: Set<string>) => Set<string>) {
      const newVal = updater(votedItemsSet.value)
      if (props.votedItems !== undefined) {
        emit('update:votedItems', newVal)
      } else {
        internalVotedItems.value = newVal
      }
    }

    function vote(itemId: string) {
      if (props.disabled || votedItemsSet.value.has(itemId)) return
      setVotes((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }))
      setVotedItems((prev) => new Set([...prev, itemId]))
    }

    function unvote(itemId: string) {
      if (props.disabled || !votedItemsSet.value.has(itemId)) return
      setVotes((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] ?? 0) - 1, 0) }))
      setVotedItems((prev) => { const s = new Set(prev); s.delete(itemId); return s })
    }

    function toggleVote(itemId: string) {
      votedItemsSet.value.has(itemId) ? unvote(itemId) : vote(itemId)
    }

    function getVoteCount(itemId: string) {
      return votes.value[itemId] ?? 0
    }

    function hasVoted(itemId: string) {
      return votedItemsSet.value.has(itemId)
    }

    const ctx: VoteTallyContextValue = {
      votes: () => votes.value,
      votedItems: () => votedItemsSet.value,
      disabled: () => props.disabled,
      vote,
      unvote,
      toggleVote,
      getVoteCount,
      hasVoted,
    }

    provide(VoteTallyKey, ctx)

    return () =>
      h('ul', { 'aria-label': 'Vote tally list', 'data-disabled': props.disabled || undefined }, slots.default?.())
  },
})

// ---- Item ----
export const VoteTallyItem = defineComponent({
  name: 'VoteTallyItem',
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const ctx = inject(VoteTallyKey)!
    const disabled = computed(() => ctx.disabled() || props.disabled)
    const voted = computed(() => ctx.hasVoted(props.value))
    const voteCount = computed(() => ctx.getVoteCount(props.value))

    const itemCtx: VoteTallyItemContextValue = {
      itemId: props.value,
      disabled: () => disabled.value,
    }

    provide(VoteTallyItemKey, itemCtx)

    return () =>
      h('li', {
        'data-disabled': disabled.value || undefined,
        'data-item': props.value,
        'data-slot': 'vote-tally-item',
        'data-vote-count': voteCount.value,
        'data-voted': voted.value || undefined,
      }, slots.default?.())
  },
})

// ---- Group ----
export const VoteTallyGroup = defineComponent({
  name: 'VoteTallyGroup',
  props: {
    sortBy: { type: String as PropType<'votes-asc' | 'votes-desc' | 'none'>, default: 'none' },
  },
  setup(props, { slots }) {
    const ctx = inject(VoteTallyKey)!

    return () => {
      const children = slots.default?.() || []

      if (props.sortBy === 'none') {
        return h('div', {}, children)
      }

      const sorted = [...children].sort((a, b) => {
        const aValue = (a.props as any)?.value as string
        const bValue = (b.props as any)?.value as string
        const aVotes = ctx.getVoteCount(aValue)
        const bVotes = ctx.getVoteCount(bValue)
        return props.sortBy === 'votes-desc' ? bVotes - aVotes : aVotes - bVotes
      })

      return h('div', {}, sorted)
    }
  },
})

// ---- Trigger ----
export const VoteTallyTrigger = defineComponent({
  name: 'VoteTallyTrigger',
  setup(_, { slots, attrs }) {
    const ctx = inject(VoteTallyKey)!
    const itemCtx = inject(VoteTallyItemKey)!

    const voted = computed(() => ctx.hasVoted(itemCtx.itemId))
    const disabled = computed(() => ctx.disabled() || itemCtx.disabled())

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || disabled.value) return
      ctx.toggleVote(itemCtx.itemId)
    }

    return () =>
      h('button', {
        ...attrs,
        'aria-label': voted.value ? 'Remove vote' : 'Vote',
        'aria-pressed': voted.value,
        'data-slot': 'vote-tally-trigger',
        'data-state': voted.value ? 'voted' : 'idle',
        disabled: disabled.value,
        onClick: handleClick,
        type: 'button',
      }, slots.default?.())
  },
})

// ---- Count ----
export const VoteTallyCount = defineComponent({
  name: 'VoteTallyCount',
  setup(_, { slots, attrs }) {
    const ctx = inject(VoteTallyKey)!
    const itemCtx = inject(VoteTallyItemKey)!

    const count = computed(() => ctx.getVoteCount(itemCtx.itemId))

    return () =>
      h('span', { ...attrs, 'data-slot': 'vote-tally-count' }, slots.default?.() ?? count.value)
  },
})

// ---- Title ----
export const VoteTallyTitle = defineComponent({
  name: 'VoteTallyTitle',
  setup(_, { slots, attrs }) {
    return () =>
      h('span', { ...attrs, 'data-slot': 'vote-tally-title' }, slots.default?.())
  },
})

// ---- Description ----
export const VoteTallyDescription = defineComponent({
  name: 'VoteTallyDescription',
  setup(_, { slots, attrs }) {
    return () =>
      h('span', { ...attrs, 'data-slot': 'vote-tally-description' }, slots.default?.())
  },
})

// ---- Composable for external access ----
export function useVoteTally() {
  const ctx = inject(VoteTallyKey)
  if (!ctx) {
    throw new Error('useVoteTally must be used within VoteTallyRoot')
  }
  return ctx
}

// ---- Compound export ----
export const VoteTally = {
  Root: VoteTallyRoot,
  Group: VoteTallyGroup,
  Item: VoteTallyItem,
  Trigger: VoteTallyTrigger,
  Count: VoteTallyCount,
  Title: VoteTallyTitle,
  Description: VoteTallyDescription,
}
</script>

<template>
  <!-- This file exports renderless components. Import them from this module. -->
  <slot />
</template>
