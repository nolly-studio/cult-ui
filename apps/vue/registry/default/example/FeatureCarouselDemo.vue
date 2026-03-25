<script setup lang="ts">
import { cn } from '@/lib/utils'
import { FeatureCarousel } from '../ui/feature-carousel'
</script>

<template>
  <div class="w-full max-w-5xl mx-auto">
    <div class="rounded-[34px] bg-neutral-700 p-2">
      <div class="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
        <FeatureCarousel
          title="Interactive Feature Demo"
          description="Showcase your features with smooth animations and transitions"
          :step1img1-class="cn(
            'pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50',
            'max-md:scale-[160%] max-md:rounded-[24px] rounded-[24px] left-[25%] top-[57%] md:left-[35px] md:top-[29%]',
            'md:group-hover:translate-y-2'
          )"
          :step1img2-class="cn(
            'pointer-events-none w-[60%] border border-stone-100/10 dark:border-stone-700/50 transition-all duration-500 overflow-hidden',
            'max-md:scale-[160%] rounded-2xl max-md:rounded-[24px] left-[69%] top-[53%] md:top-[21%] md:left-[calc(50%+35px+1rem)]',
            'md:group-hover:-translate-y-6'
          )"
          :step2img1-class="cn(
            'pointer-events-none w-[50%] rounded-t-[24px] overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700',
            'max-md:scale-[160%] left-[25%] top-[69%] md:left-[35px] md:top-[30%]',
            'md:group-hover:translate-y-2'
          )"
          :step2img2-class="cn(
            'pointer-events-none w-[40%] rounded-t-[24px] border border-stone-100/10 dark:border-stone-700 transition-all duration-500 rounded-2xl overflow-hidden',
            'max-md:scale-[140%] left-[70%] top-[53%] md:top-[25%] md:left-[calc(50%+27px+1rem)]',
            'md:group-hover:-translate-y-6'
          )"
          :step3img-class="cn(
            'pointer-events-none w-[90%] border border-stone-100/10 dark:border-stone-700 rounded-t-[24px] transition-all duration-500 overflow-hidden',
            'left-[5%] top-[50%] md:top-[30%] md:left-[68px]'
          )"
          :step4img-class="cn(
            'pointer-events-none w-[90%] border border-stone-100/10 dark:border-stone-700 rounded-t-[24px] transition-all duration-500 overflow-hidden',
            'left-[5%] top-[50%] md:top-[30%] md:left-[68px]'
          )"
          :image="{
            step1light1: '/feature-1.png',
            step1light2: '/feature-2.png',
            step2light1: '/feature-3.png',
            step2light2: '/feature-4.png',
            step3light: '/feature-2.png',
            step4light: '/feature-5.png',
            alt: 'Feature demonstration',
          }"
          bg-class="bg-gradient-to-tr from-neutral-900/90 to-neutral-800/90"
        />
      </div>
    </div>
  </div>
</template>
