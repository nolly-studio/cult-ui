<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { useCarousel } from "@/composables/useCarousel"
import Button from "./Button.vue"

defineOptions({ name: "CarouselPrevious" })

const props = defineProps<{ class?: string }>()

const { orientation, scrollPrev, canScrollPrev } = useCarousel()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :class="
      cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class
      )
    "
    :disabled="!canScrollPrev"
    @click="scrollPrev"
  >
    <ArrowLeft class="h-4 w-4" />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>
