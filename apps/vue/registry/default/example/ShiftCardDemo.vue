<script setup lang="ts">
import { ShiftCard } from '../ui/shift-card'
import { TextureButton } from '../ui/texture-button'
</script>

<template>
  <div class="flex justify-center items-center">
    <ShiftCard class="bg-card dark:bg-[#1A1A1A]">
      <template #topContent>
        <div class="bg-accent/90 rounded-md text-primary shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]">
          <h3 class="text-lg p-4">
            <svg width="1em" height="1em" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Screen Capture</title>
              <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83" />
              <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF" />
              <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E" />
              <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262" />
              <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE" />
            </svg>
            Screen Capture
          </h3>
        </div>
      </template>

      <template #middleContent>
        <img src="/basic-img.png" width="150" height="200" alt="Animated Middle" class="rounded-lg border-2 border-white dark:border-black" />
      </template>

      <template #bottomContent>
        <div class="flex w-full flex-col gap-1 bg-primary/90 border-t border-t-black/10 rounded-t-xs px-4 pb-6">
          <div class="font-sans text-[14px] font-medium text-white dark:text-[#171717] flex gap-1 pt-1.5 items-center">
            <p>Share your work</p>
          </div>
          <div class="w-full text-pretty font-sans text-[13px] leading-4 text-neutral-200 dark:text-[#171717] pb-2">
            Share your image to build that audience.
          </div>
          <div class="bg-accent/80 dark:bg-accent px-1 py-1 rounded-xl flex flex-col gap-1">
            <TextureButton variant="primary">Post on Twitter</TextureButton>
            <TextureButton variant="primary">Open in Loom</TextureButton>
          </div>
        </div>
      </template>
    </ShiftCard>
  </div>
</template>
