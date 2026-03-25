<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface SidebarItem {
  icon?: string
  label: string
  active?: boolean
  badge?: string | number
}

const props = withDefaults(defineProps<{
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showSidebar?: boolean
  sidebarPosition?: 'left' | 'right' | 'top' | 'bottom'
  headerStyle?: 'minimal' | 'full'
  variant?: 'chrome' | 'safari' | 'generic'
  theme?: 'light' | 'dark' | 'auto'
  url?: string
  sidebarItems?: SidebarItem[]
}>(), {
  size: 'md',
  showSidebar: false,
  sidebarPosition: 'left',
  headerStyle: 'minimal',
  variant: 'generic',
  theme: 'auto',
  url: 'https://example.com',
})

const sizeClasses: Record<string, string> = {
  sm: 'h-64 max-w-sm',
  md: 'h-80 max-w-2xl',
  lg: 'h-96 max-w-4xl',
  xl: 'h-[32rem] max-w-6xl',
}

const sidebarSizes: Record<string, string> = {
  sm: 'w-32',
  md: 'w-48',
  lg: 'w-56',
  xl: 'w-64',
}

const dotColors = computed(() =>
  props.headerStyle === 'minimal'
    ? { red: 'bg-muted border border-foreground/20', yellow: 'bg-muted border border-foreground/20', green: 'bg-muted border border-foreground/20' }
    : { red: 'bg-red-500 hover:bg-red-600 border border-foreground/20', yellow: 'bg-yellow-500 hover:bg-yellow-600 border border-foreground/20', green: 'bg-green-500 hover:bg-green-600 border border-foreground/20' }
)

const headerClasses = computed(() => {
  const base = 'h-11 border-b border-foreground/5 flex items-center px-4'
  if (props.variant === 'chrome') return `${base} bg-muted/10 overflow-hidden`
  if (props.variant === 'safari') return `${base} bg-muted/10 overflow-hidden border-b border-border/30`
  return `${base} bg-muted/20`
})

const defaultSidebarItems: SidebarItem[] = [
  { label: 'Dashboard', active: true },
  { label: 'Analytics', badge: '3' },
  { label: 'Settings' },
  { label: 'Profile' },
]

const items = computed(() => props.sidebarItems ?? defaultSidebarItems)
</script>

<template>
  <div
    :class="cn(
      'relative mask-b-from-50% rounded-2xl border shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)] dark:shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2),_0px_1px_1px_0px_rgba(0,_0,_0,_0.3)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.2)_inset,_0px_0px_1px_0px_rgba(255,_255,_255,_0.1)]',
      sizeClasses[props.size],
      'bg-background border-border flex flex-col',
      props.class
    )"
  >
    <!-- Header -->
    <div :class="headerClasses">
      <!-- Window Controls -->
      <div class="flex gap-2">
        <div :class="cn('size-2 rounded-full transition-colors cursor-pointer', dotColors.red)" />
        <div :class="cn('size-2 rounded-full transition-colors cursor-pointer', dotColors.yellow)" />
        <div :class="cn('size-2 rounded-full transition-colors cursor-pointer', dotColors.green)" />
      </div>

      <!-- Address Bar -->
      <div v-if="props.headerStyle === 'full'" class="flex-1 flex justify-center ml-4">
        <div class="bg-muted/30 rounded-full border border-foreground/5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)_inset] backdrop-blur-sm px-4 py-2 text-xs text-muted-foreground/70 min-w-[200px] max-w-md flex items-center gap-2">
          <svg class="w-3 h-3 text-muted-foreground/60" viewBox="0 0 12 12" fill="currentColor">
            <title>Secure</title>
            <path d="M6 1a2.5 2.5 0 0 1 2.5 2.5V5h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h.5V3.5A2.5 2.5 0 0 1 6 1z" />
          </svg>
          <span class="truncate">{{ props.url }}</span>
        </div>
      </div>
    </div>

    <!-- Top Sidebar -->
    <div v-if="props.showSidebar && props.sidebarPosition === 'top'" class="border-b border-foreground/5 bg-muted/20 h-16" />

    <div class="flex flex-1 h-0">
      <!-- Left Sidebar -->
      <div v-if="props.showSidebar && props.sidebarPosition === 'left'" :class="cn('border-r border-foreground/5 bg-muted/20 flex-shrink-0 h-full', sidebarSizes[props.size])">
        <div class="p-3 space-y-1">
          <div
            v-for="(item, index) in items"
            :key="`${item.label}-${index}`"
            :class="cn(
              'flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors cursor-pointer',
              item.active
                ? 'bg-primary/5 text-primary border border-primary/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            )"
          >
            <span class="flex-1 truncate">{{ item.label }}</span>
            <div v-if="item.badge" class="bg-primary/5 text-primary text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
              {{ item.badge }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 relative min-w-0 h-full">
        <slot />
      </div>

      <!-- Right Sidebar -->
      <div v-if="props.showSidebar && props.sidebarPosition === 'right'" :class="cn('border-l border-foreground/5 bg-muted/20 flex-shrink-0 h-full', sidebarSizes[props.size])">
        <div class="p-3 space-y-1">
          <div
            v-for="(item, index) in items"
            :key="`${item.label}-${index}`"
            :class="cn(
              'flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors cursor-pointer',
              item.active ? 'bg-primary/5 text-primary border border-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            )"
          >
            <span class="flex-1 truncate">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Sidebar -->
    <div v-if="props.showSidebar && props.sidebarPosition === 'bottom'" class="border-t border-foreground/5 bg-muted/20 h-16" />
  </div>
</template>
