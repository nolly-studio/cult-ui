<script setup lang="ts">
import { Toaster as SonnerToaster } from "vue-sonner"
import { useColorMode } from "@vueuse/core"

defineOptions({ name: "Sonner" })

const { store: theme } = useColorMode()
</script>

<template>
  <SonnerToaster
    :theme="(theme as 'light' | 'dark' | 'system')"
    class="toaster group"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
  />
</template>
