<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Sidebar" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <aside
    data-slot="sidebar"
    :class="cn('w-(--sidebar-width) shrink-0', props.class)"
  >
    <slot />
  </aside>
</template>
