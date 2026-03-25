<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Code, ChevronDownIcon } from "lucide-vue-next"

defineOptions({ name: "SandboxHeader" })

const props = defineProps<{
  class?: string
  title?: string
  state?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="cn(
      'flex w-full items-center justify-between gap-4 p-3',
      props.class
    )"
    type="button"
    @click="emit('click', $event)"
  >
    <div class="flex items-center gap-2">
      <Code class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">{{ props.title }}</span>
      <slot name="badge" />
    </div>
    <ChevronDownIcon class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </button>
</template>
