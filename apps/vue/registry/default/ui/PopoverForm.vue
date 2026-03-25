<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUp, Loader } from 'lucide-vue-next'
import { useClickOutside } from '@/composables/useClickOutside'

const props = withDefaults(
  defineProps<{
    open: boolean
    showSuccess: boolean
    width?: string
    height?: string
    showCloseButton?: boolean
    title?: string
  }>(),
  {
    width: '364px',
    height: '192px',
    title: 'Feedback',
    showCloseButton: false,
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const popoverRef = ref<HTMLDivElement | null>(null)

useClickOutside(popoverRef, () => {
  emit('update:open', false)
})
</script>

<template>
  <div :key="title" class="flex min-h-[300px] w-full items-center justify-center">
    <!-- Trigger button -->
    <button
      v-if="!open"
      class="flex h-9 items-center border bg-white dark:bg-[#121212] px-3 text-sm font-medium outline-none rounded-lg"
      @click="emit('update:open', true)"
    >
      <span>{{ title }}</span>
    </button>

    <!-- Open popover -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        ref="popoverRef"
        class="absolute p-1 overflow-hidden bg-muted shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04)] outline-none rounded-[10px]"
        :style="{ width, height }"
      >
        <span
          aria-hidden="true"
          class="absolute left-4 top-[17px] text-sm text-muted-foreground"
          :class="{ 'text-transparent': showSuccess }"
        >
          {{ title }}
        </span>

        <!-- Close button -->
        <div
          v-if="showCloseButton"
          class="absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-[12px] h-[26px] flex items-center justify-center z-20"
        >
          <button
            class="absolute z-10 -mt-1 flex items-center justify-center w-[10px] h-[6px] text-muted-foreground hover:text-foreground focus:outline-none rounded-full"
            aria-label="Close"
            @click="emit('update:open', false)"
          >
            <ChevronUp class="text-muted-foreground/80" />
          </button>
          <PopoverFormCutOutTopIcon />
        </div>

        <!-- Content area -->
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-8 blur-[4px]"
          enter-to-class="opacity-100 translate-y-0 blur-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0 blur-0"
          leave-to-class="opacity-0 translate-y-2 blur-[4px]"
        >
          <div
            v-if="showSuccess"
            key="success"
            class="flex h-full flex-col items-center justify-center"
          >
            <slot name="success">
              <PopoverFormSuccess />
            </slot>
          </div>
          <div
            v-else
            key="open-child"
            class="h-full border bg-white dark:bg-[#121212] z-20 rounded-[10px]"
          >
            <slot name="open" />
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, TransitionGroup } from 'vue'

export const PopoverFormButton = defineComponent({
  name: 'PopoverFormButton',
  props: {
    loading: { type: Boolean, required: true },
    text: { type: String, default: 'submit' },
  },
  setup(props) {
    return () =>
      h(
        'button',
        {
          type: 'submit',
          class:
            'ml-auto flex h-6 w-26 items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-primary/90 to-primary px-3 text-xs font-semibold text-primary-foreground shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff]',
        },
        [
          h(
            'span',
            { class: 'flex w-full items-center justify-center' },
            props.loading
              ? [h(Loader, { class: 'animate-spin size-3' })]
              : [h('span', props.text)]
          ),
        ]
      )
  },
})

export const PopoverFormSuccess = defineComponent({
  name: 'PopoverFormSuccess',
  props: {
    title: { type: String, default: 'Success' },
    description: { type: String, default: 'Thank you for your submission' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'flex flex-col items-center justify-center' }, [
        h(
          'svg',
          {
            width: '32',
            height: '32',
            viewBox: '0 0 32 32',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            class: '-mt-1',
          },
          [
            h('path', {
              d: 'M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z',
              fill: '#2090FF',
              'fill-opacity': '0.16',
            }),
            h('path', {
              d: 'M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z',
              stroke: '#2090FF',
              'stroke-width': '2.4',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
            }),
          ]
        ),
        h('h3', { class: 'mb-1 mt-2 text-sm font-medium text-primary' }, props.title),
        h(
          'p',
          {
            class:
              'text-sm text-muted-foreground max-w-xs text-pretty mx-auto text-center',
          },
          props.description
        ),
      ])
  },
})

export const PopoverFormSeparator = defineComponent({
  name: 'PopoverFormSeparator',
  props: {
    width: { type: [Number, String], default: 352 },
    height: { type: Number, default: 2 },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          class: 'absolute left-0 right-0 top-[-1px]',
          width: props.width,
          height: props.height,
          viewBox: '0 0 352 2',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        [
          h('path', {
            d: 'M0 1H352',
            class: 'stroke-border',
            'stroke-dasharray': '4 4',
          }),
        ]
      )
  },
})

export const PopoverFormCutOutTopIcon = defineComponent({
  name: 'PopoverFormCutOutTopIcon',
  props: {
    width: { type: Number, default: 44 },
    height: { type: Number, default: 30 },
  },
  setup(props) {
    const aspectRatio = 6 / 12
    const calculatedHeight = props.width * aspectRatio
    const calculatedWidth = props.height / aspectRatio
    const finalWidth = Math.min(props.width, calculatedWidth)
    const finalHeight = Math.min(props.height, calculatedHeight)

    return () =>
      h(
        'svg',
        {
          width: finalWidth,
          height: finalHeight,
          viewBox: '0 0 6 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'rotate-90 mt-[1px]',
          preserveAspectRatio: 'none',
        },
        [
          h('g', { 'clip-path': 'url(#clip0_2029_22)' }, [
            h('path', {
              d: 'M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z',
              class: 'fill-muted',
            }),
            h('path', {
              d: 'M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0',
              class: 'stroke-border',
              'stroke-width': '0.6',
              'stroke-linejoin': 'round',
            }),
          ]),
          h('defs', [
            h('clipPath', { id: 'clip0_2029_22' }, [
              h('rect', { width: finalWidth, height: finalHeight, fill: 'white' }),
            ]),
          ]),
        ]
      )
  },
})

export const PopoverFormCutOutLeftIcon = defineComponent({
  name: 'PopoverFormCutOutLeftIcon',
  setup() {
    return () =>
      h(
        'svg',
        {
          width: '6',
          height: '12',
          viewBox: '0 0 6 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        [
          h('g', { 'clip-path': 'url(#clip0_2029_22)' }, [
            h('path', {
              d: 'M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z',
              class: 'fill-muted',
            }),
            h('path', {
              d: 'M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0',
              class: 'stroke-border',
              'stroke-width': '1',
              'stroke-linejoin': 'round',
            }),
          ]),
          h('defs', [
            h('clipPath', { id: 'clip0_2029_22' }, [
              h('rect', { width: '6', height: '12', fill: 'white' }),
            ]),
          ]),
        ]
      )
  },
})

export const PopoverFormCutOutRightIcon = defineComponent({
  name: 'PopoverFormCutOutRightIcon',
  setup() {
    return () =>
      h(
        'svg',
        {
          width: '6',
          height: '12',
          viewBox: '0 0 6 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        [
          h('g', { 'clip-path': 'url(#clip0_2029_22)' }, [
            h('path', {
              d: 'M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z',
              class: 'fill-muted',
            }),
            h('path', {
              d: 'M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0',
              class: 'stroke-border',
              'stroke-width': '1',
              'stroke-linejoin': 'round',
            }),
          ]),
          h('defs', [
            h('clipPath', { id: 'clip0_2029_22' }, [
              h('rect', { width: '6', height: '12', fill: 'white' }),
            ]),
          ]),
        ]
      )
  },
})
