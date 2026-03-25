<script setup lang="ts">
import { ref } from 'vue'
import { Check, Paintbrush, RotateCcw, Sun, Moon, Copy } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/useConfig'
import { themes } from '@/registry/themes'
import ThemeWrapper from './ThemeWrapper.vue'

const config = useConfig()
const colorMode = useColorMode()
const mounted = useMounted()

const mode = computed(() => colorMode.value)
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- Mobile drawer -->
    <Drawer>
      <DrawerTrigger as-child>
        <Button variant="outline" class="md:hidden">
          <Paintbrush class="mr-2 size-4" />
          Customize
        </Button>
      </DrawerTrigger>
      <DrawerContent class="p-6 pt-0">
        <ThemeCustomizerPanel />
      </DrawerContent>
    </Drawer>

    <!-- Desktop -->
    <div class="hidden md:flex">
      <div class="mr-2 hidden items-center space-x-0.5 lg:flex">
        <template v-if="mounted">
          <template v-for="color in ['zinc', 'rose', 'blue', 'green', 'orange']" :key="color">
            <template v-for="theme in [themes.find(t => t.name === color)]" :key="theme?.name">
              <TooltipProvider v-if="theme">
                <Tooltip>
                  <TooltipTrigger as-child>
                    <button
                      :class="cn(
                        'flex size-9 items-center justify-center rounded-full border-2 text-xs',
                        config.theme === color
                          ? 'border-[--theme-primary]'
                          : 'border-transparent',
                      )"
                      :style="{ '--theme-primary': `hsl(${theme.activeColor[mode === 'dark' ? 'dark' : 'light']})` }"
                      @click="config.theme = color"
                    >
                      <span class="flex size-6 items-center justify-center rounded-full bg-[--theme-primary]">
                        <Check v-if="config.theme === color" class="size-4 text-white" />
                      </span>
                      <span class="sr-only">{{ theme.label }}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent align="center" class="rounded-[0.5rem] bg-zinc-900 text-zinc-50">
                    {{ theme.label }}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </template>
          </template>
        </template>
        <div v-else class="mr-1 flex items-center gap-4">
          <Skeleton v-for="i in 5" :key="i" class="size-6 rounded-full" />
        </div>
      </div>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">
            <Paintbrush class="mr-2 size-4" />
            Customize
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          class="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
        >
          <ThemeCustomizerPanel />
        </PopoverContent>
      </Popover>
    </div>

    <!-- Copy code dialog -->
    <Dialog>
      <DialogTrigger as-child>
        <Button class="hidden md:flex">Copy code</Button>
      </DialogTrigger>
      <DialogContent class="max-w-2xl outline-none">
        <DialogHeader>
          <DialogTitle>Theme</DialogTitle>
          <DialogDescription>
            Copy and paste the following code into your CSS file.
          </DialogDescription>
        </DialogHeader>
        <ThemeWrapper default-theme="zinc" class="relative">
          <ThemeCustomizerCode />
        </ThemeWrapper>
      </DialogContent>
    </Dialog>
  </div>
</template>
