<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { Circle, File, Laptop, Moon, Sun } from 'lucide-vue-next'

import { docsConfig } from '@/config/docs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const props = defineProps<{
  class?: string
}>()

const router = useRouter()
const { store: colorMode } = useColorMode()

const open = ref(false)

function onKeyDown(e: KeyboardEvent) {
  if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
    if (
      (e.target instanceof HTMLElement && e.target.isContentEditable) ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return
    }

    e.preventDefault()
    open.value = !open.value
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})

function runCommand(command: () => unknown) {
  open.value = false
  command()
}
</script>

<template>
  <Button
    variant="outline"
    :class="cn(
      'relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64',
      props.class
    )"
    @click="open = true"
  >
    <span class="hidden lg:inline-flex">Search documentation...</span>
    <span class="inline-flex lg:hidden">Search...</span>
    <kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
      <span class="text-xs">&#8984;</span>K
    </kbd>
  </Button>
  <CommandDialog v-model:open="open">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Links">
        <template v-for="navItem in docsConfig.mainNav.filter((item: any) => !item.external)" :key="navItem.href">
          <CommandItem
            :value="navItem.title"
            @select="runCommand(() => router.push(navItem.href as string))"
          >
            <File class="mr-2 size-4" />
            {{ navItem.title }}
          </CommandItem>
        </template>
      </CommandGroup>
      <template v-for="group in docsConfig.sidebarNav" :key="group.title">
        <CommandGroup :heading="group.title">
          <template v-for="item in group.items" :key="item.href || item.title">
            <template v-if="item.href">
              <CommandItem
                :value="item.title"
                @select="runCommand(() => router.push(item.href as string))"
              >
                <div class="mr-2 flex size-4 items-center justify-center">
                  <Circle class="size-3" />
                </div>
                {{ item.title }}
              </CommandItem>
            </template>
            <template v-else-if="item.items">
              <CommandGroup :heading="item.title">
                <template v-for="subItem in item.items" :key="subItem.href">
                  <CommandItem
                    :value="subItem.title"
                    @select="runCommand(() => router.push(subItem.href as string))"
                  >
                    <div class="mr-2 flex size-4 items-center justify-center">
                      <Circle class="size-3" />
                    </div>
                    {{ subItem.title }}
                  </CommandItem>
                </template>
              </CommandGroup>
            </template>
          </template>
        </CommandGroup>
      </template>
      <CommandSeparator />
      <CommandGroup heading="Theme">
        <CommandItem @select="runCommand(() => colorMode = 'light')">
          <Sun class="mr-2 size-4" />
          Light
        </CommandItem>
        <CommandItem @select="runCommand(() => colorMode = 'dark')">
          <Moon class="mr-2 size-4" />
          Dark
        </CommandItem>
        <CommandItem @select="runCommand(() => colorMode = 'auto')">
          <Laptop class="mr-2 size-4" />
          System
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
