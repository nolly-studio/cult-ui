<script setup lang="ts">
import { ref, provide, inject, watch, computed, type InjectionKey, type Ref } from 'vue'
import { cn } from '@/lib/utils'

// Context
interface ExpandableContextType {
  isExpanded: Ref<boolean>
  toggleExpand: () => void
  expandDirection: 'vertical' | 'horizontal' | 'both'
  expandBehavior: 'replace' | 'push'
  transitionDuration: number
  easeType: string
  initialDelay: number
}

const EXPANDABLE_KEY: InjectionKey<ExpandableContextType> = Symbol('expandable')

export function useExpandable() {
  const ctx = inject(EXPANDABLE_KEY)
  if (!ctx) {
    return {
      isExpanded: ref(false),
      toggleExpand: () => {},
      expandDirection: 'vertical' as const,
      expandBehavior: 'replace' as const,
      transitionDuration: 0.3,
      easeType: 'ease-in-out',
      initialDelay: 0,
    }
  }
  return ctx
}

// Animation presets
const ANIMATION_PRESETS: Record<string, { initial: Record<string, any>; animate: Record<string, any>; exit: Record<string, any> }> = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  'slide-up': { initial: { opacity: 0, transform: 'translateY(20px)' }, animate: { opacity: 1, transform: 'translateY(0)' }, exit: { opacity: 0, transform: 'translateY(20px)' } },
  'slide-down': { initial: { opacity: 0, transform: 'translateY(-20px)' }, animate: { opacity: 1, transform: 'translateY(0)' }, exit: { opacity: 0, transform: 'translateY(-20px)' } },
  scale: { initial: { opacity: 0, transform: 'scale(0.8)' }, animate: { opacity: 1, transform: 'scale(1)' }, exit: { opacity: 0, transform: 'scale(0.8)' } },
  'blur-sm': { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(4px)' } },
}

// Props
interface Props {
  expanded?: boolean
  transitionDuration?: number
  easeType?: string
  expandDirection?: 'vertical' | 'horizontal' | 'both'
  expandBehavior?: 'replace' | 'push'
  initialDelay?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  expanded: undefined,
  transitionDuration: 0.3,
  easeType: 'ease-in-out',
  expandDirection: 'vertical',
  expandBehavior: 'replace',
  initialDelay: 0,
})

const emit = defineEmits<{
  toggle: []
  expandStart: []
  expandEnd: []
  collapseStart: []
  collapseEnd: []
}>()

const isExpandedInternal = ref(false)

const isExpanded = computed(() =>
  props.expanded !== undefined ? props.expanded : isExpandedInternal.value
)

const isExpandedRef = ref(isExpanded.value)
watch(isExpanded, (val) => { isExpandedRef.value = val })

function toggleExpand() {
  if (props.expanded !== undefined) {
    emit('toggle')
  } else {
    isExpandedInternal.value = !isExpandedInternal.value
  }
}

watch(isExpanded, (val) => {
  if (val) emit('expandStart')
  else emit('collapseStart')
})

provide(EXPANDABLE_KEY, {
  isExpanded: isExpandedRef,
  toggleExpand,
  expandDirection: props.expandDirection,
  expandBehavior: props.expandBehavior,
  transitionDuration: props.transitionDuration,
  easeType: props.easeType,
  initialDelay: props.initialDelay,
})
</script>

<template>
  <div :class="props.class">
    <slot :is-expanded="isExpanded" :toggle-expand="toggleExpand" />
  </div>
</template>
