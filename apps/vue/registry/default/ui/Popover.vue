<script setup lang="ts">
import {
  ref,
  provide,
  inject,
  computed,
  type InjectionKey,
  type Ref,
} from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/composables/useClickOutside'

// ============================================================================
// Context
// ============================================================================

interface PopoverContextType {
  isOpen: Ref<boolean>
  openPopover: () => void
  closePopover: () => void
  uniqueId: string
  note: Ref<string>
  setNote: (note: string) => void
}

const PopoverKey: InjectionKey<PopoverContextType> = Symbol('PopoverContext')

export function usePopover(): PopoverContextType {
  const ctx = inject(PopoverKey)
  if (!ctx) {
    throw new Error('usePopover must be used within a PopoverRoot')
  }
  return ctx
}

// ============================================================================
// Props
// ============================================================================

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {}
)

// ============================================================================
// State
// ============================================================================

const isOpen = ref(false)
const note = ref('')
let idCounter = 0
const uniqueId = `popover-${++idCounter}-${Math.random().toString(36).slice(2, 7)}`

function openPopover() {
  isOpen.value = true
}

function closePopover() {
  isOpen.value = false
  note.value = ''
}

function setNote(val: string) {
  note.value = val
}

provide(PopoverKey, {
  isOpen,
  openPopover,
  closePopover,
  uniqueId,
  note,
  setNote,
})
</script>

<template>
  <div
    :class="cn('relative flex items-center justify-center isolate', props.class)"
  >
    <slot />
  </div>
</template>

<!-- Sub-components exported from this file -->
<script lang="ts">
import { defineComponent, h, Transition } from 'vue'

// ============================================================================
// PopoverTrigger
// ============================================================================
export const PopoverTrigger = defineComponent({
  name: 'PopoverTrigger',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const { openPopover } = inject(PopoverKey)!

    return () =>
      h(
        'button',
        {
          class: cn(
            'flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50 rounded-lg',
            props.class
          ),
          onClick: openPopover,
        },
        [h('span', { class: 'text-sm' }, slots.default?.())]
      )
  },
})

// ============================================================================
// PopoverContent
// ============================================================================
export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const { isOpen, closePopover, uniqueId } = inject(PopoverKey)!
    const formContainerRef = ref<HTMLDivElement | null>(null)

    // Click outside
    function handleClickOutside(event: MouseEvent) {
      if (
        formContainerRef.value &&
        !formContainerRef.value.contains(event.target as Node)
      ) {
        closePopover()
      }
    }

    // Escape key
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closePopover()
      }
    }

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    })

    return () =>
      h(
        Transition,
        {
          enterActiveClass: 'transition-all duration-300 ease-out',
          enterFromClass: 'opacity-0 scale-95',
          enterToClass: 'opacity-100 scale-100',
          leaveActiveClass: 'transition-all duration-200 ease-in',
          leaveFromClass: 'opacity-100 scale-100',
          leaveToClass: 'opacity-0 scale-95',
        },
        () =>
          isOpen.value
            ? h(
                'div',
                {
                  ref: formContainerRef,
                  class: cn(
                    'absolute h-[200px] w-[364px] overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700 z-50 rounded-xl',
                    props.class
                  ),
                  style: {
                    top: 'auto',
                    left: 'auto',
                    transform: 'none',
                  },
                },
                slots.default?.()
              )
            : null
      )
  },
})

// ============================================================================
// PopoverForm
// ============================================================================
export const PopoverForm = defineComponent({
  name: 'PopoverForm',
  props: {
    class: { type: String, default: '' },
  },
  emits: ['submit'],
  setup(props, { slots, emit }) {
    const { note, closePopover } = inject(PopoverKey)!

    function handleSubmit(e: Event) {
      e.preventDefault()
      emit('submit', note.value)
      closePopover()
    }

    return () =>
      h(
        'form',
        {
          class: cn('flex h-full flex-col', props.class),
          onSubmit: handleSubmit,
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PopoverLabel
// ============================================================================
export const PopoverLabel = defineComponent({
  name: 'PopoverLabel',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const { note } = inject(PopoverKey)!

    return () =>
      h(
        'span',
        {
          'aria-hidden': 'true',
          style: { opacity: note.value ? 0 : 1 },
          class: cn(
            'absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PopoverTextarea
// ============================================================================
export const PopoverTextarea = defineComponent({
  name: 'PopoverTextarea',
  props: {
    class: { type: String, default: '' },
  },
  setup(props) {
    const { note, setNote } = inject(PopoverKey)!

    return () =>
      h('textarea', {
        class: cn(
          'h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none',
          props.class
        ),
        autofocus: true,
        value: note.value,
        onInput: (e: Event) => setNote((e.target as HTMLTextAreaElement).value),
      })
  },
})

// ============================================================================
// PopoverFooter
// ============================================================================
export const PopoverFooter = defineComponent({
  name: 'PopoverFooter',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn('flex justify-between px-4 py-3', props.class),
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PopoverCloseButton
// ============================================================================
export const PopoverCloseButton = defineComponent({
  name: 'PopoverCloseButton',
  props: {
    class: { type: String, default: '' },
  },
  setup(props) {
    const { closePopover } = inject(PopoverKey)!

    return () =>
      h(
        'button',
        {
          type: 'button',
          class: cn('flex items-center', props.class),
          onClick: closePopover,
          'aria-label': 'Close popover',
        },
        [h(X, { size: 16, class: 'text-zinc-900 dark:text-zinc-100' })]
      )
  },
})

// ============================================================================
// PopoverSubmitButton
// ============================================================================
export const PopoverSubmitButton = defineComponent({
  name: 'PopoverSubmitButton',
  props: {
    class: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h(
        'button',
        {
          class: cn(
            'relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800',
            props.class
          ),
          type: 'submit',
          'aria-label': 'Submit note',
        },
        'Submit'
      )
  },
})

// ============================================================================
// PopoverHeader
// ============================================================================
export const PopoverHeader = defineComponent({
  name: 'PopoverHeader',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn(
            'px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PopoverBody
// ============================================================================
export const PopoverBody = defineComponent({
  name: 'PopoverBody',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn('p-4', props.class) }, slots.default?.())
  },
})

// ============================================================================
// PopoverButton
// ============================================================================
export const PopoverButton = defineComponent({
  name: 'PopoverButton',
  props: {
    class: { type: String, default: '' },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          class: cn(
            'flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700',
            props.class
          ),
          onClick: () => emit('click'),
        },
        slots.default?.()
      )
  },
})
</script>
