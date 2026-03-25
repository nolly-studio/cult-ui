<script setup lang="ts">
import { ref, computed, provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

defineOptions({ name: "VoiceSelector" })

export interface VoiceSelectorContextValue {
  value: string | undefined
  setValue: (value: string | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const voiceSelectorKey = Symbol("voiceSelector") as InjectionKey<VoiceSelectorContextValue>

const props = withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  defaultOpen?: boolean
  class?: string
}>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string | undefined]
  "update:open": [open: boolean]
}>()

const internalValue = ref<string | undefined>(props.defaultValue)
const internalOpen = ref(props.defaultOpen)

const value = computed(() => props.modelValue ?? internalValue.value)
const open = computed(() => internalOpen.value)

const setValue = (val: string | undefined) => {
  internalValue.value = val
  emit("update:modelValue", val)
}

const setOpen = (val: boolean) => {
  internalOpen.value = val
  emit("update:open", val)
}

provide(voiceSelectorKey, {
  get value() { return value.value },
  setValue,
  get open() { return open.value },
  setOpen,
})
</script>

<template>
  <Dialog :open="open" @update:open="setOpen">
    <slot />
  </Dialog>
</template>
