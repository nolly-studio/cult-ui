<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SandboxTabsBar" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'flex w-full items-center border-border border-t border-b',
      props.class
    )"
  >
    <slot />
  </div>
</template>
