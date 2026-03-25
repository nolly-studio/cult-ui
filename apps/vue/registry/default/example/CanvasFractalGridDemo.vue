<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import { CanvasFractalGrid } from '../ui/canvas-fractal-grid'

const config = reactive({
  dotSize: 5,
  dotSpacing: 25,
  dotOpacity: 0.8,
  gradientAnimationDuration: 5,
  waveIntensity: 40,
  waveRadius: 250,
  dotColor: 'rgba(100, 200, 255, 0.2)',
  glowColor: 'rgba(100, 200, 255, 1)',
  enableNoise: true,
  noiseOpacity: 0.05,
  enableMouseGlow: false,
  initialPerformance: 'high' as const,
  gradients: [
    {
      stops: [
        { color: '#3498DB', position: 0 },
        { color: '#2980B9', position: 25 },
        { color: '#1ABC9C', position: 50 },
        { color: 'transparent', position: 75 },
      ],
      centerX: 30,
      centerY: 70,
    },
    {
      stops: [
        { color: '#16A085', position: 0 },
        { color: '#2980B9', position: 25 },
        { color: '#3498DB', position: 50 },
        { color: 'transparent', position: 75 },
      ],
      centerX: 70,
      centerY: 30,
    },
  ],
})

const isCopied = ref(false)

function copyConfigToClipboard() {
  const configString = `<CanvasFractalGrid v-bind="config" />`
  navigator.clipboard.writeText(configString).then(() => {
    isCopied.value = true
    setTimeout(() => (isCopied.value = false), 2000)
  })
}
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Configurable CanvasFractalGrid</h1>
    <div class="grid grid-cols-1 gap-8">
      <button class="ml-2 inline-flex items-center rounded-md border px-3 py-1.5 text-sm" @click="copyConfigToClipboard">
        <component :is="isCopied ? Check : Copy" class="h-4 w-4 mr-2" />
        {{ isCopied ? 'Copied!' : 'Copy Config' }}
      </button>
      <div class="overflow-hidden bg-white rounded-lg">
        <div class="h-[500px] w-full relative">
          <CanvasFractalGrid v-bind="config" />
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border bg-gradient-to-b from-primary/5 to-primary/5 p-6">
        <h3 class="text-lg font-semibold mb-4">Configuration</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">Dot Size: {{ config.dotSize }}</label>
            <input type="range" :min="1" :max="20" :step="1" v-model.number="config.dotSize" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium">Dot Spacing: {{ config.dotSpacing }}</label>
            <input type="range" :min="10" :max="50" :step="1" v-model.number="config.dotSpacing" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium">Dot Opacity: {{ config.dotOpacity }}</label>
            <input type="range" :min="0" :max="1" :step="0.1" v-model.number="config.dotOpacity" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium">Wave Intensity: {{ config.waveIntensity }}</label>
            <input type="range" :min="0" :max="100" :step="1" v-model.number="config.waveIntensity" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium">Wave Radius: {{ config.waveRadius }}</label>
            <input type="range" :min="50" :max="500" :step="10" v-model.number="config.waveRadius" class="w-full" />
          </div>
          <div class="flex items-center space-x-2">
            <input type="checkbox" id="cfgEnableNoise" v-model="config.enableNoise" />
            <label for="cfgEnableNoise" class="text-sm font-medium">Enable Noise</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="checkbox" id="cfgEnableMouseGlow" v-model="config.enableMouseGlow" />
            <label for="cfgEnableMouseGlow" class="text-sm font-medium">Enable Mouse Glow</label>
          </div>
          <div>
            <label class="text-sm font-medium">Performance</label>
            <select v-model="config.initialPerformance" class="w-full rounded border p-2 text-sm">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
