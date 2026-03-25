<script setup lang="ts">
import { watch, onMounted, nextTick } from 'vue'
import { useLiftMode } from '@/composables/use-lift-mode'
import type { Block } from '@/registry/schema'

const props = defineProps<{
  block: Block
}>()

const { isLiftMode } = useLiftMode(props.block.name)

function updateChunkPositions() {
  const components = document.querySelectorAll('[x-chunk]')
  props.block.chunks?.map((chunk, index) => {
    const $chunk = document.querySelector<HTMLElement>(
      `[x-chunk="${chunk.name}"]`
    )
    const $wrapper = document.querySelector<HTMLElement>(
      `[x-chunk-container="${chunk.name}"]`
    )

    const $component = components[index]

    if (!$chunk || !$component) {
      return
    }

    const position = $component.getBoundingClientRect()
    $chunk.style.zIndex = '40'
    $chunk.style.width = `${position.width}px`
    $chunk.style.height = `${position.height}px`

    if ($wrapper) {
      $wrapper.style.zIndex = '40'
      $wrapper.style.position = 'absolute'
      $wrapper.style.top = `${position.top}px`
      $wrapper.style.left = `${position.left}px`
      $wrapper.style.width = `${position.width}px`
      $wrapper.style.height = `${position.height}px`
    }
  })
}

onMounted(() => {
  updateChunkPositions()
})

watch([() => props.block.chunks, isLiftMode], () => {
  nextTick(updateChunkPositions)
})
</script>

<template>
  <slot />
  <Transition
    enter-active-class="transition-opacity duration-200 ease-out delay-[180ms]"
    leave-active-class="transition-opacity duration-[380ms] ease-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLiftMode"
      class="absolute inset-0 z-30 bg-background/90 fill-mode-backwards"
    />
  </Transition>
</template>
