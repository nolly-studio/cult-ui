<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { CONFIRMATION_KEY } from "./Confirmation.vue"

defineOptions({ name: "ConfirmationActions" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(CONFIRMATION_KEY)!
const show = computed(() => ctx.state() === "approval-requested")
</script>

<template>
  <div
    v-if="show"
    :class="cn('flex items-center justify-end gap-2 self-end', props.class)"
  >
    <slot />
  </div>
</template>
