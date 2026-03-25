<script setup lang="ts">
import { Tabs } from '@/components/ui/tabs'

const installationType = ref<'cli' | 'manual'>('cli')

function handleValueChange(value: string) {
  installationType.value = value as 'cli' | 'manual'
}
</script>

<template>
  <Tabs
    :model-value="installationType"
    class="relative mt-6 w-full"
    @update:model-value="handleValueChange"
  >
    <slot />
  </Tabs>
</template>
