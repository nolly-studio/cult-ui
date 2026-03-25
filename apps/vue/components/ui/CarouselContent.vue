<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useCarousel } from "@/composables/useCarousel"

defineOptions({ name: "CarouselContent" })

const props = defineProps<{ class?: string }>()

const { emblaRef, orientation } = useCarousel()
</script>

<template>
  <div :ref="(el) => { emblaRef = el as HTMLElement }" class="overflow-hidden">
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
