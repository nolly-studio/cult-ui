<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowUpLeftSquareIcon,
  Loader,
  Mail,
  MessageCircle,
  MousePointerClickIcon,
  User,
  Waves,
} from 'lucide-vue-next'
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  useScheduledAnimations,
  type SizePresets,
} from '@/registry/default/ui/dynamic-island'
</script>

<template>
  <DynamicIslandProvider initial-size="default">
    <div>
      <DynamicAction />
    </div>
  </DynamicIslandProvider>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

const DynamicAction = defineComponent({
  setup() {
    const { state: blobState, setSize } = useDynamicIslandSize()

    const blobStates: SizePresets[] = ['compact', 'large', 'tall', 'long', 'medium']

    function cycleBlobStates() {
      const currentIndex = blobStates.indexOf(blobState.value.size)
      const nextIndex = (currentIndex + 1) % blobStates.length
      setSize(blobStates[nextIndex])
    }

    useScheduledAnimations([
      { size: 'compact', delay: 1000 },
      { size: 'large', delay: 1200 },
      { size: 'tall', delay: 1600 },
      { size: 'long', delay: 1800 },
      { size: 'medium', delay: 2200 },
    ])

    return () =>
      h('div', { class: 'h-full' }, [
        h('div', { class: 'flex flex-col gap-4 h-full' }, [
          h('div', { class: 'absolute top-12 left-12' }, [
            h(
              'button',
              {
                onClick: cycleBlobStates,
                disabled: blobState.value.isAnimating,
                class: 'mt-4 p-2 border rounded-md max-w-[200px] inline-flex items-center text-sm',
              },
              [h(MousePointerClickIcon, { class: 'mr-1 h-4 w-4' }), 'Click to cycle states']
            ),
          ]),
          h('div', { class: 'absolute top-1 right-2' }, [
            h('div', null, [
              h('span', { class: 'rounded-md border px-2 py-0.5 text-xs mr-1' }, `prev - ${blobState.value.previousSize}`),
              h('span', { class: 'rounded-md border px-2 py-0.5 text-xs' }, `cur - ${blobState.value.size}`),
            ]),
          ]),
          h(DynamicIsland, { id: 'dynamic-blob' }, {
            default: () => {
              switch (blobState.value.size) {
                case 'compact':
                  return h(DynamicContainer, { class: 'flex items-center justify-center h-full w-full' }, () =>
                    h('div', { class: 'relative w-full flex items-center' }, [
                      h(DynamicDescription, { class: 'absolute left-4 my-auto text-lg font-medium tracking-tighter text-white' }, () =>
                        h(MessageCircle, { class: 'h-5 w-5 fill-cyan-400 text-cyan-400' })
                      ),
                      h(DynamicDescription, { class: 'absolute text-white right-4 my-auto text-lg font-bold tracking-tighter' }, () => 'newcult.co'),
                    ])
                  )
                case 'large':
                  return h(DynamicContainer, { class: 'flex items-center justify-center h-full w-full' }, () =>
                    h('div', { class: 'relative flex w-full items-center justify-between gap-6 px-4' }, [
                      h(Loader, { class: 'animate-spin h-12 w-12 text-yellow-300' }),
                      h(DynamicTitle, { class: 'my-auto text-2xl font-black tracking-tighter text-white' }, () => 'loading'),
                    ])
                  )
                case 'tall':
                  return h(DynamicContainer, { class: 'flex flex-col mt-6 w-full items-start gap-1 px-8 font-semibold' }, () => [
                    h(DynamicDescription, { class: 'bg-cyan-300 rounded-2xl tracking-tight leading-5 p-2' }, () => 'The Cult of Pythagoras'),
                    h(DynamicDescription, { class: 'bg-cyan-300 rounded-2xl tracking-tight leading-5 p-2 text-left' }, () =>
                      'Music of the Spheres, an idea that celestial bodies produce a form of music through their movements'
                    ),
                    h(DynamicTitle, { class: 'text-4xl font-black tracking-tighter text-cyan-100' }, () => 'any cool cults?'),
                  ])
                case 'long':
                  return h(DynamicContainer, { class: 'flex items-center justify-center h-full w-full' }, () =>
                    h(DynamicDiv, { class: 'relative flex w-full items-center justify-between gap-6 px-4' }, () => [
                      h('div', null, [h(Waves, { class: 'text-cyan-400 h-8 w-8' })]),
                      h(DynamicTitle, { class: 'my-auto text-xl font-black tracking-tighter text-white' }, () => 'Supercalifragilisticexpialid'),
                    ])
                  )
                case 'medium':
                  return h(DynamicContainer, { class: 'flex flex-col justify-between px-2 pt-4 text-left text-white h-full' }, () => [
                    h(DynamicTitle, { class: 'text-2xl pl-3 font-black tracking-tighter' }, () => 'Reincarnation, welcome back'),
                    h(DynamicDescription, { class: 'leading-5 text-neutral-500 pl-3' }, () => 'Good for small tasks or call outs'),
                    h(DynamicDiv, { class: 'flex flex-col mt-auto space-y-1 mb-2 bg-neutral-700 p-2 rounded-b-2xl' }, () => [
                      h('button', { class: 'w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground' }, [
                        h(Mail, { class: 'mr-2 h-4 w-4 fill-cyan-400 text-neutral-900' }), 'Login with email',
                      ]),
                      h('button', { class: 'w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground mt-1' }, [
                        h(User, { class: 'mr-2 h-4 w-4 fill-cyan-400 text-cyan-400' }), 'Join the cult now',
                      ]),
                    ]),
                  ])
                default:
                  return h('div', { class: 'flex items-center justify-center h-full w-full' }, [
                    h(ArrowUpLeftSquareIcon, { class: 'text-white' }),
                    h('p', { class: 'text-white' }, 'cycle states'),
                  ])
              }
            },
          }),
        ]),
      ])
  },
})

export default defineComponent({
  components: { DynamicAction },
})
</script>
