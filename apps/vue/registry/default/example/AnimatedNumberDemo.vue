<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { AnimatedNumber } from '@/registry/default/ui/animated-number'
import { GradientHeading } from '@/registry/default/ui/gradient-heading'
import {
  TextureCardContent,
  TextureCardHeader,
  TextureCardStyled,
} from '@/registry/default/ui/texture-card'
</script>

<template>
  <div class="max-w-xl gap-4 py-6 mx-auto">
    <div class="w-full flex flex-col gap-2 justify-between">
      <CustomSpringExample />
      <div class="flex flex-col sm:flex-row gap-2">
        <PrecisionExample />
        <FormatExample />
        <HooksExample />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

const PrecisionExample = defineComponent({
  setup() {
    const value = ref(14.5678)
    return () =>
      h(TextureCardStyled, null, () =>
        [
          h(TextureCardHeader, { class: 'pl-3' }, () =>
            h(GradientHeading, { size: 'xxs' }, () => 'Precision')
          ),
          h(TextureCardContent, null, () =>
            h('div', { class: 'flex gap-2' }, [
              h('div', { class: 'text-2xl font-bold', style: { minWidth: '80px', textAlign: 'left' } }, [
                h(AnimatedNumber, { value: value.value, precision: 2 }),
              ]),
              h('button', {
                class: 'border border-primary/10 rounded-full ml-auto py-5 px-3',
                onClick: () => { value.value += 13.456 },
              }, [h(Plus, { class: 'h-4 w-4' })]),
            ])
          ),
        ]
      )
  },
})

const FormatExample = defineComponent({
  setup() {
    const value = ref(10)
    const customFormat = (num: number) => `$${num.toFixed(2)}`
    return () =>
      h(TextureCardStyled, null, () =>
        [
          h(TextureCardHeader, { class: 'pl-3' }, () =>
            h(GradientHeading, { size: 'xxs' }, () => 'Format')
          ),
          h(TextureCardContent, null, () =>
            h('div', { class: 'flex gap-2' }, [
              h('div', { class: 'text-2xl font-bold', style: { minWidth: '120px', textAlign: 'left' } }, [
                h(AnimatedNumber, { value: value.value, format: customFormat }),
              ]),
              h('button', {
                class: 'border border-primary/10 rounded-full ml-auto py-5 px-3',
                onClick: () => { value.value += 50 },
              }, [h(Plus, { class: 'h-4 w-4' })]),
            ])
          ),
        ]
      )
  },
})

const HooksExample = defineComponent({
  setup() {
    const value = ref(10)
    return () =>
      h(TextureCardStyled, null, () =>
        [
          h(TextureCardHeader, { class: 'pl-3' }, () =>
            h(GradientHeading, { size: 'xxs' }, () => 'Callbacks')
          ),
          h(TextureCardContent, null, () =>
            h('div', { class: 'flex gap-2' }, [
              h('div', { class: 'text-2xl font-bold', style: { minWidth: '50px', textAlign: 'left' } }, [
                h(AnimatedNumber, { value: value.value }),
              ]),
              h('button', {
                class: 'border border-primary/10 rounded-full ml-auto py-5 px-3',
                onClick: () => { value.value += 20 },
              }, [h(Plus, { class: 'h-4 w-4' })]),
            ])
          ),
        ]
      )
  },
})

const CustomSpringExample = defineComponent({
  setup() {
    const value = ref(1000)
    const mass = ref(1)
    const stiffness = ref(100)
    const damping = ref(40)
    return () =>
      h(TextureCardStyled, { class: 'w-full' }, () =>
        [
          h(TextureCardHeader, { class: 'px-3' }, () =>
            h(GradientHeading, { size: 'sm' }, () => 'Custom Spring Properties')
          ),
          h(TextureCardContent, { class: 'flex flex-col sm:flex-row justify-between items-center gap-8' }, () => [
            h('div', { class: 'text-6xl font-bold mr-auto flex', style: { minWidth: '150px', textAlign: 'right' } }, [
              h(AnimatedNumber, { value: value.value, mass: mass.value, stiffness: stiffness.value, damping: damping.value }),
            ]),
            h('div', { class: 'flex flex-col gap-3 px-2' }, [
              h('button', { class: 'border border-primary/10 rounded-full py-5 px-4', onClick: () => { value.value += 500 } }, [
                h(Plus, { class: 'h-4 w-4 mr-2' }), 'Increase',
              ]),
              h('button', {
                class: 'border border-primary/10 rounded-full py-5 px-4',
                disabled: value.value <= 500,
                onClick: () => { value.value -= 300 },
              }, [h(Minus, { class: 'h-4 w-4 mr-2' }), 'Decrease']),
            ]),
            h('div', { class: 'ml-auto w-full' }, [
              h('div', { class: 'flex flex-col gap-4' }, [
                h('div', { class: 'ml-auto w-full' }, [
                  h('label', null, `Mass: ${mass.value}`),
                  h('input', { type: 'range', min: 0.1, max: 5, step: 0.1, value: mass.value, class: 'w-full', onInput: (e: Event) => { mass.value = Number((e.target as HTMLInputElement).value) } }),
                ]),
                h('div', { class: 'ml-auto w-full' }, [
                  h('label', null, `Stiffness: ${stiffness.value}`),
                  h('input', { type: 'range', min: 1, max: 200, step: 1, value: stiffness.value, class: 'w-full', onInput: (e: Event) => { stiffness.value = Number((e.target as HTMLInputElement).value) } }),
                ]),
                h('div', { class: 'ml-auto w-full' }, [
                  h('label', null, `Damping: ${damping.value}`),
                  h('input', { type: 'range', min: 1, max: 50, step: 1, value: damping.value, class: 'w-full', onInput: (e: Event) => { damping.value = Number((e.target as HTMLInputElement).value) } }),
                ]),
              ]),
            ]),
          ]),
        ]
      )
  },
})

export default defineComponent({
  components: { PrecisionExample, FormatExample, HooksExample, CustomSpringExample },
})
</script>
