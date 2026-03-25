<script setup lang="ts">
import { cn } from '@/lib/utils'
import { GradientHeading } from '../ui/gradient-heading'
import { HoverVideoPlayer } from '../ui/hover-video-player'
</script>

<template>
  <div class="flex flex-col gap-12 py-12 w-full h-full items-center justify-center">
    <div class="text-center">
      <GradientHeading>Hover video player</GradientHeading>
    </div>
    <div
      :class="cn(
        'group relative flex flex-col overflow-hidden rounded-lg w-full h-full max-w-[24rem] hover:max-w-full transition-all duration-500',
        'bg-white shadow-sm ring-1 ring-black/5',
        'data-[dark]:bg-stone-800 data-[dark]:ring-white/15'
      )"
    >
      <HoverVideoPlayer
        video-src="https://player.vimeo.com/video/1037289858"
        thumbnail-src="/placeholders/newcopy-thumbnail.png"
        enable-controls
        :style="{ width: '100%', maxWidth: '100vw', aspectRatio: '16/9' }"
      />
    </div>
    <a href="https://www.newcult.co" target="_blank">newcopy.ai</a>
  </div>
</template>
