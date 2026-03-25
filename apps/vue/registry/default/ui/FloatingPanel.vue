<script setup lang="ts">
import { ref, provide, inject, onMounted, onUnmounted, type InjectionKey, type Ref } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

// Context
interface FloatingPanelContext {
  isOpen: Ref<boolean>
  openFloatingPanel: (rect: DOMRect) => void
  closeFloatingPanel: () => void
  note: Ref<string>
  setNote: (note: string) => void
  triggerRect: Ref<DOMRect | null>
  title: Ref<string>
  setTitle: (title: string) => void
}

const FLOATING_PANEL_KEY: InjectionKey<FloatingPanelContext> = Symbol('floating-panel')

export function useFloatingPanel() {
  const ctx = inject(FLOATING_PANEL_KEY)
  if (!ctx) throw new Error('useFloatingPanel must be used within a FloatingPanelRoot')
  return ctx
}

// Props
interface Props {
  class?: string
}

const props = defineProps<Props>()

// State
const isOpen = ref(false)
const note = ref('')
const triggerRect = ref<DOMRect | null>(null)
const title = ref('')

function openFloatingPanel(rect: DOMRect) {
  triggerRect.value = rect
  isOpen.value = true
}

function closeFloatingPanel() {
  isOpen.value = false
  note.value = ''
}

function setNote(val: string) {
  note.value = val
}

function setTitle(val: string) {
  title.value = val
}

// Close on escape
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeFloatingPanel()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

provide(FLOATING_PANEL_KEY, {
  isOpen,
  openFloatingPanel,
  closeFloatingPanel,
  note,
  setNote,
  triggerRect,
  title,
  setTitle,
})
</script>

<template>
  <div :class="cn('relative', props.class)">
    <!-- Trigger slot -->
    <slot name="trigger" :open="openFloatingPanel" :set-title="setTitle" />

    <!-- Panel -->
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-40 backdrop-blur-sm"
          @click="closeFloatingPanel"
        />
      </Transition>

      <!-- Content -->
      <Transition name="panel">
        <div
          v-if="isOpen"
          class="fixed z-50 overflow-hidden border border-zinc-950/10 bg-white shadow-lg outline-none dark:border-zinc-50/10 dark:bg-zinc-800"
          :style="{
            borderRadius: '12px',
            left: triggerRect ? `${triggerRect.left}px` : '50%',
            top: triggerRect ? `${triggerRect.bottom + 8}px` : '50%',
            transformOrigin: 'top left',
          }"
          role="dialog"
          aria-modal="true"
        >
          <!-- Title -->
          <div class="px-4 py-2 bg-white dark:bg-zinc-800">
            <div class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {{ title }}
            </div>
          </div>

          <slot
            name="content"
            :note="note"
            :set-note="setNote"
            :close="closeFloatingPanel"
            :title="title"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.panel-enter-active {
  transition: all 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.panel-leave-active {
  transition: all 0.2s ease-in;
}
.panel-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.panel-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
