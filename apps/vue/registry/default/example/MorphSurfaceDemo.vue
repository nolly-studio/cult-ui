<script setup lang="ts">
import { ref } from 'vue'
import { HelpCircle } from 'lucide-vue-next'
import { MorphSurface } from '../ui/morph-surface'

const isControlledOpen = ref(false)

const handleSubmit = async (formData: FormData) => {
  const message = formData.get('message') as string
  console.log('Submitted message:', message)
  await new Promise((resolve) => setTimeout(resolve, 500))
}
</script>

<template>
  <div class="p-8 space-y-12">
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Default Usage</h2>
      <p class="text-sm text-muted-foreground">The component works out of the box with no configuration needed</p>
      <div class="flex justify-center items-center min-h-[300px] rounded-lg p-8">
        <MorphSurface />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Custom Labels &amp; Content</h2>
      <p class="text-sm text-muted-foreground">Customize trigger label, placeholder, and submit behavior</p>
      <div class="flex justify-center items-center min-h-[300px] rounded-lg p-8">
        <MorphSurface
          trigger-label="Send Feedback"
          placeholder="Share your thoughts..."
          :on-submit="handleSubmit"
          :on-success="() => console.log('Feedback submitted successfully!')"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Custom Dimensions</h2>
      <p class="text-sm text-muted-foreground">Adjust the size when collapsed and expanded</p>
      <div class="flex justify-center items-center min-h-[300px] rounded-lg p-8">
        <MorphSurface
          collapsed-width="auto"
          :collapsed-height="48"
          :expanded-width="400"
          :expanded-height="250"
          trigger-label="Custom Size"
          placeholder="This surface is larger..."
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Controlled State</h2>
      <p class="text-sm text-muted-foreground">Control the open/close state externally</p>
      <div class="flex flex-col items-center gap-12 min-h-[300px] rounded-lg p-8">
        <button
          type="button"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          @click="isControlledOpen = !isControlledOpen"
        >
          {{ isControlledOpen ? 'Close' : 'Open' }} Morph Surface
        </button>
        <MorphSurface
          :is-open="isControlledOpen"
          :on-open-change="(val: boolean) => isControlledOpen = val"
          trigger-label="Controlled"
          placeholder="This surface is controlled externally..."
          :on-submit="handleSubmit"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Custom Animation Speed</h2>
      <p class="text-sm text-muted-foreground">Speed up or slow down animations (higher values = slower animations)</p>
      <div class="flex justify-center items-center min-h-[300px] rounded-lg p-8">
        <MorphSurface
          :animation-speed="2"
          trigger-label="Slow Animation"
          placeholder="Animations are slower..."
        />
      </div>
    </section>
  </div>
</template>
