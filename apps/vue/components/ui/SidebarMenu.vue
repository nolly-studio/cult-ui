<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarMenu" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    :class="cn('grid gap-0.5', props.class)"
  >
    <slot />
  </ul>
</template>
