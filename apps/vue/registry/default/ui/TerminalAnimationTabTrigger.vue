<script setup lang="ts">
import { computed } from 'vue'
import { useTerminalAnimation } from './TerminalAnimation.vue'

const props = defineProps<{
  index: number
  class?: string
}>()

const { activeTab, setActiveTab } = useTerminalAnimation()

const isActive = computed(() => activeTab.value === props.index)
</script>

<template>
  <button
    data-slot="terminal-animation-tab-trigger"
    type="button"
    role="tab"
    :aria-selected="isActive"
    :data-state="isActive ? 'active' : 'inactive'"
    :class="props.class"
    @click="setActiveTab(props.index)"
  >
    <slot />
  </button>
</template>
