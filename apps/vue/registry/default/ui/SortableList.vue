<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trash } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

// ============================================================================
// Types
// ============================================================================

export interface Item {
  text: string
  checked: boolean
  id: number
  description: string
}

// ============================================================================
// Props & Emits
// ============================================================================

const props = defineProps<{
  items: Item[]
}>()

const emit = defineEmits<{
  (e: 'update:items', items: Item[]): void
  (e: 'completeItem', id: number): void
  (e: 'removeItem', id: number): void
}>()

// ============================================================================
// Drag & Drop State
// ============================================================================

const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const expandedId = ref<number | null>(null)

function onDragStart(index: number, event: DragEvent) {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function onDragOver(index: number, event: DragEvent) {
  event.preventDefault()
  dragOverIndex.value = index
}

function onDragEnd() {
  if (
    draggedIndex.value !== null &&
    dragOverIndex.value !== null &&
    draggedIndex.value !== dragOverIndex.value
  ) {
    const newItems = [...props.items]
    const [moved] = newItems.splice(draggedIndex.value, 1)
    newItems.splice(dragOverIndex.value, 0, moved)
    emit('update:items', newItems)
  }
  draggedIndex.value = null
  dragOverIndex.value = null
}

function handleComplete(id: number) {
  emit('completeItem', id)
}

function handleRemove(id: number) {
  emit('removeItem', id)
}
</script>

<template>
  <div class="flex flex-col">
    <TransitionGroup
      tag="div"
      class="flex flex-col"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      move-class="transition-transform duration-300"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="flex w-full items-center"
      >
        <!-- Sortable Item -->
        <div
          :class="
            cn(
              'relative z-auto grow',
              'rounded-xl bg-primary dark:bg-primary-foreground',
              'shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]',
              item.checked ? 'cursor-not-allowed' : 'cursor-grab',
              item.checked ? 'w-[70%]' : 'w-full',
              'transition-all duration-300 ease-out'
            )
          "
          :draggable="!item.checked"
          @dragstart="onDragStart(index, $event)"
          @dragover="onDragOver(index, $event)"
          @dragend="onDragEnd"
          :style="{
            position: 'relative',
            overflow: 'hidden',
          }"
        >
          <div class="z-20">
            <div class="flex items-center justify-center">
              <!-- Item content (when not expanded) -->
              <Transition
                enter-active-class="transition-all duration-150 ease-out"
                enter-from-class="opacity-0 blur-[4px]"
                enter-to-class="opacity-100 blur-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 blur-0"
                leave-to-class="opacity-0 blur-[4px]"
              >
                <div
                  v-if="expandedId !== item.id"
                  class="flex items-center space-x-2"
                >
                  <!-- Checkbox -->
                  <div class="pl-3 pt-1">
                    <input
                      type="checkbox"
                      :checked="item.checked"
                      :id="`checkbox-${item.id}`"
                      aria-label="Mark to delete"
                      class="h-5 w-5 rounded-md border-white/20 bg-black/30 accent-black"
                      @change="handleComplete(item.id)"
                    />
                  </div>

                  <!-- Order -->
                  <p class="font-mono text-xs pl-1 text-white/50">
                    {{ index + 1 }}
                  </p>

                  <!-- Title -->
                  <div class="px-1 min-w-[150px]">
                    <h4
                      :class="
                        cn(
                          'tracking-tighter text-base md:text-lg transition-all duration-300',
                          item.checked ? 'text-red-400' : 'text-white/70'
                        )
                      "
                    >
                      {{ item.checked ? 'Delete' : ` ${item.text}` }}
                    </h4>
                  </div>
                </div>
              </Transition>

              <!-- Extra content slot -->
              <slot name="extra" :item="item" />
            </div>
          </div>

          <!-- Drag handle -->
          <div style="touch-action: none" />
        </div>

        <!-- Delete connector bar -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out delay-[170ms]"
          enter-from-class="opacity-0 -translate-x-2.5"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0 -translate-x-1"
        >
          <div
            v-if="item.checked"
            class="-ml-[1px] h-[1.5rem] w-3 rounded-l-none rounded-r-none border-y border-y-white/5 border-r-white/10 bg-[#161716]"
          />
        </Transition>

        <!-- Delete button -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out delay-300"
          enter-from-class="opacity-0 -translate-x-1 blur-[4px]"
          enter-to-class="opacity-100 translate-x-0 blur-0"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100 blur-0"
          leave-to-class="opacity-0 blur-[4px] -translate-x-2.5"
        >
          <div
            v-if="item.checked"
            class="inset-0 z-0 border-spacing-1 rounded-r-xl rounded-l-sm border-r-2 border-r-red-300/60 bg-[#161716]/80 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)] dark:bg-[#161716]/50"
          >
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              @click="handleRemove(item.id)"
            >
              <Trash
                class="h-4 w-4 text-red-400 transition-colors duration-150 fill-red-400/60"
              />
            </button>
          </div>
        </Transition>
      </div>
    </TransitionGroup>
  </div>
</template>
