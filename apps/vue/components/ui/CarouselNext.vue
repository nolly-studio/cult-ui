<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { useCarousel } from "@/composables/useCarousel"
import Button from "./Button.vue"

defineOptions({ name: "CarouselNext" })

const props = defineProps<{ class?: string }>()

const { orientation, scrollNext, canScrollNext } = useCarousel()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :class="
      cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class
      )
    "
    :disabled="!canScrollNext"
    @click="scrollNext"
  >
    <ArrowRight class="h-4 w-4" />
    <span class="sr-only">Next slide</span>
  </Button>
</template>
