<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Message" })

const props = defineProps<{
  class?: string
  from: "user" | "assistant" | "system" | "data" | "tool"
}>()
</script>

<template>
  <div
    :class="cn(
      'group flex w-full max-w-[95%] flex-col gap-2',
      props.from === 'user' ? 'is-user ml-auto justify-end' : 'is-assistant',
      props.class
    )"
  >
    <slot />
  </div>
</template>
