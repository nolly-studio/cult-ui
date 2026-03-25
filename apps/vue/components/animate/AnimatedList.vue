<script setup lang="ts">
import { ref, computed } from "vue"
import { cn } from "@/lib/utils"

interface Item {
  text: string
  checked: boolean
  id: number
  description: string
}

interface Props {
  initialItems?: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  initialItems: () => [
    { text: "Scrape", checked: false, id: 1, description: "Collecting and preparing data for training." },
    { text: "Process", checked: false, id: 2, description: "Cleaning and transforming data for the model." },
    { text: "Refine", checked: false, id: 3, description: "Training the AI model with the prepared data." },
    { text: "Send to user", checked: false, id: 5, description: "Deploying the trained model for real-world use." },
  ],
})

const items = ref<Item[]>([...props.initialItems])
const openItemId = ref<number | null>(null)

function handleCompleteItem(id: number) {
  items.value = items.value.map((item) =>
    item.id === id ? { ...item, checked: !item.checked } : item
  )
}

function handleAddItem() {
  items.value = [
    ...items.value,
    {
      text: `Item ${items.value.length + 1}`,
      checked: false,
      id: Date.now(),
      description: "",
    },
  ]
}

function handleResetItems() {
  items.value = [...props.initialItems]
}

function handleRemoveItem(id: number) {
  items.value = items.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="mb-9">
    <div class="overflow-auto p-4">
      <div class="flex flex-col space-y-2">
        <div class="flex items-center justify-between gap-4">
          <button
            class="flex items-center gap-1 rounded-md border border-black/10 p-2 disabled:opacity-50"
            :disabled="items.length > 5"
            @click="handleAddItem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-neutral-100 text-neutral-800">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            New stage
          </button>
          <button @click="handleResetItems">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-neutral-100 text-neutral-800">
              <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </button>
        </div>

        <TransitionGroup name="list" tag="div" class="flex flex-col">
          <div
            v-for="item in items"
            :key="item.id"
            class="my-1 flex w-full items-center justify-between gap-2"
          >
            <div class="flex w-full items-center gap-0">
              <div
                :class="cn(
                  'relative z-auto grow',
                  'shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]',
                  item.checked ? 'cursor-not-allowed' : 'cursor-grab',
                  'h-full rounded-2xl border border-white/10 bg-[#141712]',
                  item.checked ? 'w-7/10' : 'w-full'
                )"
              >
                <div class="z-20">
                  <div class="flex items-center gap-4">
                    <div
                      v-if="openItemId !== item.id"
                      class="flex w-full items-center gap-4 p-1"
                    >
                      <input
                        type="checkbox"
                        :checked="item.checked"
                        class="ml-3 size-5 rounded-md border-neutral-400/80 bg-black"
                        @change="handleCompleteItem(item.id)"
                      />
                      <span class="w-full px-1 text-lg tracking-tight text-neutral-300/90">
                        {{ item.text }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delete button when checked -->
              <Transition name="slide-in">
                <div
                  v-if="item.checked"
                  class="inset-0 z-0 rounded-r-xl border-y border-r-2 border-y-white/10 border-r-red-300 bg-[#141712]/80"
                >
                  <button
                    class="group inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors duration-150 hover:bg-[#141712] hover:text-red-500"
                    @click="handleRemoveItem(item.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 text-red-400 transition-colors duration-150 group-hover:fill-red-400/60">
                      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.3s ease;
}
.list-leave-active {
  transition: all 0.15s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.list-move {
  transition: transform 0.3s ease;
}

.slide-in-enter-active {
  transition: all 0.2s ease;
  transition-delay: 0.17s;
}
.slide-in-leave-active {
  transition: all 0.1s ease;
}
.slide-in-enter-from {
  opacity: 0;
  transform: translateX(-5px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}
</style>
