<script setup lang="ts">
import UiAlert from '@/components/ui/Alert.vue'

defineProps<{
  className?: string
}>()
</script>

<template>
  <UiAlert :class="className">
    <slot />
  </UiAlert>
</template>
