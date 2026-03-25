<script setup lang="ts">
import { ChevronLeft, Trash, X } from 'lucide-vue-next'
import { TextureButton } from '../ui/texture-button'
</script>

<template>
  <div class="py-6 px-4 md:px-0 rounded-md flex justify-center">
    <div>
      <div class="flex flex-col gap-3 max-w-lg mt-4">
        <div class="flex gap-3">
          <div><TextureButton size="sm">Primary</TextureButton></div>
          <div><TextureButton>Primary</TextureButton></div>
        </div>
      </div>
      <div class="flex flex-col gap-3 max-w-lg mt-4">
        <div class="flex gap-3">
          <div><TextureButton variant="accent" size="sm">Accent</TextureButton></div>
          <div><TextureButton variant="accent">Accent</TextureButton></div>
        </div>
      </div>
      <div class="flex flex-col gap-3 max-w-lg mt-4">
        <div class="flex gap-3 w-full">
          <div><TextureButton variant="secondary" size="sm">Secondary</TextureButton></div>
          <div><TextureButton variant="secondary">Secondary</TextureButton></div>
        </div>
      </div>
      <div class="flex flex-col gap-3 max-w-lg mt-4">
        <div class="flex gap-3 w-full">
          <div><TextureButton variant="destructive" size="sm">Destructive</TextureButton></div>
          <div><TextureButton variant="destructive">Destructive</TextureButton></div>
        </div>
      </div>
      <div class="flex flex-col gap-3 max-w-lg mt-4">
        <div class="flex gap-3 w-full">
          <div><TextureButton variant="minimal" size="sm">Minimal</TextureButton></div>
          <div><TextureButton variant="minimal">Minimal</TextureButton></div>
        </div>
      </div>
      <div class="flex flex-col gap-3 max-w-xs mt-4">
        <div class="flex gap-3">
          <TextureButton variant="icon" size="icon"><ChevronLeft class="h-6 w-6 p-1" /></TextureButton>
          <TextureButton variant="icon" size="icon"><Trash class="h-5 w-6 p-1" /></TextureButton>
          <TextureButton variant="icon" size="icon"><X class="h-6 w-6 p-1" /></TextureButton>
        </div>
      </div>
    </div>
  </div>
</template>
