<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { COMMIT_OPEN_KEY } from "./Commit.vue"

defineOptions({ name: "CommitContent" })

const props = defineProps<{
  class?: string
}>()

const isOpen = inject(COMMIT_OPEN_KEY)!
</script>

<template>
  <div v-if="isOpen" :class="cn('border-t p-3', props.class)">
    <slot />
  </div>
</template>
