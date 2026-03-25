<script setup lang="ts">
import { ref } from 'vue'
import {
  BookOpen,
  Code2,
  Download,
} from 'lucide-vue-next'
import { Onboarding } from '../ui/onboarding'

const open = ref(false)

const FEATURES = [
  { id: 'source-code', icon: Code2, title: 'Full Stack Source Code', description: 'Browse and copy the complete source code for every pattern directly from the Source Code tab.', image: '/component-images/onboarding/onboarding-source-code.png' },
  { id: 'skills', icon: BookOpen, title: 'Copy Skills & Critical Files', description: 'Copy agent skills and critical files to supercharge your AI-powered workflows.', image: '/component-images/onboarding/onboarding-skills.png' },
  { id: 'download', icon: Download, title: 'Download as Next.js App', description: 'Download any pattern as a fully working Next.js application, ready to run locally.', image: '/component-images/onboarding/onboarding-nextjs.png' },
]

const TIPS = [
  { number: 1, text: 'Browse patterns by use case to find the right agent architecture for your project.' },
  { number: 2, text: 'Use the Download as Next.js App button to get a fully working local project in seconds.' },
  { number: 3, text: 'Copy skills and critical files to quickly skill up claude code and cursor.' },
]
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <button
      class="h-10 rounded-md border border-input bg-transparent px-4 text-sm font-medium hover:bg-accent"
      @click="open = true"
    >
      Open Headless Onboarding
    </button>

    <Onboarding
      v-if="open"
      :total-steps="3"
      :max-step-value="FEATURES.length - 1"
      :features="FEATURES"
      :tips="TIPS"
      @complete="open = false"
      @close="open = false"
    />
  </div>
</template>
