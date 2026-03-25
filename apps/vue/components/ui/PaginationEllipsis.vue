<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "PaginationEllipsis" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('flex h-9 w-9 items-center justify-center', props.class)"
  >
    <MoreHorizontal class="h-4 w-4" />
    <span class="sr-only">More pages</span>
  </span>
</template>
