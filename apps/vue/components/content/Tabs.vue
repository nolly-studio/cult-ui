<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  default?: string
  tabs: Array<{ label: string; value: string }>
  variant?: 'default' | 'code'
}>()

const active = ref(props.default ?? props.tabs?.[0]?.value ?? '')
</script>

<template>
  <div :class="variant === 'code' ? 'code-tabs' : 'tabs'">
    <div :class="variant === 'code' ? 'code-tabs-list' : 'tabs-list flex gap-2 border-b'" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        role="tab"
        :aria-selected="active === tab.value"
        :class="variant === 'code'
          ? ['code-tabs-trigger', { active: active === tab.value }]
          : ['tabs-trigger px-3 py-1.5 text-sm', { 'border-b-2 border-primary font-medium': active === tab.value }]"
        @click="active = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-for="tab in tabs"
      :key="tab.value"
      v-show="active === tab.value"
      role="tabpanel"
      :class="variant === 'code' ? '' : 'pt-4'"
    >
      <ContentSlot :use="$slots[tab.value]" />
    </div>
  </div>
</template>
