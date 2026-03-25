<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  char?: string
  isActive?: boolean
  hasFakeCaret?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-1 ring-ring',
        props.class,
      )
    "
  >
    {{ char }}
    <div
      v-if="hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        class="h-4 w-px animate-caret-blink bg-foreground duration-1000"
      />
    </div>
  </div>
</template>
