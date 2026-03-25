<script setup lang="ts">
interface Props {
  url: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative">
    <div
      class="pointer-events-none fixed inset-0 mix-blend-hard-light"
      :style="{ backgroundImage: `url('${url}')` }"
    />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
