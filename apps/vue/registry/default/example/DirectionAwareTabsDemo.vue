<script setup lang="ts">
import { BgAnimateButton } from '../ui/bg-animate-button'
import { DirectionAwareTabs } from '../ui/direction-aware-tabs'

const tabs = [
  { id: 0, label: 'ocean' },
  { id: 1, label: 'forest' },
  { id: 2, label: 'default' },
  { id: 3, label: 'sunset' },
]
</script>

<template>
  <div>
    <DirectionAwareTabs :tabs="tabs">
      <template #tab-0>
        <div class="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="ocean">Button</BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="ocean">Button</BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="ocean">Button</BgAnimateButton>
        </div>
      </template>
      <template #tab-1>
        <div class="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="forest">Button</BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="forest">Button</BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="forest">Button</BgAnimateButton>
        </div>
      </template>
      <template #tab-2>
        <div class="border border-border/50 w-full flex flex-col items-center gap-3 p-4">
          <BgAnimateButton animation="spin-fast" gradient="default">Button</BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="default">Button</BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="default">Button</BgAnimateButton>
        </div>
      </template>
      <template #tab-3>
        <div class="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="sunset">Button</BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="sunset">Button</BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="sunset">Button</BgAnimateButton>
        </div>
      </template>
    </DirectionAwareTabs>
  </div>
</template>
