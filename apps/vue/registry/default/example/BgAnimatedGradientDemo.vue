<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Check, Copy, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { GradientAnimation } from '../ui/bg-animated-gradient'

type GradientStop = { color: string; position: number }
type Gradient = { stops: GradientStop[]; centerX: number; centerY: number }

const config = reactive({
  animationDuration: 5,
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
  ] as Gradient[],
})

const isCopied = ref(false)

function addGradient() {
  config.gradients.push({
    stops: [
      { color: '#000000', position: 0 },
      { color: '#FFFFFF', position: 100 },
    ],
    centerX: 50,
    centerY: 50,
  })
}

function removeGradient(index: number) {
  config.gradients.splice(index, 1)
}

function addStop(gradientIndex: number) {
  config.gradients[gradientIndex].stops.push({ color: '#000000', position: 100 })
}

function removeStop(gradientIndex: number, stopIndex: number) {
  config.gradients[gradientIndex].stops.splice(stopIndex, 1)
}

function copyConfigToClipboard() {
  const configString = `<GradientAnimation :animation-duration="${config.animationDuration}" :gradients='${JSON.stringify(config.gradients)}' />`
  navigator.clipboard.writeText(configString).then(() => {
    isCopied.value = true
    setTimeout(() => (isCopied.value = false), 2000)
  })
}
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Configurable GradientAnimation</h1>
    <div class="grid grid-cols-1 gap-8">
      <button class="ml-2 inline-flex items-center rounded-md border px-3 py-1.5 text-sm" @click="copyConfigToClipboard">
        <component :is="isCopied ? Check : Copy" class="h-4 w-4 mr-2" />
        {{ isCopied ? 'Copied!' : 'Copy Config' }}
      </button>
      <div class="overflow-hidden bg-white rounded-lg">
        <div class="h-[500px] w-full relative">
          <GradientAnimation :animation-duration="config.animationDuration" :gradients="config.gradients" />
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border bg-gradient-to-b from-primary/5 to-primary/5 p-6">
        <h3 class="text-lg font-semibold mb-4">Configuration</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">Animation Duration: {{ config.animationDuration }}</label>
            <input type="range" :min="1" :max="30" :step="1" v-model.number="config.animationDuration" class="w-full" />
          </div>
          <div v-for="(gradient, gi) in config.gradients" :key="gi" class="rounded-lg border p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="font-medium">Gradient {{ gi + 1 }}</h4>
              <button class="text-destructive text-sm" @click="removeGradient(gi)">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm">Center X: {{ gradient.centerX }}</label>
                <input type="range" :min="0" :max="100" :step="1" v-model.number="gradient.centerX" class="w-full" />
              </div>
              <div>
                <label class="text-sm">Center Y: {{ gradient.centerY }}</label>
                <input type="range" :min="0" :max="100" :step="1" v-model.number="gradient.centerY" class="w-full" />
              </div>
            </div>
            <div v-for="(stop, si) in gradient.stops" :key="si" class="flex items-center space-x-2">
              <input type="color" :value="stop.color" class="w-16 h-10" @input="(e: Event) => stop.color = (e.target as HTMLInputElement).value" />
              <input type="range" :min="0" :max="100" :step="1" v-model.number="stop.position" class="flex-grow" />
              <button class="rounded border p-1" @click="removeStop(gi, si)">
                <Minus class="h-4 w-4" />
              </button>
            </div>
            <button class="inline-flex items-center rounded border px-3 py-1 text-sm" @click="addStop(gi)">
              <Plus class="h-4 w-4 mr-2" /> Add Stop
            </button>
          </div>
          <button class="w-full inline-flex items-center justify-center rounded border px-3 py-2 text-sm" @click="addGradient">
            <Plus class="h-4 w-4 mr-2" /> Add Gradient
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
