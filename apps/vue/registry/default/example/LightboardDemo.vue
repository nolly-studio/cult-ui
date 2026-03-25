<script setup lang="ts">
import { ref } from 'vue'
import { LightBoard, type PatternCell } from '../ui/lightboard'

const controlledDrawState = ref<PatternCell>('2')
const controlledHoverState = ref(false)

function cycleDrawState() {
  const map: Record<string, PatternCell> = { '0': '1', '1': '2', '2': '3', '3': '0' }
  controlledDrawState.value = map[controlledDrawState.value] || '0'
}
</script>

<template>
  <div class="space-y-2 lg:space-y-4 p-2 lg:p-8">
    <h1 class="text-3xl font-bold text-white">LightBoard Demo</h1>

    <div class="max-w-2xl w-full">
      <h2 class="text-xl font-semibold mb-3">Controlled LightBoard with draw support</h2>
      <p class="mb-3">Try drawing on this board by clicking and dragging.</p>
      <div class="flex space-x-4 mb-3">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" @click="cycleDrawState">
          Draw Color: {{ controlledDrawState }}
        </button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm" @click="controlledHoverState = !controlledHoverState">
          Toggle Scroll: {{ controlledHoverState ? 'On' : 'Off' }}
        </button>
      </div>
      <div class="bg-neutral-900 dark:bg-background">
        <LightBoard
          :rows="12"
          :light-size="6"
          :gap="2"
          text="CONTROLLED BOARD"
          font="default"
          :disable-drawing="false"
          :update-interval="150"
          :colors="{ background: '#0a0a0a', textDim: '#555555', drawLine: '#E78AEA', textBright: '#FFFFFF' }"
          :controlled-draw-state="controlledDrawState"
          :controlled-hover-state="controlledHoverState"
          @update:draw-state="controlledDrawState = $event"
          @update:hover-state="controlledHoverState = $event"
        />
      </div>
    </div>

    <h2 class="text-xl font-semibold mb-3">Drawing disabled</h2>

    <div class="max-w-md w-full bg-black">
      <LightBoard
        text="Hello World"
        :rows="7"
        :gap="1"
        :light-size="4"
        font="default"
        :update-interval="150"
        :colors="{ background: '#1a1a1a', textDim: '#3a3a3a', drawLine: '#7a7a7a', textBright: '#ffffff' }"
      />
    </div>

    <div class="max-w-lg w-full bg-black">
      <LightBoard
        text="DANGER ZONE"
        :rows="10"
        :gap="1"
        :light-size="5"
        font="default"
        :update-interval="100"
        :colors="{ background: '#1a0000', textDim: '#4a0000', drawLine: '#8a0000', textBright: '#ff0000' }"
      />
    </div>

    <div class="max-w-xl w-full bg-black">
      <LightBoard
        :rows="15"
        :light-size="2"
        :gap="1"
        text="Colors of the Rainbow"
        font="default"
        :update-interval="200"
        :colors="{ background: '#1a1a1a', textDim: '#ff9999', drawLine: '#ffff99', textBright: '#99ffff' }"
      />
    </div>

    <div class="w-full bg-black">
      <LightBoard
        :rows="20"
        :light-size="3"
        :gap="1"
        text="THE MATRIX HAS YOU"
        font="default"
        :update-interval="50"
        :colors="{ background: '#001a00', textDim: '#006600', drawLine: '#00b300', textBright: '#00ff00' }"
      />
    </div>

    <div class="max-w-2xl w-full bg-black">
      <LightBoard
        :rows="12"
        :light-size="4"
        :gap="2"
        text="NEON DREAMS"
        font="default"
        :update-interval="150"
        :colors="{ background: '#0a0a0a', textDim: '#ff00ff33', drawLine: '#ff00ff66', textBright: '#ff00ffff' }"
      />
    </div>

    <h2 class="text-xl font-semibold mb-3">sketchpad</h2>
    <p class="mb-3">Try drawing on this board by clicking and dragging.</p>

    <div class="bg-neutral-900 dark:bg-background mb-2">
      <LightBoard
        :rows="22"
        :light-size="6"
        :gap="2"
        text=""
        font="default"
        :disable-drawing="false"
        :update-interval="150"
        :colors="{ drawLine: '#6CF2E8' }"
        :controlled-draw-state="controlledDrawState"
        :controlled-hover-state="true"
        @update:draw-state="controlledDrawState = $event"
        @update:hover-state="controlledHoverState = $event"
      />
    </div>
  </div>
</template>
