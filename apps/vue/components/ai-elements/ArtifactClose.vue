<script setup lang="ts">
import { X } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ArtifactClose" })

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-center size-8 p-0 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent', props.class)"
    @click="emit('click', $event)"
  >
    <slot>
      <X class="size-4" />
    </slot>
    <span class="sr-only">Close</span>
  </button>
</template>
