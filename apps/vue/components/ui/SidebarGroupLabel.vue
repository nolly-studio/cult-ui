<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarGroupLabel" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <h4
    data-slot="sidebar-group-label"
    :class="
      cn(
        'px-2 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </h4>
</template>
