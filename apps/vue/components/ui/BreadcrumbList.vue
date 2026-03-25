<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "BreadcrumbList" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ol
    :class="
      cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        props.class
      )
    "
  >
    <slot />
  </ol>
</template>
