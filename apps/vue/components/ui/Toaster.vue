<script setup lang="ts">
import { useToast } from "@/composables/useToast"
import Toast from "@/components/ui/Toast.vue"
import ToastClose from "@/components/ui/ToastClose.vue"
import ToastDescription from "@/components/ui/ToastDescription.vue"
import ToastProvider from "@/components/ui/ToastProvider.vue"
import ToastTitle from "@/components/ui/ToastTitle.vue"
import ToastViewport from "@/components/ui/ToastViewport.vue"

defineOptions({ name: "Toaster" })

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast
      v-for="t in toasts"
      :key="t.id"
      :variant="t.variant"
      :open="t.open"
      :duration="t.duration"
      @update:open="t.onOpenChange?.($event)"
    >
      <div class="grid gap-1">
        <ToastTitle v-if="t.title">{{ t.title }}</ToastTitle>
        <ToastDescription v-if="t.description">{{
          t.description
        }}</ToastDescription>
      </div>
      <component :is="t.action" v-if="t.action" />
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
