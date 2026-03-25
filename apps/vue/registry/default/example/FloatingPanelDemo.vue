<script setup lang="ts">
import { Image as ImageIcon, Paintbrush, Plus } from 'lucide-vue-next'
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from '../ui/floating-panel'

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33']

const actions = [
  { icon: Plus, label: 'New File' },
  { icon: ImageIcon, label: 'Upload Image' },
  { icon: Paintbrush, label: 'Edit Colors' },
]

function handleSubmit(note: string) {
  console.log('Submitted note:', note)
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold mb-4">FloatingPanel Examples</h1>
    <div class="flex flex-col md:flex-row flex-wrap gap-4">
      <!-- Note Input -->
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="Add Note"
          class="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <span>Add Note</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent class="w-80">
          <FloatingPanelForm @submit="handleSubmit">
            <FloatingPanelBody>
              <FloatingPanelLabel for="note-input">Note</FloatingPanelLabel>
              <FloatingPanelTextarea id="note-input" class="min-h-[100px]" />
            </FloatingPanelBody>
            <FloatingPanelFooter>
              <FloatingPanelCloseButton />
              <FloatingPanelSubmitButton />
            </FloatingPanelFooter>
          </FloatingPanelForm>
        </FloatingPanelContent>
      </FloatingPanelRoot>

      <!-- Color Picker -->
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="Choose Color"
          class="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          <span>Choose Color</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent class="w-64">
          <FloatingPanelBody>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="color in colors"
                :key="color"
                class="w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                :style="{ backgroundColor: color }"
                @click="console.log(`Selected color: ${color}`)"
              />
            </div>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>

      <!-- Quick Actions -->
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="Quick Actions"
          class="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
        >
          <span>Quick Actions</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent class="w-56">
          <FloatingPanelBody>
            <FloatingPanelButton
              v-for="(action, index) in actions"
              :key="index"
              class="w-full flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
              @click="console.log(action.label)"
            >
              <component :is="action.icon" class="w-4 h-4" />
              <span>{{ action.label }}</span>
            </FloatingPanelButton>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>

      <!-- Image Preview -->
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="Preview Image"
          class="flex items-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/90 transition-colors"
        >
          <span>Preview Image</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent class="w-80">
          <FloatingPanelBody>
            <img src="/placeholder.svg?height=200&width=300" alt="Preview" class="w-full h-auto rounded-md" />
            <p class="mt-2 text-sm text-muted-foreground">Image preview description goes here.</p>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelButton
              class="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              @click="console.log('Download clicked')"
            >
              Download
            </FloatingPanelButton>
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    </div>
  </div>
</template>
