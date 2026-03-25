<script setup lang="ts">
import { ref, reactive } from 'vue'
import { BrowserWindow } from '../ui/mock-browser-window'

const config = reactive({
  variant: 'chrome' as 'chrome' | 'safari',
  headerStyle: 'full' as 'minimal' | 'full',
  size: 'lg' as 'sm' | 'md' | 'lg' | 'xl',
  showSidebar: true,
  sidebarPosition: 'left' as 'left' | 'right' | 'top' | 'bottom',
  url: 'https://example.com/dashboard',
})

const sidebarItems = [
  { label: 'Overview', active: true },
  { label: 'Users', badge: '12' },
  { label: 'Analytics', badge: 'new' },
  { label: 'Settings' },
]
</script>

<template>
  <div class="min-h-screen">
    <main class="container">
      <div class="mx-auto max-w-7xl">
        <div class="space-y-12">
          <div class="space-y-8">
            <div>
              <h2 class="text-lg font-semibold mb-6">Preview</h2>
              <div class="flex justify-center p-8 bg-muted/30 rounded-xl border">
                <BrowserWindow
                  :variant="config.variant"
                  :header-style="config.headerStyle"
                  :size="config.size"
                  :show-sidebar="config.showSidebar"
                  :sidebar-position="config.sidebarPosition"
                  :url="config.url"
                  :sidebar-items="config.showSidebar ? sidebarItems : undefined"
                  class="w-full max-w-4xl"
                />
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <h2 class="text-lg font-semibold">Window Settings</h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div class="space-y-2">
                <label class="text-sm">Browser</label>
                <select v-model="config.variant" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="chrome">Chrome</option>
                  <option value="safari">Safari</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm">Header Style</label>
                <select v-model="config.headerStyle" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="minimal">Minimal</option>
                  <option value="full">Address Bar</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm">Size</label>
                <select v-model="config.size" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              <div class="space-y-2 md:col-span-2 lg:col-span-1">
                <label class="text-sm">URL</label>
                <input v-model="config.url" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="https://example.com" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-sm">Show Sidebar</label>
                  <input type="checkbox" v-model="config.showSidebar" />
                </div>
              </div>
              <div v-if="config.showSidebar" class="space-y-2">
                <label class="text-sm">Sidebar Position</label>
                <select v-model="config.sidebarPosition" class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div class="space-y-2 md:col-span-2 lg:col-span-1">
                <label class="text-sm">Quick Presets</label>
                <div class="flex gap-2">
                  <button class="flex-1 h-9 rounded-md border border-input bg-transparent px-3 text-sm hover:bg-accent" @click="Object.assign(config, { variant: 'chrome', headerStyle: 'full', showSidebar: true, size: 'lg' })">
                    Chrome Dashboard
                  </button>
                  <button class="flex-1 h-9 rounded-md border border-input bg-transparent px-3 text-sm hover:bg-accent" @click="Object.assign(config, { variant: 'safari', headerStyle: 'minimal', showSidebar: false, size: 'md' })">
                    Safari Minimal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
