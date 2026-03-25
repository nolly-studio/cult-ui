<script setup lang="ts">
import { ref } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "QueueSection" })

const props = withDefaults(
  defineProps<{
    class?: string
    defaultOpen?: boolean
  }>(),
  { defaultOpen: true }
)

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <div :class="cn(props.class)" :data-state="isOpen ? 'open' : 'closed'">
    <slot :is-open="isOpen" :toggle="() => (isOpen = !isOpen)" />
  </div>
</template>
