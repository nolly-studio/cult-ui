<script setup lang="ts">
import { ArrowDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ConversationScrollButton" })

const props = defineProps<{
  class?: string
  isAtBottom: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    v-if="!props.isAtBottom"
    type="button"
    :class="cn(
      'absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full border bg-background p-2 shadow-sm hover:bg-muted dark:bg-background dark:hover:bg-muted',
      props.class
    )"
    @click="emit('click')"
  >
    <ArrowDown class="size-4" />
  </button>
</template>
