<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const active = ref<string | null>(null)
const isOpen = ref(false)
const activeHelpSection = ref<string | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    active.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleNavClick(item: string) {
  if (active.value === item && isOpen.value) {
    isOpen.value = false
    active.value = null
    return
  }
  active.value = item
  isOpen.value = true
}

function handleHelpSectionToggle(section: string) {
  activeHelpSection.value = activeHelpSection.value === section ? null : section
}

const activeTitle = computed(() => {
  if (!active.value) return ''
  return active.value.charAt(0).toUpperCase() + active.value.slice(1).replace('-', ' ')
})

const navigationButtons = computed(() => [
  {
    id: 'registry',
    label: 'Configure',
    step: '1',
    isActive: active.value === 'registry',
    isFirst: true,
    isLast: false,
  },
  {
    id: 'install-components',
    label: 'Install',
    step: '2',
    isActive: active.value === 'install-components',
    isFirst: false,
    isLast: false,
  },
  {
    id: 'help',
    label: 'Help',
    step: '3',
    isActive: active.value === 'help',
    isFirst: false,
    isLast: true,
  },
])
</script>

<template>
  <div class="mx-auto hidden w-full max-w-lg space-y-2 md:block">
    <Badge variant="outline" class="bg-gray-100">
      OPTION 1
    </Badge>
    <div class="mb-2 flex items-center gap-2">
      <span class="text-sm text-gray-900">
        <strong>Install with shadcn cli</strong>
        <span class="text-gray-500"> Quickly add components to existing project</span>
      </span>
    </div>

    <div
      ref="containerRef"
      class="mx-auto w-full max-w-lg rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_16px_-4px_rgba(0,0,0,0.04)]"
    >
      <div class="rounded-2xl">
        <div class="overflow-hidden">
          <Transition name="expand">
            <div v-if="isOpen" class="px-2 pb-1 pt-2">
              <h4 class="px-2 text-sm font-medium text-gray-900">
                {{ activeTitle }}
              </h4>

              <div class="shadow-elevation-light mt-3 rounded-[0.8rem] bg-[#F7F7F8] px-3 py-4">
                <!-- Registry content -->
                <div v-if="active === 'registry'" class="space-y-4">
                  <div class="space-y-2">
                    <h3 class="text-lg font-medium text-gray-900">
                      Registry Configuration
                    </h3>
                    <p class="text-sm text-gray-600">
                      Configure your project to use the Cult UI registry with shadcn CLI v3.
                    </p>
                  </div>
                  <slot name="docs" />
                </div>

                <!-- Install components content -->
                <div v-else-if="active === 'install-components'" class="space-y-4">
                  <div class="space-y-4">
                    <slot name="install-components" />
                  </div>
                </div>

                <!-- Help content -->
                <div v-else-if="active === 'help'" class="space-y-4">
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <h4 class="text-lg font-medium text-gray-900">
                        Help &amp; Documentation
                      </h4>
                      <p class="text-sm text-gray-600">
                        Namespaced registries let you install components, libraries,
                        and other resources from multiple sources in one project.
                        Think of it like having different app stores - you can get
                        UI components from shadcn, AI prompts from v0, and custom
                        tools from your company's private registry, all using
                        the same command.
                      </p>
                    </div>

                    <!-- Quick Start Guide -->
                    <div class="space-y-3">
                      <h4 class="text-sm font-medium text-gray-900">
                        Quick Start
                      </h4>
                      <div class="space-y-2 text-sm text-gray-600">
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-gray-400">1.</span>
                          <span>
                            Configure registries in your
                            <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs">components.json</code>
                          </span>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-gray-400">2.</span>
                          <span>
                            Install resources using
                            <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs">npx shadcn@beta add @namespace/resource</code>
                          </span>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-gray-400">3.</span>
                          <span>
                            View resources before installing with
                            <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs">npx shadcn@beta view @namespace/resource</code>
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Collapsible: Basic Usage -->
                    <div class="space-y-3">
                      <button
                        class="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                        @click="handleHelpSectionToggle('basic')"
                      >
                        <h4 class="text-sm font-medium text-zinc-600">Basic Usage</h4>
                        <span class="text-sm text-zinc-400">{{ activeHelpSection === 'basic' ? '\u2212' : '+' }}</span>
                      </button>
                      <div v-if="activeHelpSection === 'basic'" class="space-y-2 pl-4">
                        <div class="space-y-2">
                          <div class="space-y-1">
                            <code class="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">npx shadcn@beta add @cult-ui/button</code>
                            <p class="text-sm text-zinc-600">Install button from Cult UI registry</p>
                          </div>
                          <div class="space-y-1">
                            <code class="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">npx shadcn@beta add @cult-ui/button @cult-ui/card</code>
                            <p class="text-sm text-zinc-600">Install multiple resources at once</p>
                          </div>
                          <div class="space-y-1">
                            <code class="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">npx shadcn@beta search @cult-ui --query "button"</code>
                            <p class="text-sm text-zinc-600">Search for button-related resources</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Collapsible: Configuration -->
                    <div class="space-y-3">
                      <button
                        class="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                        @click="handleHelpSectionToggle('config')"
                      >
                        <h4 class="text-sm font-medium text-zinc-600">Configuration</h4>
                        <span class="text-sm text-zinc-400">{{ activeHelpSection === 'config' ? '\u2212' : '+' }}</span>
                      </button>
                      <div v-if="activeHelpSection === 'config'" class="space-y-2 pl-4">
                        <div class="space-y-2">
                          <div class="space-y-1">
                            <h5 class="text-sm font-medium text-zinc-800">Simple Registry</h5>
                            <pre class="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">{
  "@cult-ui": "https://cult-ui.com/r/{name}.json",
  "@v0": "https://v0.dev/chat/b/{name}"
}</pre>
                          </div>
                          <div class="space-y-1">
                            <h5 class="text-sm font-medium text-zinc-800">With Multiple Registries</h5>
                            <pre class="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">{
  "@cult-ui": "https://cult-ui.com/r/{name}.json",
  "@v0": "https://v0.dev/chat/b/{name}",
  "@acme": "https://registry.acme.com/{name}.json"
}</pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Collapsible: Advanced Configuration -->
                    <div class="space-y-3">
                      <button
                        class="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                        @click="handleHelpSectionToggle('advanced')"
                      >
                        <h4 class="text-sm font-medium text-zinc-600">Advanced Setup</h4>
                        <span class="text-sm text-zinc-400">{{ activeHelpSection === 'advanced' ? '\u2212' : '+' }}</span>
                      </button>
                      <div v-if="activeHelpSection === 'advanced'" class="space-y-2 pl-4">
                        <div class="space-y-1">
                          <h5 class="text-sm font-medium text-zinc-800">Complete components.json</h5>
                          <pre class="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide",

  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}</pre>
                        </div>
                      </div>
                    </div>

                    <!-- Collapsible: Troubleshooting -->
                    <div class="space-y-3">
                      <button
                        class="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                        @click="handleHelpSectionToggle('troubleshoot')"
                      >
                        <h4 class="text-sm font-medium text-zinc-600">Troubleshooting</h4>
                        <span class="text-sm text-zinc-400">{{ activeHelpSection === 'troubleshoot' ? '\u2212' : '+' }}</span>
                      </button>
                      <div v-if="activeHelpSection === 'troubleshoot'" class="space-y-2 pl-4 text-sm text-zinc-600">
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-zinc-400">&bull;</span>
                          <span>
                            <strong>Registry not found:</strong> Check your
                            <code class="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">components.json</code>
                            configuration
                          </span>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-zinc-400">&bull;</span>
                          <span>
                            <strong>Resource not found:</strong> Check resource name and registry URL pattern
                          </span>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="mt-0.5 text-zinc-400">&bull;</span>
                          <span>
                            <strong>Installation fails:</strong> Ensure you're using
                            <code class="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">shadcn@beta</code>
                            for v3 features
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Collapsible: Resources -->
                    <div class="space-y-3">
                      <button
                        class="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                        @click="handleHelpSectionToggle('resources')"
                      >
                        <h4 class="text-sm font-medium text-zinc-600">Resources &amp; Docs</h4>
                        <span class="text-sm text-zinc-400">{{ activeHelpSection === 'resources' ? '\u2212' : '+' }}</span>
                      </button>
                      <div v-if="activeHelpSection === 'resources'" class="space-y-2 pl-4">
                        <a
                          href="https://ui.shadcn.com/docs/registry/namespaced-registries"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                        >
                          &rarr; Full Documentation
                        </a>
                        <a
                          href="https://ui.shadcn.com/docs/registry/registry-item-json"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                        >
                          &rarr; Registry Item Schema
                        </a>
                        <a
                          href="https://github.com/shadcn/ui"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                        >
                          &rarr; GitHub Repository
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation bar -->
        <div class="flex w-full items-center justify-center p-px">
          <div class="flex w-full items-center">
            <button
              v-for="button in navigationButtons"
              :key="button.id"
              :class="cn(
                'flex-1 px-2 py-4 text-sm text-gray-600 transition-colors hover:text-gray-900',
                button.isActive ? 'font-medium text-gray-900' : '',
                active === null ? 'hover:bg-muted/50' : '',
                button.isFirst && !isOpen ? 'hover:rounded-l-2xl' : '',
                button.isLast && !isOpen ? 'hover:rounded-r-2xl' : '',
              )"
              @click="handleNavClick(button.id)"
            >
              <div class="flex items-center justify-center gap-2">
                <div class="shadow-inner-shadow flex w-5 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-300">
                  <span
                    :class="cn(
                      'w-full rounded-md bg-muted',
                      button.isActive
                        ? 'bg-blue-300/20 text-blue-700'
                        : 'bg-muted/50 text-gray-500',
                    )"
                  >
                    {{ button.step }}
                  </span>
                </div>
                <span class="text-sm font-medium text-gray-900">
                  {{ button.label }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 800px;
  opacity: 1;
}
</style>
