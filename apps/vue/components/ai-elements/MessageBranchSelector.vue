<script setup lang="ts">
import { inject } from "vue"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { MESSAGE_BRANCH_KEY } from "./MessageBranch.vue"

defineOptions({ name: "MessageBranchSelector" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(MESSAGE_BRANCH_KEY)!
</script>

<template>
  <div
    v-if="ctx.totalBranches.value > 1"
    :class="cn('inline-flex items-center rounded-md border', props.class)"
  >
    <button
      type="button"
      class="inline-flex items-center justify-center size-7 rounded-l-md hover:bg-accent"
      aria-label="Previous branch"
      :disabled="ctx.totalBranches.value <= 1"
      @click="ctx.goToPrevious()"
    >
      <ChevronLeft :size="14" />
    </button>
    <span class="px-2 text-xs text-muted-foreground border-x">
      {{ ctx.currentBranch.value + 1 }} of {{ ctx.totalBranches.value }}
    </span>
    <button
      type="button"
      class="inline-flex items-center justify-center size-7 rounded-r-md hover:bg-accent"
      aria-label="Next branch"
      :disabled="ctx.totalBranches.value <= 1"
      @click="ctx.goToNext()"
    >
      <ChevronRight :size="14" />
    </button>
  </div>
</template>
