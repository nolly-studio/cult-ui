<script setup lang="ts">
import { inject, computed } from "vue"
import { CONFIRMATION_KEY } from "./Confirmation.vue"

defineOptions({ name: "ConfirmationAccepted" })

const ctx = inject(CONFIRMATION_KEY)!

const show = computed(() =>
  ctx.approval?.approved === true &&
  (ctx.state === "approval-responded" || ctx.state === "output-denied" || ctx.state === "output-available")
)
</script>

<template>
  <template v-if="show">
    <slot />
  </template>
</template>
