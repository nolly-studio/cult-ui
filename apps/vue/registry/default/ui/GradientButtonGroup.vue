<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { cn } from '@/lib/utils'

const themes = {
  dark: {
    textActive: 'text-white',
    textInactive: 'text-[#6b6b6d] hover:text-zinc-400',
    iconColor: 'text-white hover:text-zinc-300',
  },
  light: {
    textActive: 'text-zinc-900',
    textInactive: 'text-zinc-400 hover:text-zinc-600',
    iconColor: 'text-zinc-700 hover:text-zinc-900',
  },
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'layers', label: 'Layers', icon: 'layers' },
  { id: 'storage', label: 'Storage', icon: 'storage' },
]

const activeId = ref('dashboard')
const colorMode = useColorMode()
const isDarkMode = computed(() => colorMode.value === 'dark')
const theme = computed(() => isDarkMode.value ? themes.dark : themes.light)
</script>

<template>
  <div class="flex w-full justify-center py-1">
    <div class="inline-flex min-w-max origin-center scale-[0.72] items-center sm:scale-[0.82] md:scale-[0.9] lg:scale-100">
      <div class="relative inline-flex items-center">
        <!-- Background tray -->
        <div
          class="absolute inset-0 z-0 rounded-[28px] transition-colors duration-300"
          :style="{
            background: isDarkMode
              ? 'linear-gradient(180deg, #141416 0%, #111113 50%, #0e0e10 100%)'
              : 'linear-gradient(180deg, #d1d1d6 0%, #cacad0 50%, #c3c3c9 100%)',
            boxShadow: isDarkMode
              ? 'inset 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04)'
              : 'inset 0 2px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.55)',
          }"
        />

        <!-- Nav layer -->
        <div class="relative flex z-10">
          <div
            class="absolute -inset-[4px] rounded-[28px] border-[1px] bg-muted dark:bg-background transition-colors duration-300"
            :style="{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)' }"
          />

          <nav
            class="relative inline-flex items-center gap-3 rounded-[24px] p-1.5 transition-colors duration-300"
            :style="{
              background: isDarkMode
                ? 'linear-gradient(180deg, #1c1c1f 0%, #17171a 52%, #131316 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #fefeff 52%, #fcfcfe 100%)',
              borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,1)',
            }"
          >
            <button
              v-for="item in navItems"
              :key="item.id"
              type="button"
              :class="cn(
                'group/nav relative flex h-[76px] w-[76px] items-center justify-center rounded-[18px] transition-all duration-300',
                activeId === item.id ? theme.textActive : theme.textInactive
              )"
              :aria-label="item.label"
              :aria-current="activeId === item.id ? 'page' : undefined"
              @click="activeId = item.id"
            >
              <!-- Active state well -->
              <template v-if="activeId === item.id">
                <span
                  class="absolute inset-0 bg-muted rounded-[18px] transition-all duration-300"
                  :style="isDarkMode
                    ? { background: 'linear-gradient(180deg, #0a0a0c 0%, #0e0e10 50%, #0c0c0e 100%)', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9), inset 0 0 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)' }
                    : { boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.12), inset 0 0 4px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9)' }"
                />
                <span class="absolute inset-[3px] overflow-hidden rounded-[15px]">
                  <span
                    class="absolute inset-[-60%] origin-center will-change-transform animate-spin"
                    style="animation-duration: 4s; background: conic-gradient(from 220deg, #6FF7CC 0%, #44EBCF 16%, #ADFA1F 33%, #C8FF5A 50%, #89F5A0 66%, #37D8C5 82%, #6FF7CC 100%);"
                  />
                </span>
                <span
                  class="absolute inset-[6px] bg-muted rounded-[12px] transition-colors duration-300"
                  :style="isDarkMode
                    ? { background: '#0a0a0d', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9), inset 0 0 2px rgba(0,0,0,0.6)' }
                    : { boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18), inset 0 0 2px rgba(0,0,0,0.1)' }"
                />
              </template>

              <span
                :class="cn(
                  'relative z-10 flex items-center justify-center rounded-[10px] transition-all duration-300',
                  activeId === item.id ? 'h-[calc(100%-18px)] w-[calc(100%-18px)]' : 'h-full w-full'
                )"
              >
                <span class="relative z-10">
                  <!-- Dashboard icon -->
                  <svg v-if="item.icon === 'dashboard'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <!-- Analytics icon -->
                  <svg v-else-if="item.icon === 'analytics'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <line x1="8" y1="17" x2="8" y2="11" /><line x1="12" y1="17" x2="12" y2="7" /><line x1="16" y1="17" x2="16" y2="13" />
                  </svg>
                  <!-- Layers icon -->
                  <svg v-else-if="item.icon === 'layers'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                  <!-- Storage icon -->
                  <svg v-else-if="item.icon === 'storage'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 4h16v6H4z" /><path d="M4 14h16v6H4z" /><circle cx="7" cy="7" r="1" fill="currentColor" /><circle cx="7" cy="17" r="1" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </button>
          </nav>

          <!-- Theme toggle -->
          <div class="relative z-[1] flex items-center px-4">
            <button
              type="button"
              :class="cn('relative flex h-[60px] w-[60px] items-center justify-center rounded-[16px] transition-colors', theme.iconColor)"
              :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="colorMode = isDarkMode ? 'light' : 'dark'"
            >
              <svg v-if="isDarkMode" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-0 lg:hidden" />
  </div>
</template>
