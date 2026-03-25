<script setup lang="ts">
import { ref } from 'vue'
import {
  TerminalAnimationBackgroundGradient,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
} from '../ui/terminal-animation'
import type { TabContent, TerminalLine } from '../ui/terminal-animation'

const backgroundImage = '/component-images/terminal-animation/terminal-animation-bg-2.png'

const tabs: TabContent[] = [
  {
    label: 'install',
    command: 'npm install',
    lines: [
      { text: '', delay: 80 },
      { text: 'added 1,247 packages in 12s', color: 'text-[#6FF7CC]', delay: 400 },
      { text: '', delay: 80 },
      { text: '  Cult UI is looking for funding', color: 'text-slate-400', delay: 150 },
      { text: '    run `npm fund cult-ui` for details', color: 'text-slate-500', delay: 100 },
      { text: '  found 0 vulnerabilities', color: 'text-[#ADFA1F]', delay: 250 },
    ],
  },
  {
    label: 'build',
    command: 'npm run build',
    lines: [
      { text: '', delay: 80 },
      { text: '  ▲ Next.js 16.1.6', color: 'text-slate-300', delay: 300 },
      { text: '  Creating an optimized production build...', color: 'text-slate-400', delay: 250 },
      { text: '  ✓ Compiled successfully', color: 'text-[#6FF7CC]', delay: 200 },
      { text: '  ✓ Build completed in 4.2s', color: 'text-[#6FF7CC]', delay: 300 },
    ],
  },
  {
    label: 'deploy',
    command: 'vercel deploy --prod',
    lines: [
      { text: '', delay: 80 },
      { text: '  Vercel CLI 39.2.0', color: 'text-slate-400', delay: 200 },
      { text: '  > Deploying to production...', color: 'text-[#ED42B5]', delay: 300 },
      { text: '  ✓ Building', color: 'text-[#6FF7CC]', delay: 250 },
      { text: '  ✓ Uploading', color: 'text-[#6FF7CC]', delay: 200 },
      { text: '  ✓ Deployment complete', color: 'text-[#6FF7CC]', delay: 250 },
    ],
  },
]

const animationKey = ref(0)
</script>

<template>
  <TerminalAnimationRoot
    :key="animationKey"
    :always-dark="true"
    :background-image="backgroundImage"
    class="relative flex w-full justify-center overflow-clip bg-background"
    :default-active-tab="1"
    :hide-cursor-on-complete="false"
    :tabs="tabs"
  >
    <button
      class="absolute top-4 left-4 z-20 rounded-md border border-white/25 bg-black/45 px-3 py-1.5 font-mono text-[11px] text-white/90 uppercase tracking-wide transition hover:bg-black/65"
      type="button"
      @click="animationKey++"
    >
      Refresh
    </button>

    <TerminalAnimationContainer class="max-w-[43rem]">
      <TerminalAnimationWindow class="outline-1 outline-white/30 outline-offset-[2px]">
        <TerminalAnimationContent class="min-h-[26rem]">
          <div class="flex items-center gap-2 leading-relaxed">
            <span class="select-none font-mono text-muted-foreground text-[10px] md:text-sm">$</span>
            <TerminalAnimationCommandBar class="font-mono text-foreground text-[10px] md:text-sm">
              <template #cursor>
                <TerminalAnimationBlinkingCursor />
              </template>
            </TerminalAnimationCommandBar>
          </div>
          <TerminalAnimationOutput class="mt-1" />
          <TerminalAnimationTrailingPrompt class="mt-1 flex items-center gap-2 leading-relaxed">
            <span class="select-none font-mono text-muted-foreground text-sm">$</span>
            <TerminalAnimationBlinkingCursor />
          </TerminalAnimationTrailingPrompt>
        </TerminalAnimationContent>

        <div class="flex justify-center pb-6">
          <TerminalAnimationTabList class="inline-flex items-center gap-0 rounded-lg border border-border bg-muted/50 px-1 py-1">
            <TerminalAnimationTabTrigger
              v-for="(tab, i) in tabs"
              :key="tab.label"
              :index="i"
              class="cursor-pointer rounded-md px-3.5 py-1 font-mono text-sm transition-all duration-150 data-[state=active]:bg-primary data-[state=active]:font-medium data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
            >
              {{ tab.label }}
            </TerminalAnimationTabTrigger>
          </TerminalAnimationTabList>
        </div>
      </TerminalAnimationWindow>
    </TerminalAnimationContainer>
  </TerminalAnimationRoot>
</template>
