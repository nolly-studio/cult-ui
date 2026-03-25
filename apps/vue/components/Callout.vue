<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <Alert>
    <span v-if="icon" class="mr-4 text-2xl">{{ icon }}</span>
    <AlertTitle v-if="title">{{ title }}</AlertTitle>
    <AlertDescription>
      <slot />
    </AlertDescription>
  </Alert>
</template>
