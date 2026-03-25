<script setup lang="ts">
import { Check, RotateCcw, Sun, Moon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'
import { themes } from '@/registry/themes'
import ThemeWrapper from './ThemeWrapper.vue'

const config = useConfig()
const colorMode = useColorMode()
const mounted = useMounted()

const mode = computed(() => colorMode.value)
</script>

<template>
  <ThemeWrapper default-theme="zinc" class="flex flex-col space-y-4 md:space-y-6">
    <div class="flex items-start pt-4 md:pt-0">
      <div class="space-y-1 pr-2">
        <div class="font-semibold leading-none tracking-tight">
          Customize
        </div>
        <div class="text-xs text-muted-foreground">
          Pick a style and color for your components.
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        class="ml-auto rounded-[0.5rem]"
        @click="config.theme = 'zinc'; config.radius = 0.5"
      >
        <RotateCcw class="size-4" />
        <span class="sr-only">Reset</span>
      </Button>
    </div>
    <div class="flex flex-1 flex-col space-y-4 md:space-y-6">
      <div class="space-y-1.5">
        <Label class="text-xs">Color</Label>
        <div class="grid grid-cols-3 gap-2">
          <template v-for="theme in themes" :key="theme.name">
            <Button
              v-if="mounted"
              variant="outline"
              size="sm"
              :class="cn(
                'justify-start',
                config.theme === theme.name && 'border-2 border-primary',
              )"
              :style="{ '--theme-primary': `hsl(${theme.activeColor[mode === 'dark' ? 'dark' : 'light']})` }"
              @click="config.theme = theme.name"
            >
              <span
                :class="cn(
                  'mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]',
                )"
              >
                <Check v-if="config.theme === theme.name" class="size-4 text-white" />
              </span>
              {{ theme.label }}
            </Button>
            <Skeleton v-else class="h-8 w-full" />
          </template>
        </div>
      </div>
      <div class="space-y-1.5">
        <Label class="text-xs">Radius</Label>
        <div class="grid grid-cols-5 gap-2">
          <Button
            v-for="value in ['0', '0.3', '0.5', '0.75', '1.0']"
            :key="value"
            variant="outline"
            size="sm"
            :class="cn(
              config.radius === parseFloat(value) && 'border-2 border-primary',
            )"
            @click="config.radius = parseFloat(value)"
          >
            {{ value }}
          </Button>
        </div>
      </div>
      <div class="space-y-1.5">
        <Label class="text-xs">Mode</Label>
        <div class="grid grid-cols-3 gap-2">
          <template v-if="mounted">
            <Button
              variant="outline"
              size="sm"
              :class="cn(mode === 'light' && 'border-2 border-primary')"
              @click="colorMode.preference = 'light'"
            >
              <Sun class="mr-1 -translate-x-1" />
              Light
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="cn(mode === 'dark' && 'border-2 border-primary')"
              @click="colorMode.preference = 'dark'"
            >
              <Moon class="mr-1 -translate-x-1" />
              Dark
            </Button>
          </template>
          <template v-else>
            <Skeleton class="h-8 w-full" />
            <Skeleton class="h-8 w-full" />
          </template>
        </div>
      </div>
    </div>
  </ThemeWrapper>
</template>
