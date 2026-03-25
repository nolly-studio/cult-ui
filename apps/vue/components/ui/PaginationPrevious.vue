<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./Button.vue"

defineOptions({ name: "PaginationPrevious" })

const props = defineProps<{
  class?: string
  href?: string
}>()
</script>

<template>
  <a
    :href="href"
    aria-label="Go to previous page"
    :class="
      cn(
        buttonVariants({ variant: 'ghost', size: 'default' }),
        'gap-1 pl-2.5',
        props.class
      )
    "
  >
    <ChevronLeft class="h-4 w-4" />
    <span>Previous</span>
  </a>
</template>
