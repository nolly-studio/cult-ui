<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarContent" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-content"
    :class="cn('flex h-full flex-col overflow-y-auto', props.class)"
  >
    <slot />
  </div>
</template>
