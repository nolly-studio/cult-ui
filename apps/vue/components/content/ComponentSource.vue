<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div data-component-source :data-name="name">
    <slot />
  </div>
</template>
