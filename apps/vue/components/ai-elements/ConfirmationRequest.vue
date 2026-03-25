<script setup lang="ts">
import { inject, computed } from "vue"
import { CONFIRMATION_KEY } from "./Confirmation.vue"

defineOptions({ name: "ConfirmationRequest" })

const ctx = inject(CONFIRMATION_KEY)!
const show = computed(() => ctx.state() === "approval-requested")
</script>

<template>
  <template v-if="show">
    <slot />
  </template>
</template>
