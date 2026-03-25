<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "BreadcrumbSeparator" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:w-3.5 [&>svg]:h-3.5', props.class)"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
