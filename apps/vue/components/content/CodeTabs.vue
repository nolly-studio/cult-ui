<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  tabs: Array<{ label: string; value: string }>
}>()

const active = ref(props.tabs?.[0]?.value ?? '')
</script>

<template>
  <div class="code-tabs">
    <div class="code-tabs-list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        role="tab"
        :aria-selected="active === tab.value"
        :class="['code-tabs-trigger', { active: active === tab.value }]"
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
    >
      <ContentSlot :use="$slots[tab.value]" />
    </div>
  </div>
</template>
