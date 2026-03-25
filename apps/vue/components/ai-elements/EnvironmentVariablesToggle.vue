<script setup lang="ts">
import { inject } from "vue"
import { Eye, EyeOff } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { ENV_VARS_KEY } from "./EnvironmentVariables.vue"

defineOptions({ name: "EnvironmentVariablesToggle" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(ENV_VARS_KEY)!
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <span class="text-muted-foreground text-xs">
      <Eye v-if="ctx.showValues.value" :size="14" />
      <EyeOff v-else :size="14" />
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="ctx.showValues.value"
      aria-label="Toggle value visibility"
      :class="cn(
        'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors',
        ctx.showValues.value ? 'bg-primary' : 'bg-input'
      )"
      @click="ctx.setShowValues(!ctx.showValues.value)"
    >
      <span
        :class="cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
          ctx.showValues.value ? 'translate-x-4' : 'translate-x-0'
        )"
      />
    </button>
  </div>
</template>
