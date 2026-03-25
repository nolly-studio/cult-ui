<script setup lang="ts">
import { ref } from 'vue'
import { SidePanel } from '../ui/side-panel'

const videoOpen = ref(false)

const handleVideoOpen = () => {
  videoOpen.value = !videoOpen.value
}
</script>

<template>
  <div class="w-full max-w-4xl">
    <div class="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
      <SidePanel :panel-open="videoOpen" :handle-panel-open="handleVideoOpen">
        <template #button="{ handleToggle }">
          <div class="flex items-center w-full justify-start pr-4 md:pl-4 py-1 md:py-1" :class="videoOpen ? 'pr-3' : ''">
            <p class="text-xl font-black tracking-tight text-gray-900 sm:text-3xl">
              <span class="bg-gradient-to-t from-neutral-200 to-stone-300 bg-clip-text font-brand text-xl font-bold text-transparent sm:text-6xl">video</span>
            </p>
            <button class="rounded-r-[33px] py-8 ml-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80" @click="handleVideoOpen">
              {{ videoOpen ? 'close' : 'open' }}
            </button>
          </div>
        </template>
        <div v-if="videoOpen" class="md:flex md:justify-center py-1 px-1 md:py-8 md:px-8 w-full h-[300px] md:h-[800px] md:aspect-video rounded-2xl bg-black">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ta6m_l3lZvQ"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </SidePanel>
    </div>
  </div>
</template>
