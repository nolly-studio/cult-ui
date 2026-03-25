<script setup lang="ts">
import { computed } from "vue"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue"
import { X } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "Dialog" })

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
  }>(),
  { modal: true }
)

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()

const openModel = computed({
  get: () => props.open,
  set: (val) => emit("update:open", val),
})
</script>

<template>
  <DialogRoot v-model:open="openModel" :modal="modal">
    <slot />
  </DialogRoot>
</template>
