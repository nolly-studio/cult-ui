<script setup lang="ts">
import { ref } from 'vue'
import NeumorphButton from '../ui/neumorph-button'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}
</script>

<template>
  <div class="space-y-8 p-4">
    <div>
      <h2 class="text-lg font-semibold mb-2">Button Variants</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NeumorphButton>Default</NeumorphButton>
        <NeumorphButton intent="primary">Primary</NeumorphButton>
        <NeumorphButton intent="secondary">Secondary</NeumorphButton>
        <NeumorphButton intent="danger">Danger</NeumorphButton>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold mb-2">Button Sizes</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <NeumorphButton size="small">Small</NeumorphButton>
        <NeumorphButton size="medium">Medium</NeumorphButton>
        <NeumorphButton size="large">Large</NeumorphButton>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold mb-2">Full Width Button</h2>
      <NeumorphButton :full-width="true">Full Width</NeumorphButton>
    </div>
    <div>
      <h2 class="text-lg font-semibold mb-2">Disabled Buttons</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NeumorphButton :disabled="true">Disabled Default</NeumorphButton>
        <NeumorphButton intent="primary" :disabled="true">Disabled Primary</NeumorphButton>
        <NeumorphButton intent="secondary" :disabled="true">Disabled Secondary</NeumorphButton>
        <NeumorphButton intent="danger" :disabled="true">Disabled Danger</NeumorphButton>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold mb-2">Hover and Active Effects</h2>
      <p class="text-sm text-gray-600 mb-2">Hover over and click these buttons to see the animations.</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NeumorphButton>Animate Me</NeumorphButton>
        <NeumorphButton intent="primary">Animate Me</NeumorphButton>
        <NeumorphButton intent="secondary">Animate Me</NeumorphButton>
        <NeumorphButton intent="danger">Animate Me</NeumorphButton>
      </div>
    </div>
    <div>
      <h2 class="text-lg font-semibold mb-2">Loading State</h2>
      <p class="text-sm text-gray-600 mb-2">Click the button to see the loading animation.</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NeumorphButton intent="primary" :loading="loading" @click="handleClick">
          {{ loading ? 'Loading...' : 'Click to Load' }}
        </NeumorphButton>
      </div>
    </div>
  </div>
</template>
