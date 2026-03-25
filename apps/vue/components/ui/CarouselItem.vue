<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useCarousel } from "@/composables/useCarousel"

defineOptions({ name: "CarouselItem" })

const props = defineProps<{ class?: string }>()

const { orientation } = useCarousel()
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="
      cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
