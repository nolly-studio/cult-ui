<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "SandboxContent" })

const props = defineProps<{
  class?: string
  open?: boolean
}>()
</script>

<template>
  <div
    v-if="props.open"
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class
    )"
  >
    <slot />
  </div>
</template>
