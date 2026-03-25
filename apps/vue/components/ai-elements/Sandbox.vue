<script setup lang="ts">
import { ref } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Sandbox" })

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
  <div
    :class="cn(
      'not-prose group mb-4 w-full overflow-hidden rounded-md border',
      props.class
    )"
    :data-state="isOpen ? 'open' : 'closed'"
  >
    <slot :is-open="isOpen" :toggle="() => (isOpen = !isOpen)" />
  </div>
</template>
