<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()

// Note: This component wraps vaul-vue (the Vue port of vaul).
// Install: npm install vaul-vue
// Usage:
//   <Drawer>
//     <DrawerTrigger>Open</DrawerTrigger>
//     <DrawerContent>...</DrawerContent>
//   </Drawer>
</script>

<script lang="ts">
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent as DrawerContentPrimitive,
} from 'vaul-vue'
import { defineComponent, h, type SetupContext } from 'vue'

const DrawerContentWrapped = defineComponent({
  name: 'DrawerContent',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }: SetupContext) {
    return () =>
      h(DrawerPortal, null, () => [
        h(DrawerOverlay, { class: 'fixed inset-0 z-50 bg-black/80' }),
        h(
          DrawerContentPrimitive,
          {
            class: cn(
              'fixed inset-x-0 bottom-0 z-50 mt-24 h-[96%] rounded-t-[10px] bg-background',
              props.class
            ),
          },
          () => [
            h('div', {
              class:
                'absolute left-1/2 top-3 h-2 w-[100px] translate-x-[-50%] rounded-full bg-muted',
            }),
            slots.default?.(),
          ]
        ),
      ])
  },
})

export { DrawerRoot as Drawer, DrawerTrigger, DrawerContentWrapped as DrawerContent }
</script>

<template>
  <!-- This file exports Drawer, DrawerTrigger, DrawerContent for use in other components -->
  <slot />
</template>
