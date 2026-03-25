<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "MessageContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm',
      'group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground',
      'group-[.is-assistant]:text-foreground',
      props.class
    )"
  >
    <slot />
  </div>
</template>
