<script setup lang="ts">
import { ref, nextTick } from "vue"
import { ArrowDown, Download } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Conversation" })

const props = defineProps<{
  class?: string
}>()

const scrollContainer = ref<HTMLElement>()
const isAtBottom = ref(true)

function onScroll(e: Event) {
  const el = e.target as HTMLElement
  isAtBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 10
}

function scrollToBottom() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: "smooth",
    })
  }
}

defineExpose({ scrollToBottom })
</script>

<template>
  <div
    ref="scrollContainer"
    :class="cn('relative flex-1 overflow-y-auto', props.class)"
    role="log"
    @scroll="onScroll"
  >
    <slot :is-at-bottom="isAtBottom" :scroll-to-bottom="scrollToBottom" />
  </div>
</template>
