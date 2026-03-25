<script setup lang="ts">
import { ref } from 'vue'
import { Plus, RepeatIcon } from 'lucide-vue-next'
import SortableList from '../ui/sortable-list'

interface Item {
  text: string
  checked: boolean
  id: number
  description: string
}

const initialState: Item[] = [
  { text: 'Gather Data', checked: false, id: 1, description: 'Collect relevant marketing copy from the user\'s website and competitor sites.' },
  { text: 'Analyze Copy', checked: false, id: 2, description: 'Analyze the collected marketing copy for clarity, persuasiveness, and alignment.' },
  { text: 'Create Suggestions', checked: false, id: 3, description: 'Create alternative versions of the marketing copy that address weaknesses.' },
  { text: 'Recommendations', checked: false, id: 5, description: 'Present the AI-generated marketing copy suggestions to the user.' },
]

const items = ref<Item[]>([...initialState])

const handleCompleteItem = (id: number) => {
  items.value = items.value.map((item) =>
    item.id === id ? { ...item, checked: !item.checked } : item
  )
}

const handleAddItem = () => {
  items.value = [
    ...items.value,
    { text: `Item ${items.value.length + 1}`, checked: false, id: Date.now(), description: '' },
  ]
}

const handleResetItems = () => {
  items.value = [...initialState]
}
</script>

<template>
  <div class="md:px-4 w-full max-w-xl">
    <div class="mb-9 rounded-2xl p-2 shadow-sm md:p-6 bg-black">
      <div class="overflow-auto p-1 md:p-4">
        <div class="flex flex-col space-y-2">
          <div>
            <h3 class="text-neutral-200">Agent workflow</h3>
            <a class="text-xs text-white/80" href="https://www.uilabs.dev/" target="_blank" rel="noopener noreferrer">
              Inspired by <span class="text-[#13EEE3]">@mrncst</span>
            </a>
          </div>
          <div class="flex items-center justify-between gap-4 py-2">
            <button :disabled="items.length > 5" @click="handleAddItem">
              <Plus class="h-5 w-5 text-neutral-500/80 hover:text-white/80" />
            </button>
            <button @click="handleResetItems">
              <RepeatIcon class="h-4 w-4 text-neutral-500/80 hover:text-white/80" />
            </button>
          </div>
          <SortableList
            :items="items"
            @update:items="items = $event"
            :on-complete-item="handleCompleteItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
