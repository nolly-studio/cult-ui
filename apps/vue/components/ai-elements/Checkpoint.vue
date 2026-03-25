<script setup lang="ts">
import { Bookmark } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Checkpoint" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-0.5 overflow-hidden text-muted-foreground', props.class)"
  >
    <slot />
    <hr class="flex-1 border-t" />
  </div>
</template>
