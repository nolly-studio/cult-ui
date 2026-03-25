<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

interface Tab {
  id: number
  label: string
}

interface Props {
  tabs: Tab[]
  class?: string
  rounded?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ change: [] }>()

const activeTab = ref(0)
const direction = ref(0)
const isAnimating = ref(false)

const content = computed(() => activeTab.value)

function handleTabClick(newTabId: number) {
  if (newTabId !== activeTab.value && !isAnimating.value) {
    direction.value = newTabId > activeTab.value ? 1 : -1
    activeTab.value = newTabId
    emit('change')
  }
}
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div
      :class="cn(
        'flex space-x-1 border border-none rounded-full cursor-pointer bg-neutral-600 px-[3px] py-[3.2px] shadow-inner-shadow',
        props.class,
        props.rounded
      )"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="cn(
          'relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-200 transition focus-visible:outline-1 focus-visible:ring-1 focus-visible:outline-none flex gap-2 items-center',
          activeTab === tab.id
            ? 'text-white'
            : 'hover:text-neutral-300/60 text-neutral-200/80',
          props.rounded
        )"
        :style="{ WebkitTapHighlightColor: 'transparent' }"
        @click="handleTabClick(tab.id)"
      >
        <span
          v-if="activeTab === tab.id"
          class="absolute inset-0 z-10 bg-neutral-700 mix-blend-difference shadow-inner-shadow border border-white/10"
          :style="props.rounded ? { borderRadius: '9px' } : { borderRadius: '9999px' }"
        />
        {{ tab.label }}
      </button>
    </div>

    <div class="relative mx-auto w-full h-full overflow-hidden">
      <div class="p-1">
        <slot :name="`tab-${activeTab}`" />
        <slot :active-tab="activeTab" />
      </div>
    </div>
  </div>
</template>
