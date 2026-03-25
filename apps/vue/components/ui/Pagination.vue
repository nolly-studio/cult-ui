<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "Pagination" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <slot />
  </nav>
</template>
