<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useLiftMode } from '@/hooks/use-lift-mode'
import BlockCopyButton from '@/components/BlockCopyButton.vue'
import type { Block, BlockChunk } from '@/registry/schema'

const props = defineProps<{
  block: Block
  chunk?: BlockChunk
}>()

const { isLiftMode } = useLiftMode(props.block.name)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-in"
    leave-active-class="transition-opacity duration-200 ease-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLiftMode && chunk"
      :x-chunk-container="chunk.name"
      :class="cn(
        'group rounded-xl bg-background shadow-xl transition',
        chunk.container?.className
      )"
    >
      <div class="relative z-30">
        <slot />
      </div>
      <div
        v-if="chunk.code"
        class="absolute inset-x-0 top-0 z-20 flex px-4 py-3 opacity-0 transition-all duration-200 ease-in group-hover:-translate-y-12 group-hover:opacity-100"
      >
        <div class="flex w-full items-center justify-end gap-2">
          <BlockCopyButton
            event="copy_chunk_code"
            :name="chunk.name"
            :code="chunk.code"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>
