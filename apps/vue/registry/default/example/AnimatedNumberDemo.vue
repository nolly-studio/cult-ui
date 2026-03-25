<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { AnimatedNumber } from '@/registry/default/ui/animated-number'
import { GradientHeading } from '@/registry/default/ui/gradient-heading'
import {
  TextureCardContent,
  TextureCardHeader,
  TextureCardStyled,
} from '@/registry/default/ui/texture-card'

const precisionValue = ref(14.5678)
const formatValue = ref(10)
const hooksValue = ref(10)
const springValue = ref(1000)
const mass = ref(1)
const stiffness = ref(100)
const damping = ref(40)

const customFormat = (num: number) => `$${num.toFixed(2)}`
</script>

<template>
  <div class="max-w-xl gap-4 py-6 mx-auto">
    <div class="w-full flex flex-col gap-2 justify-between">
      <!-- Custom Spring Example -->
      <TextureCardStyled class="w-full">
        <TextureCardHeader class="px-3">
          <GradientHeading size="sm">Custom Spring Properties</GradientHeading>
        </TextureCardHeader>
        <TextureCardContent class="flex flex-col sm:flex-row justify-between items-center gap-8">
          <div class="text-6xl font-bold mr-auto flex" style="min-width: 150px; text-align: right">
            <AnimatedNumber :value="springValue" :mass="mass" :stiffness="stiffness" :damping="damping" />
          </div>
          <div class="flex flex-col gap-3 px-2">
            <button class="border border-primary/10 rounded-full py-5 px-4" @click="springValue += 500">
              <Plus class="h-4 w-4 mr-2 inline" /> Increase
            </button>
            <button class="border border-primary/10 rounded-full py-5 px-4" :disabled="springValue <= 500" @click="springValue -= 300">
              <Minus class="h-4 w-4 mr-2 inline" /> Decrease
            </button>
          </div>
          <div class="ml-auto w-full">
            <div class="flex flex-col gap-4">
              <div class="ml-auto w-full">
                <label>Mass: {{ mass }}</label>
                <input type="range" :min="0.1" :max="5" :step="0.1" v-model.number="mass" class="w-full" />
              </div>
              <div class="ml-auto w-full">
                <label>Stiffness: {{ stiffness }}</label>
                <input type="range" :min="1" :max="200" :step="1" v-model.number="stiffness" class="w-full" />
              </div>
              <div class="ml-auto w-full">
                <label>Damping: {{ damping }}</label>
                <input type="range" :min="1" :max="50" :step="1" v-model.number="damping" class="w-full" />
              </div>
            </div>
          </div>
        </TextureCardContent>
      </TextureCardStyled>

      <div class="flex flex-col sm:flex-row gap-2">
        <!-- Precision Example -->
        <TextureCardStyled>
          <TextureCardHeader class="pl-3">
            <GradientHeading size="xxs">Precision</GradientHeading>
          </TextureCardHeader>
          <TextureCardContent>
            <div class="flex gap-2">
              <div class="text-2xl font-bold" style="min-width: 80px; text-align: left">
                <AnimatedNumber :value="precisionValue" :precision="2" />
              </div>
              <button class="border border-primary/10 rounded-full ml-auto py-5 px-3" @click="precisionValue += 13.456">
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </TextureCardContent>
        </TextureCardStyled>

        <!-- Format Example -->
        <TextureCardStyled>
          <TextureCardHeader class="pl-3">
            <GradientHeading size="xxs">Format</GradientHeading>
          </TextureCardHeader>
          <TextureCardContent>
            <div class="flex gap-2">
              <div class="text-2xl font-bold" style="min-width: 120px; text-align: left">
                <AnimatedNumber :value="formatValue" :format="customFormat" />
              </div>
              <button class="border border-primary/10 rounded-full ml-auto py-5 px-3" @click="formatValue += 50">
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </TextureCardContent>
        </TextureCardStyled>

        <!-- Hooks Example -->
        <TextureCardStyled>
          <TextureCardHeader class="pl-3">
            <GradientHeading size="xxs">Callbacks</GradientHeading>
          </TextureCardHeader>
          <TextureCardContent>
            <div class="flex gap-2">
              <div class="text-2xl font-bold" style="min-width: 50px; text-align: left">
                <AnimatedNumber :value="hooksValue" />
              </div>
              <button class="border border-primary/10 rounded-full ml-auto py-5 px-3" @click="hooksValue += 20">
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </TextureCardContent>
        </TextureCardStyled>
      </div>
    </div>
  </div>
</template>
