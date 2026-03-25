<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useCarouselProvider, type CarouselOrientation } from "@/composables/useCarousel"
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"

defineOptions({ name: "Carousel" })

const props = withDefaults(
  defineProps<{
    class?: string
    opts?: EmblaOptionsType
    plugins?: EmblaPluginType[]
    orientation?: CarouselOrientation
  }>(),
  { orientation: "horizontal" }
)

const { scrollPrev, scrollNext } = useCarouselProvider(
  props.opts,
  props.plugins,
  props.orientation
)

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    scrollNext()
  }
}
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown="handleKeyDown"
  >
    <slot />
  </div>
</template>
