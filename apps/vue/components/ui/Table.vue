<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Table" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
