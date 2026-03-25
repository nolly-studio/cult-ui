<script setup lang="ts">
import { ref } from 'vue'
import { TextGif } from '../ui/text-gif'

const text = ref('TextGif')
const size = ref('xl')
const weight = ref('bold')

const gifUrls = [
  'https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif',
  'https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif',
  'https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif',
  'https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif',
]

const selectedGif = ref(gifUrls[0])
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
    <div class="flex items-center justify-center p-12 bg-white dark:bg-black rounded-xl">
      <TextGif :gif-url="selectedGif" :text="text" :size="size as any" :weight="weight as any" />
    </div>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <label class="text-sm font-medium">Text</label>
        <input v-model="text" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Enter text" />
      </div>
      <div class="space-y-4">
        <label class="text-sm font-medium">GIF Background</label>
        <select v-model="selectedGif" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option v-for="(gif, index) in gifUrls" :key="index" :value="gif">GIF {{ index + 1 }}</option>
        </select>
      </div>
      <div class="space-y-4">
        <label class="text-sm font-medium">Text Size</label>
        <select v-model="size" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option v-for="s in ['sm', 'md', 'lg', 'xl', 'xxl']" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="space-y-4">
        <label class="text-sm font-medium">Font Weight</label>
        <select v-model="weight" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option v-for="w in ['normal', 'medium', 'semi', 'bold']" :key="w" :value="w">{{ w }}</option>
        </select>
      </div>
    </div>
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Examples</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
          <TextGif :gif-url="gifUrls[1]" text="Headings" size="xl" weight="bold" />
        </div>
        <div class="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
          <TextGif :gif-url="gifUrls[2]" text="$49" size="xxl" weight="bold" />
          <p class="text-sm mt-2">per month</p>
        </div>
      </div>
    </div>
  </div>
</template>
