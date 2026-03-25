<script setup lang="ts">
import { BgAnimateButton } from '../ui/bg-animate-button'

type Gradients = 'sunrise' | 'ocean' | 'candy' | 'default' | 'forest' | 'sunset' | 'nebula'
type Radius = 'full' | 'xl' | '2xl' | '3xl' | 'sm'
type Animations = 'spin' | 'pulse' | 'spin-slow' | 'spin-fast'

const gradients: Gradients[] = ['sunrise', 'ocean', 'candy', 'forest', 'sunset', 'default', 'nebula']
const roundings: Radius[] = ['full', 'xl', '2xl', '3xl', 'sm']
const animations: Animations[] = ['spin', 'pulse', 'spin-slow', 'spin-fast']
</script>

<template>
  <div class="w-full max-w-4xl">
    <div class="sm:px-12 md:px-24 flex flex-col justify-center rounded-lg space-y-4">
      <div class="grid grid-cols-3 gap-4">
        <BgAnimateButton
          v-for="(rounding, i) in roundings.slice(0, 2)"
          :key="rounding"
          :gradient="gradients[i + 1]"
          :rounded="rounding"
        >
          {{ rounding }}
        </BgAnimateButton>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <BgAnimateButton
          v-for="(rounding, i) in roundings.slice(2, 5)"
          :key="rounding"
          :gradient="gradients[i + 1]"
          :rounded="rounding"
        >
          {{ rounding }}
        </BgAnimateButton>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BgAnimateButton
          v-for="(anim, i) in animations"
          :key="anim"
          :gradient="gradients[i + 2]"
          variant="ghost"
          :animation="anim"
        >
          {{ anim }}
        </BgAnimateButton>
      </div>
    </div>
  </div>
</template>
