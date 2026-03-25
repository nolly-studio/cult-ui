<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Mail, Monitor, Moon, Sun } from 'lucide-vue-next'
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from '../ui/popover-form'

type FormState = 'idle' | 'loading' | 'success'

const timers: ReturnType<typeof setTimeout>[] = []
onUnmounted(() => timers.forEach(clearTimeout))

function scheduleTimeout(fn: () => void, ms: number) {
  timers.push(setTimeout(fn, ms))
}

// Feedback Form
const feedbackState = ref<FormState>('idle')
const feedbackOpen = ref(false)
const feedback = ref('')

function submitFeedback() {
  feedbackState.value = 'loading'
  scheduleTimeout(() => { feedbackState.value = 'success' }, 1500)
  scheduleTimeout(() => { feedbackOpen.value = false; feedbackState.value = 'idle'; feedback.value = '' }, 3300)
}

// Contact Form
const contactState = ref<FormState>('idle')
const contactOpen = ref(false)
const contactName = ref('')
const contactEmail = ref('')
const contactMessage = ref('')

function submitContact() {
  contactState.value = 'loading'
  scheduleTimeout(() => { contactState.value = 'success' }, 1500)
  scheduleTimeout(() => { contactOpen.value = false; contactState.value = 'idle'; contactName.value = ''; contactEmail.value = ''; contactMessage.value = '' }, 3300)
}

// Newsletter Form
const newsletterState = ref<FormState>('idle')
const newsletterOpen = ref(false)
const email = ref('')

function submitNewsletter() {
  newsletterState.value = 'loading'
  scheduleTimeout(() => { newsletterState.value = 'success' }, 1500)
  scheduleTimeout(() => { newsletterOpen.value = false; newsletterState.value = 'idle'; email.value = '' }, 3300)
}

// Theme Switcher
const themeOpen = ref(false)
const theme = ref<'light' | 'dark' | 'system'>('system')
const themes = ['light', 'dark', 'system'] as const
</script>

<template>
  <div class="space-y-8 grid grid-cols-1">
    <!-- Feedback Form -->
    <div class="flex w-full items-center justify-center">
      <PopoverForm
        title="Feedback"
        :open="feedbackOpen"
        :set-open="(v: boolean) => feedbackOpen = v"
        width="364px"
        height="192px"
        :show-close-button="feedbackState !== 'success'"
        :show-success="feedbackState === 'success'"
      >
        <template #openChild>
          <form @submit.prevent="feedback && submitFeedback()">
            <div class="relative">
              <textarea
                v-model="feedback"
                autofocus
                placeholder="Feedback"
                class="h-32 w-full resize-none rounded-t-lg p-3 text-sm outline-none"
                required
              />
            </div>
            <div class="relative flex h-12 items-center px-[10px]">
              <PopoverFormSeparator />
              <div class="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div class="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                <PopoverFormCutOutRightIcon />
              </div>
              <PopoverFormButton :loading="feedbackState === 'loading'" text="Submit" />
            </div>
          </form>
        </template>
        <template #successChild>
          <PopoverFormSuccess title="Feedback Received" description="Thank you for supporting our project!" />
        </template>
      </PopoverForm>
    </div>

    <!-- Contact Form -->
    <div class="flex w-full items-center justify-center">
      <PopoverForm
        title="Click Here"
        :open="contactOpen"
        :set-open="(v: boolean) => contactOpen = v"
        width="364px"
        height="372px"
        :show-close-button="contactState !== 'success'"
        :show-success="contactState === 'success'"
      >
        <template #openChild>
          <form class="space-y-4" @submit.prevent="contactName && contactEmail && contactMessage && submitContact()">
            <div class="px-4 pt-4">
              <label class="block text-sm font-medium text-muted-foreground mb-1">Name</label>
              <input v-model="contactName" type="text" class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none bg-white dark:bg-black" required />
            </div>
            <div class="px-4">
              <label class="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              <input v-model="contactEmail" type="email" class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none bg-white dark:bg-black" required />
            </div>
            <div class="px-4">
              <label class="block text-sm font-medium text-muted-foreground mb-1">Message</label>
              <textarea v-model="contactMessage" class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none bg-white dark:bg-black" :rows="3" required />
            </div>
            <div class="relative flex h-12 items-center px-[10px]">
              <PopoverFormSeparator />
              <div class="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div class="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                <PopoverFormCutOutRightIcon />
              </div>
              <PopoverFormButton :loading="contactState === 'loading'" text="Submit" />
            </div>
          </form>
        </template>
        <template #successChild>
          <PopoverFormSuccess title="Message Sent" description="Thank you for contacting us. We'll get back to you soon!" />
        </template>
      </PopoverForm>
    </div>

    <!-- Newsletter -->
    <div class="flex w-full items-center justify-center">
      <PopoverForm
        title="Newsletter Signup"
        :open="newsletterOpen"
        :set-open="(v: boolean) => newsletterOpen = v"
        width="320px"
        :show-close-button="newsletterState !== 'success'"
        :show-success="newsletterState === 'success'"
      >
        <template #openChild>
          <form class="p-4" @submit.prevent="email && submitNewsletter()">
            <div class="mb-4 space-y-2">
              <label class="block text-sm font-medium text-muted-foreground mb-1">Email address</label>
              <div class="relative">
                <input v-model="email" type="email" placeholder="you@example.com" class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none" required />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail class="text-muted-foreground size-4" />
                </div>
              </div>
              <p class="text-muted-foreground text-xs tracking-tight">Sick content to your mailbox every week!</p>
            </div>
            <PopoverFormButton :loading="newsletterState === 'loading'" text="Subscribe" />
          </form>
        </template>
        <template #successChild>
          <PopoverFormSuccess title="Successfully subscribed!" description="Thank you for joining our newsletter." />
        </template>
      </PopoverForm>
    </div>

    <!-- Theme Switcher -->
    <div class="flex w-full items-center justify-center">
      <PopoverForm
        title="Choose theme"
        :open="themeOpen"
        :set-open="(v: boolean) => themeOpen = v"
        width="200px"
        height="175px"
        :show-close-button="true"
        :show-success="false"
      >
        <template #openChild>
          <div class="p-2">
            <h3 class="text-sm tracking-tight text-muted-foreground">Theme</h3>
            <div class="pt-2 space-y-2">
              <button
                v-for="t in themes"
                :key="t"
                class="w-full flex items-center px-3 py-2 text-sm rounded-md"
                :class="theme === t ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                @click="theme = t"
              >
                <Sun v-if="t === 'light'" class="mr-2 h-4 w-4" />
                <Moon v-else-if="t === 'dark'" class="mr-2 h-4 w-4" />
                <Monitor v-else class="mr-2 h-4 w-4" />
                <span class="capitalize">{{ t }}</span>
              </button>
            </div>
          </div>
        </template>
      </PopoverForm>
    </div>
  </div>
</template>
