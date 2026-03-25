<script setup lang="ts">
import { Loader2 } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Spinner" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <Loader2
    role="status"
    aria-label="Loading"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
