<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {}
)

const isHovered = ref(false)

function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

function handleClick() {
  isHovered.value = !isHovered.value
}

const contentHeight = computed(() => (isHovered.value ? '194px' : '38px'))
</script>

<template>
  <div
    :class="
      cn(
        'min-h-[300px] w-[280px] md:w-[300px]',
        'group relative flex flex-col items-center justify-between overflow-hidden rounded-xl p-3 text-sm',
        'hover:cursor-pointer bg-card',
        'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
        'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
        'transition-transform duration-200',
        isHovered && 'scale-[1.02]',
        props.class
      )
    "
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Header -->
    <div class="flex h-[46px] w-full flex-col relative text-primary-foreground">
      <div class="w-full">
        <slot name="top" />

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isHovered">
            <slot name="topAnimate" />
          </div>
        </Transition>
      </div>
    </div>

    <!-- Middle Content -->
    <div class="pb-12">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="!isHovered">
          <slot name="middle" />
        </div>
      </Transition>
    </div>

    <!-- Bottom Content -->
    <div
      class="absolute -bottom-1.5 left-0 right-0 flex flex-col gap-4 rounded-xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
      :style="{ height: contentHeight, opacity: 1 }"
    >
      <div class="flex w-full flex-col gap-1">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>
