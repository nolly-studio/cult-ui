<script setup lang="ts">
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <AspectRatio :ratio="1 / 1" as-child>
    <div
      :class="cn(
        'flex items-center justify-center rounded-md border p-8',
        props.class
      )"
    >
      <slot />
    </div>
  </AspectRatio>
</template>
