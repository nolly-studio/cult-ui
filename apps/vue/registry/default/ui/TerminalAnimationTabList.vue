<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    aria-label="Terminal commands"
    :class="$props.class"
    data-slot="terminal-animation-tab-list"
    role="tablist"
  >
    <slot />
  </div>
</template>
