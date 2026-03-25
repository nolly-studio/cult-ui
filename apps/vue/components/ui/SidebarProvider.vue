<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarProvider" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-provider"
    :class="cn('w-full', props.class)"
    :style="{
      '--sidebar-width': '18rem',
      '--sidebar-menu-width': '14rem',
    }"
  >
    <slot />
  </div>
</template>
