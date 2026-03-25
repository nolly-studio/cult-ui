<script setup lang="ts">
import { Pause, Play, RotateCcw } from 'lucide-vue-next'
import {
  Timer,
  TimerDisplay,
  TimerIcon,
  TimerRoot,
  useTimer,
} from '../ui/timer'

const { formattedTime, isRunning, start, stop, reset } = useTimer({ format: 'MM:SS' })
</script>

<template>
  <div class="space-y-8 p-6">
    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Basic Timer</h3>
        <Timer :loading="true" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Variants</h3>
        <div class="flex gap-4 flex-wrap">
          <Timer variant="default" :loading="true" />
          <Timer variant="outline" :loading="true" />
          <Timer variant="ghost" :loading="true" />
          <Timer variant="destructive" :loading="true" />
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <Timer size="sm" :loading="true" />
          <Timer size="md" :loading="true" />
          <Timer size="lg" :loading="true" />
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Compound Components</h3>
        <TimerRoot variant="outline" size="lg">
          <TimerIcon :loading="true" />
          <TimerDisplay time="01:23" />
        </TimerRoot>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Timer with Controls</h3>
        <div class="flex items-center gap-4">
          <TimerRoot variant="outline" size="lg">
            <TimerIcon :loading="isRunning" />
            <TimerDisplay :time="formattedTime.display" />
          </TimerRoot>
          <div class="flex gap-2">
            <button class="h-9 w-9 rounded-md border border-input flex items-center justify-center hover:bg-accent" @click="isRunning ? stop() : start()">
              <Pause v-if="isRunning" class="w-4 h-4" />
              <Play v-else class="w-4 h-4" />
            </button>
            <button class="h-9 w-9 rounded-md border border-input flex items-center justify-center hover:bg-accent" @click="reset()">
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
