<script setup lang="ts">
import { ref, provide, inject, watch, type InjectionKey, type Ref } from 'vue'
import { X } from 'lucide-vue-next'

// Context type
interface ExpandableScreenContext {
  isExpanded: Ref<boolean>
  expand: () => void
  collapse: () => void
  layoutId: string
  triggerRadius: string
  contentRadius: string
  animationDuration: number
}

const EXPANDABLE_SCREEN_KEY: InjectionKey<ExpandableScreenContext> = Symbol('expandable-screen')

export function useExpandableScreen() {
  const context = inject(EXPANDABLE_SCREEN_KEY)
  if (!context) {
    throw new Error('useExpandableScreen must be used within an ExpandableScreen')
  }
  return context
}

// Root props
interface Props {
  defaultExpanded?: boolean
  layoutId?: string
  triggerRadius?: string
  contentRadius?: string
  animationDuration?: number
  lockScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false,
  layoutId: 'expandable-card',
  triggerRadius: '100px',
  contentRadius: '24px',
  animationDuration: 0.3,
  lockScroll: true,
})

const emit = defineEmits<{
  expandChange: [expanded: boolean]
}>()

const isExpanded = ref(props.defaultExpanded)

function expand() {
  isExpanded.value = true
  emit('expandChange', true)
}

function collapse() {
  isExpanded.value = false
  emit('expandChange', false)
}

watch(isExpanded, (val) => {
  if (props.lockScroll) {
    document.body.style.overflow = val ? 'hidden' : 'unset'
  }
})

provide(EXPANDABLE_SCREEN_KEY, {
  isExpanded,
  expand,
  collapse,
  layoutId: props.layoutId,
  triggerRadius: props.triggerRadius,
  contentRadius: props.contentRadius,
  animationDuration: props.animationDuration,
})
</script>

<template>
  <div>
    <!-- Trigger: shown when not expanded -->
    <Transition name="scale-fade">
      <div
        v-if="!isExpanded"
        class="inline-block relative cursor-pointer"
        @click="expand"
      >
        <slot name="trigger" />
      </div>
    </Transition>

    <!-- Content: shown when expanded -->
    <Transition name="expand">
      <div
        v-if="isExpanded"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-2"
      >
        <div
          class="relative flex h-full w-full overflow-y-auto transform-gpu will-change-transform"
          :style="{ borderRadius: contentRadius }"
        >
          <div class="relative z-20 w-full">
            <slot name="content" />
          </div>

          <button
            class="absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center transition-colors rounded-full text-white bg-transparent hover:bg-white/10"
            aria-label="Close"
            @click="collapse"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Background slot -->
    <slot name="background" :is-expanded="isExpanded" />
  </div>
</template>

<style scoped>
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.expand-enter-active {
  transition: all 0.3s ease;
}
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}
</style>
