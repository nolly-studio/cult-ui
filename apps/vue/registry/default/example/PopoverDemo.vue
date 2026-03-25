<script setup lang="ts">
import { ImageIcon, Paintbrush, Plus } from 'lucide-vue-next'
import {
  PopoverBody,
  PopoverButton,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverHeader,
  PopoverLabel,
  PopoverRoot,
  PopoverSubmitButton,
  PopoverTextarea,
  PopoverTrigger,
} from '../ui/popover'

const handleSubmit = (note: string) => {
  console.log('Submitted note:', note)
}

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33']

const actions = [
  { label: 'New File', icon: Plus, action: () => console.log('New File') },
  { label: 'Upload Image', icon: ImageIcon, action: () => console.log('Upload Image') },
  { label: 'Edit Colors', icon: Paintbrush, action: () => console.log('Edit Colors') },
]
</script>

<template>
  <div class="p-8 space-y-8">
    <div class="grid md:grid-cols-2 gap-36">
      <div class="flex flex-col gap-24 flex-wrap">
        <!-- Feedback Popover -->
        <PopoverRoot>
          <PopoverTrigger>Add Feedback</PopoverTrigger>
          <PopoverContent>
            <PopoverForm :on-submit="handleSubmit">
              <PopoverLabel>Add Feedback</PopoverLabel>
              <PopoverTextarea />
              <PopoverFooter>
                <PopoverCloseButton />
                <PopoverSubmitButton />
              </PopoverFooter>
            </PopoverForm>
          </PopoverContent>
        </PopoverRoot>

        <!-- Color Picker Popover -->
        <PopoverRoot>
          <PopoverTrigger>Choose Color</PopoverTrigger>
          <PopoverContent class="w-48 h-48">
            <PopoverHeader>Pick a Color</PopoverHeader>
            <PopoverBody class="flex flex-col justify-center items-center">
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="color in colors"
                  :key="color"
                  class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :style="{ backgroundColor: color }"
                  @click="console.log(`Selected color: ${color}`)"
                />
              </div>
            </PopoverBody>
            <PopoverFooter>
              <PopoverCloseButton />
            </PopoverFooter>
          </PopoverContent>
        </PopoverRoot>
      </div>

      <div class="flex flex-col gap-24 flex-wrap">
        <!-- Quick Actions Popover -->
        <PopoverRoot>
          <PopoverTrigger>Quick Actions</PopoverTrigger>
          <PopoverContent class="w-48 h-48">
            <PopoverHeader>Quick Actions</PopoverHeader>
            <PopoverBody>
              <PopoverButton v-for="act in actions" :key="act.label" @click="act.action">
                <component :is="act.icon" class="w-4 h-4" />
                <span>{{ act.label }}</span>
              </PopoverButton>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>

        <!-- Image Preview Popover -->
        <PopoverRoot>
          <PopoverTrigger>Preview Image</PopoverTrigger>
          <PopoverContent class="w-96 h-[500px]">
            <PopoverHeader>Image Preview</PopoverHeader>
            <PopoverBody>
              <img src="/placeholder.svg?height=200&width=300" alt="Preview" class="w-full h-auto rounded-md" />
              <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Image preview description goes here.</p>
            </PopoverBody>
            <PopoverFooter>
              <PopoverCloseButton />
            </PopoverFooter>
          </PopoverContent>
        </PopoverRoot>
      </div>
    </div>
  </div>
</template>
