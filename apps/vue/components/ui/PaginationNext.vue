<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./Button.vue"

defineOptions({ name: "PaginationNext" })

const props = defineProps<{
  class?: string
  href?: string
}>()
</script>

<template>
  <a
    :href="href"
    aria-label="Go to next page"
    :class="
      cn(
        buttonVariants({ variant: 'ghost', size: 'default' }),
        'gap-1 pr-2.5',
        props.class
      )
    "
  >
    <span>Next</span>
    <ChevronRight class="h-4 w-4" />
  </a>
</template>
