<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import type { Style } from '@/registry/styles'

const props = defineProps<{
  styleName?: Style['name']
}>()

const config = useConfig()

const shouldRender = computed(() => {
  return !props.styleName || config.value.style === props.styleName
})
</script>

<template>
  <slot v-if="shouldRender" />
</template>
