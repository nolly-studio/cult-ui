<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Check, Copy, RefreshCw } from 'lucide-vue-next'
import ColorPicker from '../ui/color-picker'

type ColorScheme = Record<string, string>

const defaultColors: ColorScheme = {
  background: '0 0% 100%',
  foreground: '240 10% 3.9%',
  card: '0 0% 100%',
  'card-foreground': '240 10% 3.9%',
  popover: '0 0% 100%',
  'popover-foreground': '240 10% 3.9%',
  primary: '240 5.9% 10%',
  'primary-foreground': '0 0% 98%',
  secondary: '240 4.8% 95.9%',
  'secondary-foreground': '240 5.9% 10%',
  muted: '240 4.8% 95.9%',
  'muted-foreground': '240 3.8% 46.1%',
  accent: '240 4.8% 95.9%',
  'accent-foreground': '240 5.9% 10%',
  destructive: '0 84.2% 60.2%',
  'destructive-foreground': '0 0% 98%',
  border: '240 5.9% 90%',
  input: '240 5.9% 90%',
  ring: '240 5.9% 10%',
}

const colorScheme = reactive<ColorScheme>({ ...defaultColors })
const lockedColor = ref<string | null>(null)
const copied = ref(false)

function resetColors() {
  Object.assign(colorScheme, defaultColors)
  lockedColor.value = null
}

function toggleLock(key: string) {
  lockedColor.value = lockedColor.value === key ? null : key
}

function getContrastColor(color: string) {
  const lightness = parseFloat(color.split(' ')[2])
  return lightness > 50 ? '0 0% 0%' : '0 0% 100%'
}

function copyColorScheme() {
  const cssVariables = Object.entries(colorScheme)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n    ')
  const fullCss = `@layer base {\n  :root {\n    ${cssVariables}\n  }\n}`
  navigator.clipboard.writeText(fullCss)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="p-6 space-y-6">
      <div class="grid md:grid-cols-1 gap-6">
        <div class="space-y-4">
          <div class="flex flex-col md:flex-row gap-4 md:justify-between">
            <button class="inline-flex items-center rounded-md border px-4 py-2 text-sm" @click="resetColors">
              <RefreshCw class="w-4 h-4 mr-2" /> Reset Colors
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(value, key) in colorScheme" :key="key" class="relative">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-muted-foreground mb-2 block">{{ key }}</label>
              </div>
              <ColorPicker
                :color="`hsl(${value})`"
                @change="(newColor: string) => {
                  const match = newColor.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
                  colorScheme[key as string] = `${match[0].toFixed(1)} ${match[1].toFixed(1)}% ${match[2].toFixed(1)}%`
                }"
              />
            </div>
          </div>
        </div>
        <div
          class="w-full min-h-[24rem] rounded-lg p-6 shadow-lg transition-colors duration-300 ease-in-out overflow-hidden"
          :style="{
            backgroundColor: `hsl(${colorScheme.background})`,
            color: `hsl(${colorScheme.foreground})`,
            borderColor: `hsl(${colorScheme.border})`,
            borderWidth: '2px',
            borderStyle: 'solid',
          }"
        >
          <h3 class="text-xl font-semibold mb-4">Color Preview</h3>
          <p class="text-sm mb-4">Experience your color palette in action.</p>
          <div class="space-y-2">
            <div v-for="(value, key) in colorScheme" :key="key" class="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <span>{{ key }}</span>
              <button
                class="rounded-md border px-2 py-1 font-mono text-sm"
                :style="{
                  backgroundColor: `hsl(${value})`,
                  color: `hsl(${getContrastColor(value)})`,
                  borderColor: `hsl(${colorScheme.border})`,
                }"
                @click="navigator.clipboard.writeText(`--${key}: ${value};`)"
              >
                {{ value }}
                <component :is="copied ? Check : Copy" class="w-4 h-4 ml-2 inline-block" />
              </button>
            </div>
          </div>
        </div>
        <button class="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm" @click="copyColorScheme">
          Copy Full Color Scheme
        </button>
      </div>
    </div>
  </div>
</template>
