<script setup lang="ts">
import { ref } from 'vue'
import TextAnimate from '../ui/text-animate'

const count = ref(0)

const types = [
  { label: 'Roll In', type: 'rollIn' },
  { label: 'Whip In', type: 'whipIn' },
  { label: 'Fade In', type: 'fadeIn' },
  { label: 'Pop In', type: 'popIn' },
  { label: 'Fade In Up', type: 'fadeInUp' },
  { label: 'Shift In Up', type: 'shiftInUp' },
  { label: 'Whip In Up', type: 'whipInUp' },
  { label: 'Calm In Up', type: 'calmInUp' },
]
</script>

<template>
  <div class="flex flex-col relative">
    <div class="absolute top-0 right-5">
      <button
        class="p-1 border border-dotted rounded w-7 h-7 flex justify-center items-center cursor-pointer"
        @click="count++"
      >
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
            class="fill-black dark:fill-white"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </div>
    <div class="mt-8" :key="count">
      <div class="flex flex-col">
        <div class="flex flex-col py-4">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div v-for="item in types" :key="item.type">
              <p class="text-sm font-semibold">{{ item.label }}</p>
              <div class="md:mt-12">
                <TextAnimate :text="item.label" :type="item.type" :class="item.type === 'whipIn' ? 'text-lg' : ''" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
