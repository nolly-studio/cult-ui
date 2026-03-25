<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarGroup" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <section
    data-slot="sidebar-group"
    :class="cn('space-y-1', props.class)"
  >
    <slot />
  </section>
</template>
