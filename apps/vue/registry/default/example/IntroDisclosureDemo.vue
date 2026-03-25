<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { IntroDisclosure } from '../ui/intro-disclosure'

const steps = [
  {
    title: 'Welcome to Cult UI',
    short_description: 'Discover our modern component library',
    full_description:
      'Welcome to Cult UI! Let\'s explore how our beautifully crafted components can help you build stunning user interfaces with ease.',
    media: { type: 'image' as const, src: '/feature-3.png', alt: 'Cult UI components overview' },
  },
  {
    title: 'Customizable Components',
    short_description: 'Style and adapt to your needs',
    full_description:
      'Every component is built with customization in mind. Use our powerful theming system with Tailwind CSS to match your brand perfectly.',
    media: { type: 'image' as const, src: '/feature-2.png', alt: 'Component customization interface' },
    action: { label: 'View Theme Builder', href: '/docs/theming' },
  },
  {
    title: 'Responsive & Accessible',
    short_description: 'Built for everyone',
    full_description:
      'All components are fully responsive and follow WAI-ARIA guidelines, ensuring your application works seamlessly across all devices and is accessible to everyone.',
    media: { type: 'image' as const, src: '/feature-1.png', alt: 'Responsive design demonstration' },
  },
  {
    title: 'Start Building',
    short_description: 'Create your next project',
    full_description:
      'You\'re ready to start building! Check out our comprehensive documentation and component examples to create your next amazing project.',
    action: { label: 'View Components', href: '/docs/components' },
  },
]

const open = ref(true)
const openMobile = ref(true)
const debugOpen = ref(false)
const storageState = ref({ desktop: null as string | null, mobile: null as string | null })

function updateStorageState() {
  storageState.value = {
    desktop: localStorage.getItem('feature_intro-demo_desktop'),
    mobile: localStorage.getItem('feature_intro-demo_mobile'),
  }
}

function handleReset() {
  open.value = true
  if (storageState.value.desktop === 'false') {
    debugOpen.value = true
  }
  if (storageState.value.desktop === null) {
    updateStorageState()
  }
}

function handleResetMobile() {
  openMobile.value = true
  updateStorageState()
}

function handleClearDesktop() {
  localStorage.removeItem('feature_intro-demo_desktop')
  updateStorageState()
}

function handleClearMobile() {
  localStorage.removeItem('feature_intro-demo_mobile')
  updateStorageState()
}

onMounted(() => {
  updateStorageState()
  window.addEventListener('storage', updateStorageState)
})

onUnmounted(() => {
  window.removeEventListener('storage', updateStorageState)
})
</script>

<template>
  <div class="w-full space-y-8">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <h2 class="text-2xl font-semibold leading-none tracking-tight mb-4">IntroDisclosure Demo</h2>
        <p class="text-muted-foreground mb-6">
          Experience our feature introduction component in both desktop and mobile variants.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-0">
        <div class="flex flex-col">
          <div :class="cn('flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors', !open && 'border-muted bg-muted/50', open && 'border-primary')">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div class="flex flex-col">
                <p class="text-sm text-muted-foreground text-left">(Disclosure)</p>
                <h3 class="text-xl font-semibold">Desktop View</h3>
              </div>
              <button class="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" @click="handleReset">
                Start Demo
              </button>
            </div>
            <IntroDisclosure
              :open="open"
              :steps="steps"
              feature-id="intro-demo"
              :show-progress-bar="false"
              @update:open="open = $event"
            />
            <div class="text-sm text-muted-foreground">
              Status: {{ open ? 'Active' : 'Completed/Skipped' }}
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div :class="cn('flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors', !openMobile && 'border-muted bg-muted/50', openMobile && 'border-primary')">
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div class="flex flex-col">
                <p class="text-sm text-muted-foreground">(Drawer + Swipe)</p>
                <h3 class="text-xl font-semibold">Mobile View</h3>
              </div>
              <button class="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" @click="handleResetMobile">
                Start Demo
              </button>
            </div>
            <IntroDisclosure
              :open="openMobile"
              :steps="steps"
              feature-id="intro-demo"
              force-variant="mobile"
              @update:open="openMobile = $event"
            />
            <div class="text-sm text-muted-foreground">
              Status: {{ openMobile ? 'Active' : 'Completed/Skipped' }}
            </div>
          </div>
        </div>
      </div>

      <div class="border-t p-4">
        <button class="flex w-full items-center justify-between rounded-lg p-2 text-sm hover:bg-muted/50" @click="debugOpen = !debugOpen">
          <div class="flex flex-col items-start text-left">
            <h4 class="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              Browser Local Storage State
            </h4>
          </div>
          <ChevronDown :class="cn('size-8 transition-transform duration-200', debugOpen && 'rotate-180')" />
        </button>
        <div v-if="debugOpen" class="space-y-2">
          <div class="rounded-md bg-muted p-4 text-sm space-y-4">
            <div class="flex items-center justify-between gap-4">
              <div class="flex-1">
                <span class="text-muted-foreground">Desktop State: </span>
                <code class="rounded bg-background px-2 py-1">{{ storageState.desktop ?? 'null' }}</code>
              </div>
              <button class="rounded-md border px-3 py-1 text-sm" @click="handleClearDesktop">Reset Local Storage</button>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="flex-1">
                <span class="text-muted-foreground">Mobile State: </span>
                <code class="rounded bg-background px-2 py-1">{{ storageState.mobile ?? 'null' }}</code>
              </div>
              <button class="rounded-md border px-3 py-1 text-sm" @click="handleClearMobile">Reset Local Storage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
