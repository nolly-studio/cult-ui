<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import ThemeWrapper from './ThemeWrapper.vue'
import CardsDemo from './cards/CardsDemo.vue'

const config = useConfig()
const mounted = useMounted()
</script>

<template>
  <div class="space-y-8">
    <template v-if="!mounted">
      <div class="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:gap-6">
        <div class="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-6">
          <Skeleton class="h-[218px] w-full" />
          <div class="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
            <Skeleton class="h-[218px] w-full" />
            <div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
              <Skeleton class="h-[218px] w-full" />
            </div>
            <div class="pt-3 sm:col-span-2 xl:pt-4">
              <Skeleton class="h-[218px] w-full" />
            </div>
          </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div class="space-y-4 xl:space-y-6">
              <Skeleton class="h-[218px] w-full" />
              <Skeleton class="h-[218px] w-full" />
              <Skeleton class="h-[218px] w-full" />
            </div>
            <div class="space-y-4 xl:space-y-6">
              <Skeleton class="h-[218px] w-full" />
              <Skeleton class="h-[218px] w-full" />
              <div class="hidden xl:block">
                <Skeleton class="h-[218px] w-full" />
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4 lg:col-span-6 xl:col-span-4 xl:space-y-6">
          <div class="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
            <Skeleton class="h-[218px] w-full" />
            <div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
              <Skeleton class="h-[218px] w-full" />
            </div>
            <div class="pt-3 sm:col-span-2 xl:pt-4">
              <Skeleton class="h-[218px] w-full" />
            </div>
          </div>
          <div class="hidden md:block">
            <Skeleton class="h-[218px] w-full" />
          </div>
          <Skeleton class="h-[218px] w-full" />
        </div>
      </div>
    </template>
    <template v-else>
      <ThemeWrapper>
        <CardsDemo v-if="config.style === 'default'" />
      </ThemeWrapper>
    </template>
  </div>
</template>
