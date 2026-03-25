<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    panelOpen: boolean
    class?: string
  }>(),
  {}
)

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const measureRef = ref<HTMLDivElement | null>(null)
const { height: measuredHeight } = useElementSize(measureRef)

const animatedHeight = computed(() =>
  measuredHeight.value > 0 ? `${measuredHeight.value}px` : '0.1px'
)

const panelWidth = computed(() => (props.panelOpen ? '97%' : ''))
</script>

<template>
  <div class="flex w-full flex-col items-start">
    <div class="mx-auto w-full">
      <div
        :class="
          cn(
            $slots.default ? 'rounded-r-none' : 'rounded-sm',
            'relative overflow-hidden'
          )
        "
      >
        <div
          :class="
            cn(
              'bg-neutral-900 rounded-r-[44px] w-[160px] md:w-[260px] transition-all duration-200 ease-[cubic-bezier(0.42,0,0.58,1)]',
              props.class
            )
          "
          :style="panelOpen ? { width: panelWidth } : {}"
        >
          <div
            class="h-auto transition-all duration-[650ms] ease-[cubic-bezier(0.42,0,0.58,1)]"
            :style="{ height: animatedHeight }"
          >
            <div ref="measureRef">
              <div
                :class="
                  cn(
                    'flex items-center w-full justify-start pl-4 md:pl-4 py-1 md:py-3',
                    panelOpen ? 'pr-3' : ''
                  )
                "
              >
                <slot name="button" :toggle="() => emit('toggle')" />
              </div>

              <Transition
                enter-active-class="transition-opacity duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150 ease-[cubic-bezier(0.42,0,0.58,1)]"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="panelOpen">
                  <slot />
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
