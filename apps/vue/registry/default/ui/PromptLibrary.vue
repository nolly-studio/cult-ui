<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  inject,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'
import { cn } from '@/lib/utils'

// ============================================================================
// Types
// ============================================================================

export interface Prompt {
  id: string
  title: string
  description: string
  prompt: string
  category?: string
  isCustom?: boolean
}

export interface PromptLibraryContextValue {
  prompts: Ref<Prompt[]>
  addCustom: (prompt: Omit<Prompt, 'id' | 'isCustom'>) => void
  removeCustom: (id: string) => void
  selectPrompt: (prompt: Prompt) => void
  lastSelectedId: Ref<string | null>
  open: Ref<boolean>
  setOpen: (open: boolean) => void
  createDialogOpen: Ref<boolean>
  setCreateDialogOpen: (open: boolean) => void
}

const PromptLibraryKey: InjectionKey<PromptLibraryContextValue> =
  Symbol('PromptLibrary')

export function usePromptLibrary(): PromptLibraryContextValue {
  const ctx = inject(PromptLibraryKey)
  if (!ctx) {
    throw new Error(
      'usePromptLibrary must be used within a PromptLibrary provider'
    )
  }
  return ctx
}

// ============================================================================
// Props
// ============================================================================

const props = withDefaults(
  defineProps<{
    prompts?: Prompt[]
    open?: boolean
  }>(),
  {
    prompts: undefined,
    open: undefined,
  }
)

const emit = defineEmits<{
  (e: 'promptsChange', prompts: Prompt[]): void
  (e: 'select', prompt: Prompt): void
  (e: 'update:open', open: boolean): void
}>()

// ============================================================================
// State
// ============================================================================

const internalPrompts = ref<Prompt[]>(props.prompts ?? [])
const resolvedPrompts = computed(() => props.prompts ?? internalPrompts.value)

const internalOpen = ref(false)
const resolvedOpen = computed(() =>
  props.open !== undefined ? props.open : internalOpen.value
)

function setOpen(val: boolean) {
  if (props.open !== undefined) {
    emit('update:open', val)
  } else {
    internalOpen.value = val
  }
}

const createDialogOpen = ref(false)
const lastSelectedId = ref<string | null>(null)

async function selectPrompt(prompt: Prompt) {
  lastSelectedId.value = prompt.id

  try {
    await navigator.clipboard.writeText(prompt.prompt)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }

  setOpen(false)
  emit('select', prompt)
}

function addCustom(prompt: Omit<Prompt, 'id' | 'isCustom'>) {
  const newPrompt: Prompt = {
    ...prompt,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    isCustom: true,
  }

  if (props.prompts) {
    emit('promptsChange', [...props.prompts, newPrompt])
  } else {
    internalPrompts.value = [...internalPrompts.value, newPrompt]
  }
}

function removeCustom(id: string) {
  if (props.prompts) {
    emit(
      'promptsChange',
      props.prompts.filter((p) => p.id !== id)
    )
  } else {
    internalPrompts.value = internalPrompts.value.filter((p) => p.id !== id)
  }
}

function setCreateDialogOpen(val: boolean) {
  createDialogOpen.value = val
}

provide(PromptLibraryKey, {
  prompts: resolvedPrompts as unknown as Ref<Prompt[]>,
  addCustom,
  removeCustom,
  selectPrompt,
  lastSelectedId,
  open: resolvedOpen as unknown as Ref<boolean>,
  setOpen,
  createDialogOpen,
  setCreateDialogOpen,
})
</script>

<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// ============================================================================
// PromptLibraryTrigger
// ============================================================================
export const PromptLibraryTrigger = defineComponent({
  name: 'PromptLibraryTrigger',
  props: {
    class: { type: String, default: '' },
    label: { type: String, default: 'Prompts' },
  },
  setup(props, { slots }) {
    const ctx = inject(PromptLibraryKey)!

    return () =>
      h(
        'button',
        {
          class: cn(
            'gap-1.5 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-3',
            props.class
          ),
          type: 'button',
          onClick: () => ctx.setOpen(!ctx.open.value),
        },
        slots.default?.() ?? props.label
      )
  },
})

// ============================================================================
// PromptLibraryContent
// ============================================================================
export const PromptLibraryContent = defineComponent({
  name: 'PromptLibraryContent',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const ctx = inject(PromptLibraryKey)!

    return () =>
      ctx.open.value
        ? h(
            'div',
            {
              class: cn('w-80 p-0 border rounded-lg bg-popover shadow-md', props.class),
              'data-slot': 'prompt-library-content',
            },
            slots.default?.()
          )
        : null
  },
})

// ============================================================================
// PromptLibrarySearch
// ============================================================================
export const PromptLibrarySearch = defineComponent({
  name: 'PromptLibrarySearch',
  props: {
    placeholder: { type: String, default: 'Search prompts...' },
    class: { type: String, default: '' },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('input', {
        type: 'text',
        class: cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 px-4 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-b',
          props.class
        ),
        placeholder: props.placeholder,
        value: props.modelValue,
        'data-slot': 'prompt-library-search',
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLInputElement).value),
      })
  },
})

// ============================================================================
// PromptLibraryList
// ============================================================================
export const PromptLibraryList = defineComponent({
  name: 'PromptLibraryList',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn('max-h-64 overflow-y-auto', props.class),
          'data-slot': 'prompt-library-list',
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PromptLibraryEmpty
// ============================================================================
export const PromptLibraryEmpty = defineComponent({
  name: 'PromptLibraryEmpty',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn('py-6 text-center text-sm text-muted-foreground', props.class),
          'data-slot': 'prompt-library-empty',
        },
        slots.default?.() ?? 'No prompts found.'
      )
  },
})

// ============================================================================
// PromptLibraryGroup
// ============================================================================
export const PromptLibraryGroup = defineComponent({
  name: 'PromptLibraryGroup',
  props: {
    class: { type: String, default: '' },
    heading: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: cn('overflow-hidden p-1', props.class), 'data-slot': 'prompt-library-group' }, [
        props.heading
          ? h(
              'div',
              {
                class: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
              },
              props.heading
            )
          : null,
        slots.default?.(),
      ])
  },
})

// ============================================================================
// PromptLibrarySeparator
// ============================================================================
export const PromptLibrarySeparator = defineComponent({
  name: 'PromptLibrarySeparator',
  props: {
    class: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('div', {
        class: cn('-mx-1 h-px bg-border', props.class),
        'data-slot': 'prompt-library-separator',
      })
  },
})

// ============================================================================
// PromptLibraryItem
// ============================================================================
export const PromptLibraryItem = defineComponent({
  name: 'PromptLibraryItem',
  props: {
    prompt: { type: Object as () => Prompt, required: true },
    disablePreview: { type: Boolean, default: false },
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const ctx = inject(PromptLibraryKey)!

    return () => {
      const isLastSelected = ctx.lastSelectedId.value === props.prompt.id

      return h(
        'div',
        {
          class: cn(
            'group/prompt-item flex cursor-pointer items-start gap-3 py-2 px-2 rounded-md hover:bg-accent text-sm',
            isLastSelected && 'bg-accent/50',
            props.class
          ),
          'data-slot': 'prompt-library-item',
          'data-state': isLastSelected ? 'selected' : 'idle',
          onClick: () => ctx.selectPrompt(props.prompt),
        },
        [
          h('div', { class: 'flex min-w-0 flex-1 flex-col gap-0.5' }, [
            slots.default?.() ?? [
              h(
                'span',
                {
                  class: 'font-medium text-foreground text-xs',
                  'data-slot': 'prompt-library-item-title',
                },
                props.prompt.title
              ),
              h(
                'span',
                {
                  class: 'line-clamp-2 text-muted-foreground text-xs',
                  'data-slot': 'prompt-library-item-description',
                },
                props.prompt.description
              ),
            ],
          ]),
        ]
      )
    }
  },
})

// ============================================================================
// PromptLibraryItemTitle
// ============================================================================
export const PromptLibraryItemTitle = defineComponent({
  name: 'PromptLibraryItemTitle',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'span',
        {
          class: cn('font-medium text-foreground text-xs', props.class),
          'data-slot': 'prompt-library-item-title',
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PromptLibraryItemDescription
// ============================================================================
export const PromptLibraryItemDescription = defineComponent({
  name: 'PromptLibraryItemDescription',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'span',
        {
          class: cn('line-clamp-2 text-muted-foreground text-xs', props.class),
          'data-slot': 'prompt-library-item-description',
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PromptLibraryFooter
// ============================================================================
export const PromptLibraryFooter = defineComponent({
  name: 'PromptLibraryFooter',
  props: {
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn('border-t p-1', props.class),
          'data-slot': 'prompt-library-footer',
        },
        slots.default?.()
      )
  },
})

// ============================================================================
// PromptLibraryCreateTrigger
// ============================================================================
export const PromptLibraryCreateTrigger = defineComponent({
  name: 'PromptLibraryCreateTrigger',
  props: {
    label: { type: String, default: 'New Prompt' },
    class: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const ctx = inject(PromptLibraryKey)!

    function handleSelect() {
      ctx.setOpen(false)
      ctx.setCreateDialogOpen(true)
    }

    return () =>
      h(
        'div',
        {
          class: cn(
            'flex cursor-pointer items-center gap-2 text-muted-foreground px-2 py-2 rounded-md hover:bg-accent text-sm',
            props.class
          ),
          'data-slot': 'prompt-library-create-trigger',
          onClick: handleSelect,
        },
        slots.default?.() ?? [h('span', '+'), ` ${props.label}`]
      )
  },
})

// ============================================================================
// PromptLibraryCreateDialog
// ============================================================================
export const PromptLibraryCreateDialog = defineComponent({
  name: 'PromptLibraryCreateDialog',
  props: {
    title: { type: String, default: 'Create Prompt' },
    description: {
      type: String,
      default: 'Create a custom prompt template for quick access.',
    },
  },
  setup(props, { slots }) {
    const ctx = inject(PromptLibraryKey)!
    const formTitle = ref('')
    const formDescription = ref('')
    const formPrompt = ref('')
    const formCategory = ref('')

    function handleSubmit(e: Event) {
      e.preventDefault()
      if (
        !(
          formTitle.value.trim() &&
          formDescription.value.trim() &&
          formPrompt.value.trim()
        )
      ) {
        return
      }

      ctx.addCustom({
        title: formTitle.value.trim(),
        description: formDescription.value.trim(),
        prompt: formPrompt.value.trim(),
        category: formCategory.value.trim() || undefined,
      })

      formTitle.value = ''
      formDescription.value = ''
      formPrompt.value = ''
      formCategory.value = ''
      ctx.setCreateDialogOpen(false)
    }

    function handleClose() {
      formTitle.value = ''
      formDescription.value = ''
      formPrompt.value = ''
      formCategory.value = ''
      ctx.setCreateDialogOpen(false)
    }

    return () =>
      ctx.createDialogOpen.value
        ? h(
            'div',
            {
              class:
                'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
              onClick: (e: MouseEvent) => {
                if (e.target === e.currentTarget) handleClose()
              },
            },
            [
              h(
                'div',
                {
                  class:
                    'bg-background border rounded-lg shadow-lg w-full max-w-md p-6',
                  'data-slot': 'prompt-library-create-dialog',
                },
                [
                  h('div', { class: 'mb-4' }, [
                    h('h2', { class: 'text-lg font-semibold' }, props.title),
                    h(
                      'p',
                      { class: 'text-sm text-muted-foreground' },
                      props.description
                    ),
                  ]),
                  slots.default?.() ??
                    h(
                      'form',
                      { class: 'flex flex-col gap-4', onSubmit: handleSubmit },
                      [
                        h('div', { class: 'flex flex-col gap-2' }, [
                          h(
                            'label',
                            { class: 'font-medium text-xs', for: 'prompt-title' },
                            'Title'
                          ),
                          h('input', {
                            id: 'prompt-title',
                            class:
                              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            placeholder: 'e.g., Code Review',
                            required: true,
                            value: formTitle.value,
                            onInput: (e: Event) =>
                              (formTitle.value = (
                                e.target as HTMLInputElement
                              ).value),
                          }),
                        ]),
                        h('div', { class: 'flex flex-col gap-2' }, [
                          h(
                            'label',
                            {
                              class: 'font-medium text-xs',
                              for: 'prompt-description',
                            },
                            'Description'
                          ),
                          h('input', {
                            id: 'prompt-description',
                            class:
                              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            placeholder:
                              'e.g., Review code for best practices',
                            required: true,
                            value: formDescription.value,
                            onInput: (e: Event) =>
                              (formDescription.value = (
                                e.target as HTMLInputElement
                              ).value),
                          }),
                        ]),
                        h('div', { class: 'flex flex-col gap-2' }, [
                          h(
                            'label',
                            {
                              class: 'font-medium text-xs',
                              for: 'prompt-content',
                            },
                            'Prompt'
                          ),
                          h('textarea', {
                            id: 'prompt-content',
                            class:
                              'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none',
                            placeholder: 'Enter the prompt text...',
                            required: true,
                            value: formPrompt.value,
                            onInput: (e: Event) =>
                              (formPrompt.value = (
                                e.target as HTMLTextAreaElement
                              ).value),
                          }),
                        ]),
                        h('div', { class: 'flex flex-col gap-2' }, [
                          h(
                            'label',
                            {
                              class: 'font-medium text-xs',
                              for: 'prompt-category',
                            },
                            'Category (optional)'
                          ),
                          h('input', {
                            id: 'prompt-category',
                            class:
                              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            placeholder: 'e.g., Development',
                            value: formCategory.value,
                            onInput: (e: Event) =>
                              (formCategory.value = (
                                e.target as HTMLInputElement
                              ).value),
                          }),
                        ]),
                        h(
                          'div',
                          { class: 'flex justify-end gap-2 pt-2' },
                          [
                            h(
                              'button',
                              {
                                type: 'button',
                                class:
                                  'inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4',
                                onClick: handleClose,
                              },
                              'Cancel'
                            ),
                            h(
                              'button',
                              {
                                type: 'submit',
                                class:
                                  'inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4',
                              },
                              'Create'
                            ),
                          ]
                        ),
                      ]
                    ),
                ]
              ),
            ]
          )
        : null
  },
})
</script>
