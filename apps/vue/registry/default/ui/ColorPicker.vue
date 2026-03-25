<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check, ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  color: string
}>()

const emit = defineEmits<{
  'update:color': [color: string]
}>()

const hsl = ref<[number, number, number]>([0, 0, 0])
const colorInput = ref(props.color)
const isOpen = ref(false)

const colorPresets = [
  '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF',
  '#5856D6', '#FF2D55', '#8E8E93', '#EFEFF4', '#E5E5EA', '#D1D1D6',
]

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [0, 0, 0]

  const r = parseInt(result[1], 16) / 255
  const g = parseInt(result[2], 16) / 255
  const b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function normalizeColor(color: string): string {
  if (color.startsWith('#')) return color.toUpperCase()
  if (color.startsWith('hsl')) {
    const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
  }
  return color
}

function trimColorString(color: string, maxLength = 20): string {
  if (color.length <= maxLength) return color
  return `${color.slice(0, maxLength - 3)}...`
}

function handleColorChange(newColor: string) {
  const normalizedColor = normalizeColor(newColor)
  colorInput.value = normalizedColor

  let h: number, s: number, l: number
  if (normalizedColor.startsWith('#')) {
    ;[h, s, l] = hexToHsl(normalizedColor)
  } else {
    ;[h, s, l] = normalizedColor.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]
  }
  hsl.value = [h, s, l]
  emit('update:color', `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`)
}

function handleHueChange(event: Event) {
  const hue = Number((event.target as HTMLInputElement).value)
  hsl.value = [hue, hsl.value[1], hsl.value[2]]
  handleColorChange(`hsl(${hue}, ${hsl.value[1]}%, ${hsl.value[2]}%)`)
}

function handleSaturationLightnessChange(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const s = Math.round((x / rect.width) * 100)
  const l = Math.round(100 - (y / rect.height) * 100)
  hsl.value = [hsl.value[0], s, l]
  handleColorChange(`hsl(${hsl.value[0]}, ${s}%, ${l}%)`)
}

function handleColorInputChange(event: Event) {
  const newColor = (event.target as HTMLInputElement).value
  colorInput.value = newColor
  if (/^#[0-9A-Fa-f]{6}$/.test(newColor) || /^hsl\(\d+,\s*\d+%,\s*\d+%\)$/.test(newColor)) {
    handleColorChange(newColor)
  }
}

watch(() => props.color, (val) => handleColorChange(val))
</script>

<template>
  <div class="relative inline-block">
    <button
      class="w-[200px] justify-start text-left font-normal inline-flex items-center border rounded-md px-3 py-2 text-sm"
      @click="isOpen = !isOpen"
    >
      <div
        class="w-4 h-4 rounded-full mr-2 shadow-sm"
        :style="{ backgroundColor: colorInput }"
      />
      <span class="flex-grow">{{ trimColorString(colorInput) }}</span>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-[240px] p-3 rounded-md border bg-popover shadow-md space-y-3"
    >
      <!-- Saturation/Lightness picker -->
      <div
        class="w-full h-40 rounded-lg cursor-crosshair relative overflow-hidden"
        :style="{
          background: `
            linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
            linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 0, 0, 0)),
            hsl(${hsl[0]}, 100%, 50%)
          `,
        }"
        @click="handleSaturationLightnessChange"
      >
        <div
          class="w-4 h-4 rounded-full border-2 border-white absolute shadow-md"
          :style="{
            left: `${hsl[1]}%`,
            top: `${100 - hsl[2]}%`,
            backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
          }"
        />
      </div>

      <!-- Hue slider -->
      <input
        type="range"
        min="0"
        max="360"
        :value="hsl[0]"
        class="w-full h-3 rounded-full appearance-none cursor-pointer"
        :style="{
          background: `linear-gradient(to right,
            hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
            hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
          )`,
        }"
        @input="handleHueChange"
      />

      <!-- Color input -->
      <div class="flex items-center space-x-2">
        <input
          type="text"
          :value="colorInput"
          class="flex-grow bg-white border border-gray-300 rounded-md text-sm h-8 px-2"
          placeholder="#RRGGBB or hsl(h, s%, l%)"
          @input="handleColorInputChange"
        />
        <div
          class="w-8 h-8 rounded-md shadow-sm"
          :style="{ backgroundColor: colorInput }"
        />
      </div>

      <!-- Presets -->
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="preset in colorPresets"
          :key="preset"
          class="w-8 h-8 rounded-full relative hover:scale-110 active:scale-90 transition-transform"
          :style="{ backgroundColor: preset }"
          @click="handleColorChange(preset)"
        >
          <Check
            v-if="colorInput === preset"
            class="w-4 h-4 text-white absolute inset-0 m-auto"
          />
        </button>
      </div>
    </div>

    <!-- Click outside to close -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    />
  </div>
</template>
