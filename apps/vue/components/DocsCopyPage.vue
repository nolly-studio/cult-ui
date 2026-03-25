<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronDown, Copy } from 'lucide-vue-next'

import { useClipboard } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
  page: string
  url: string
}>()

const { copy, copied: isCopied } = useClipboard()

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this shadcn/ui compatible registry documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
  `
  )}`
}

interface MenuItem {
  key: string
  label: string
  getHref: (url: string) => string
}

const menuItems: MenuItem[] = [
  {
    key: 'markdown',
    label: 'View as Markdown',
    getHref: (url: string) => `${url}.md`,
  },
  {
    key: 'v0',
    label: 'Open in v0',
    getHref: (url: string) => getPromptUrl('https://v0.dev', url),
  },
  {
    key: 'chatgpt',
    label: 'Open in ChatGPT',
    getHref: (url: string) => getPromptUrl('https://chatgpt.com', url),
  },
  {
    key: 'claude',
    label: 'Open in Claude',
    getHref: (url: string) => getPromptUrl('https://claude.ai/new', url),
  },
]
</script>

<template>
  <Popover>
    <div class="bg-secondary group/buttons relative flex rounded-lg">
      <PopoverAnchor />
      <Button
        variant="secondary"
        size="sm"
        class="h-8 shadow-none md:h-7 md:text-[0.8rem]"
        @click="copy(props.page)"
      >
        <Check v-if="isCopied" />
        <Copy v-else />
        Copy Page
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child class="hidden sm:flex">
          <Button
            variant="secondary"
            size="sm"
            class="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
          >
            <ChevronDown class="rotate-180 sm:rotate-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="shadow-none">
          <DropdownMenuItem v-for="item in menuItems" :key="item.key" as-child>
            <a :href="item.getHref(props.url)" target="_blank" rel="noopener noreferrer">
              {{ item.label }}
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        class="!bg-foreground/10 absolute top-0 right-8 z-0 !h-8 peer-focus-visible:opacity-0 sm:right-7 sm:!h-7"
      />
      <PopoverTrigger as-child class="flex sm:hidden">
        <Button
          variant="secondary"
          size="sm"
          class="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
        >
          <ChevronDown class="rotate-180 sm:rotate-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="bg-background/70 dark:bg-background/60 w-52 !origin-center rounded-lg p-1 shadow-sm backdrop-blur-sm"
        align="start"
      >
        <Button
          v-for="item in menuItems"
          :key="item.key"
          variant="ghost"
          size="lg"
          as-child
          class="w-full justify-start text-base font-normal"
        >
          <a :href="item.getHref(props.url)" target="_blank" rel="noopener noreferrer">
            {{ item.label }}
          </a>
        </Button>
      </PopoverContent>
    </div>
  </Popover>
</template>
