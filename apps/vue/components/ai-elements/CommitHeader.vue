<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { COMMIT_OPEN_KEY } from "./Commit.vue"

defineOptions({ name: "CommitHeader" })

const props = defineProps<{
  class?: string
}>()

const isOpen = inject(COMMIT_OPEN_KEY)!
</script>

<template>
  <div
    :class="cn(
      'group flex cursor-pointer items-center justify-between gap-4 p-3 text-left transition-colors hover:opacity-80',
      props.class
    )"
    @click="isOpen = !isOpen"
  >
    <slot />
  </div>
</template>
