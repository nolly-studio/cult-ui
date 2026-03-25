<script setup lang="ts">
import { watch } from 'vue'
import { useConfig } from '@/composables/useConfig'

const config = useConfig()
const route = useRoute()

watch(
  [() => route.path, () => config.value.theme],
  () => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className)
      }
    })

    const theme = route.path === '/themes' ? config.value.theme : null
    if (theme) {
      document.body.classList.add(`theme-${theme}`)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div />
</template>
