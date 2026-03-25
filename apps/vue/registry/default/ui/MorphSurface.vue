<script setup lang="ts">
/**
 * Morphing feedback form surface.
 * Expands from a trigger button into a textarea form with smooth transitions.
 * Supports controlled/uncontrolled open state and click-outside to close.
 */
import { ref, computed, watch, nextTick, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { cn } from '@/lib/utils'

const FEEDBACK_WIDTH = 360
const FEEDBACK_HEIGHT = 200

const props = withDefaults(defineProps<{
  collapsedWidth?: number | 'auto'
  collapsedHeight?: number
  expandedWidth?: number
  expandedHeight?: number
  animationSpeed?: number
  triggerLabel?: string
  placeholder?: string
  submitLabel?: string
  class?: string
  triggerClass?: string
  contentClass?: string
  modelValue?: boolean
}>(), {
  collapsedWidth: FEEDBACK_WIDTH,
  collapsedHeight: 44,
  expandedWidth: FEEDBACK_WIDTH,
  expandedHeight: FEEDBACK_HEIGHT,
  animationSpeed: 1,
  triggerLabel: 'Feedback',
  placeholder: "What's on your mind?",
  submitLabel: '⌘ Enter',
})

const emit = defineEmits<{
  'update:modelValue': [open: boolean]
  submit: [data: { message: string }]
  open: []
  close: []
  success: []
}>()

const containerRef = useTemplateRef<HTMLDivElement>('container')
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')

const internalIsOpen = ref(false)
const success = ref(false)
const message = ref('')

const isOpen = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalIsOpen.value,
  set: (val: boolean) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', val)
    } else {
      internalIsOpen.value = val
    }
  },
})

function toggle() {
  if (isOpen.value) {
    closeForm()
  } else {
    openForm()
  }
}

function openForm() {
  isOpen.value = true
  emit('open')
  nextTick(() => textareaRef.value?.focus())
}

function closeForm() {
  isOpen.value = false
  emit('close')
  textareaRef.value?.blur()
}

async function handleSubmit() {
  if (!message.value.trim()) return

  emit('submit', { message: message.value })
  message.value = ''
  closeForm()
  success.value = true
  emit('success')
  setTimeout(() => { success.value = false }, 1500)
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
  if (e.key === 'Escape') {
    closeForm()
  }
}

onClickOutside(containerRef, () => {
  if (isOpen.value) closeForm()
})

const duration = computed(() => `${0.4 / props.animationSpeed}s`)

const containerStyle = computed(() => ({
  width: isOpen.value ? `${props.expandedWidth}px` : typeof props.collapsedWidth === 'number' ? `${props.collapsedWidth}px` : 'auto',
  height: isOpen.value ? `${props.expandedHeight}px` : `${props.collapsedHeight}px`,
  transition: `width ${duration.value} cubic-bezier(0.4, 0, 0.2, 1), height ${duration.value} cubic-bezier(0.4, 0, 0.2, 1)`,
}))
</script>

<template>
  <div class="relative" :class="props.class">
    <div
      ref="container"
      :class="cn(
        'overflow-hidden rounded-xl border bg-background shadow-sm',
      )"
      :style="containerStyle"
    >
      <!-- Trigger (visible when closed) -->
      <Transition name="morph-fade">
        <button
          v-if="!isOpen"
          :class="cn(
            'flex h-full w-full items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-muted',
            props.triggerClass,
          )"
          @click="toggle"
        >
          <slot name="trigger-icon" />
          {{ props.triggerLabel }}
        </button>
      </Transition>

      <!-- Content (visible when open) -->
      <Transition name="morph-fade">
        <div v-if="isOpen" :class="cn('flex h-full flex-col p-3', props.contentClass)">
          <textarea
            ref="textarea"
            v-model="message"
            :placeholder="props.placeholder"
            class="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            @keydown="handleKeydown"
          />
          <div class="flex items-center justify-between pt-2">
            <button
              class="text-xs text-muted-foreground hover:text-foreground"
              @click="closeForm"
            >
              Cancel
            </button>
            <button
              class="rounded-lg bg-primary px-3 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              :disabled="!message.trim()"
              @click="handleSubmit"
            >
              {{ props.submitLabel }}
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Success indicator -->
    <Transition name="morph-fade">
      <div
        v-if="success"
        class="absolute inset-0 flex items-center justify-center rounded-xl border bg-background"
        :style="{ width: typeof props.collapsedWidth === 'number' ? `${props.collapsedWidth}px` : 'auto', height: `${props.collapsedHeight}px` }"
      >
        <span class="text-sm text-green-600">✓ Sent</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.morph-fade-enter-active,
.morph-fade-leave-active {
  transition: opacity 0.15s ease;
}
.morph-fade-enter-from,
.morph-fade-leave-to {
  opacity: 0;
}
</style>
