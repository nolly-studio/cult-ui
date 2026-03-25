<script setup lang="ts">
defineProps<{
  name: string
  className?: string
  description?: string
}>()
</script>

<template>
  <div data-component-preview :data-name="name" :class="className">
    <slot />
  </div>
</template>
