<script setup lang="ts">
import { ref } from 'vue'
import { Plus, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const CONTAINER_SIZE = 200

const isExpanded = ref(false)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div
    :class="cn(
      'rounded-[24px] border border-black/10 shadow-sm dark:border-yellow-400/20',
      'bg-gradient-to-b from-neutral-900 to-black',
      isExpanded
        ? 'w-[204px] bg-gradient-to-b dark:from-stone-900 dark:to-neutral-900/80'
        : 'dark:from-neutral-900 dark:to-stone-950 bg-gradient-to-b'
    )"
  >
    <div class="rounded-[23px] border border-black/10">
      <div class="rounded-[22px] border dark:border-stone-800 border-white/50">
        <div class="rounded-[21px] border border-neutral-950/20 flex items-center justify-center">
          <!-- Container -->
          <div
            :class="cn(
              'relative border-white/10 border shadow-lg flex flex-col space-y-1 items-center text-white cursor-pointer z-10',
              !isExpanded
                ? 'bg-gradient-to-b from-neutral-900 to-stone-900 dark:from-stone-700 dark:to-neutral-800/80'
                : ''
            )"
            :style="{
              borderRadius: isExpanded ? '20px' : '21px',
              width: isExpanded ? `${CONTAINER_SIZE}px` : '4rem',
              height: isExpanded ? `${CONTAINER_SIZE + 50}px` : '4rem',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }"
          >
            <!-- Expanded content -->
            <Transition name="fade">
              <div v-if="isExpanded" class="w-full h-full">
                <slot />
              </div>
            </Transition>

            <!-- Toggle button -->
            <div
              class="absolute"
              :style="{
                left: isExpanded ? '' : '50%',
                bottom: '6px',
                transform: isExpanded ? 'translateX(0%)' : 'translateX(-50%)',
                transition: 'all 0.3s ease-out',
              }"
            >
              <div
                v-if="isExpanded"
                class="p-[10px] group bg-neutral-800/50 dark:bg-black/50 border border-cyan-100/30 hover:border-neutral-200 text-orange-50 rounded-full shadow-2xl transition-colors duration-300"
                @click="toggleExpand"
              >
                <X
                  :class="cn(
                    'h-7 w-7 text-cyan-100/30 dark:text-neutral-400/80 group-hover:text-neutral-500 transition-colors duration-200'
                  )"
                />
              </div>
              <div
                v-else
                class="p-[10px] group bg-neutral-200 dark:bg-cyan-500/90 text-cyan-50 border border-cyan-100/10 shadow-2xl transition-colors duration-200"
                :style="{ borderRadius: '24px' }"
                @click="toggleExpand"
              >
                <Plus class="h-7 w-7 text-black dark:text-neutral-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.4s ease-out 0.3s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.fade-leave-to {
  opacity: 0;
}
</style>
