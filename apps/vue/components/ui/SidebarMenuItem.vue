<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarMenuItem" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    :class="cn('list-none', props.class)"
  >
    <slot />
  </li>
</template>
