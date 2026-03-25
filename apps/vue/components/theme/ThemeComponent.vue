<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'

defineProps<{
  name: string
  class?: string
}>()

const config = useConfig()
</script>

<template>
  <div :class="cn('relative', $props.class)">
    <p class="text-sm text-muted-foreground">
      Component
      <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {{ name }}
      </code>
      preview (style: {{ config.style }})
    </p>
  </div>
</template>
