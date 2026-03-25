<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarGroupContent" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    :class="cn('space-y-0.5', props.class)"
  >
    <slot />
  </div>
</template>
