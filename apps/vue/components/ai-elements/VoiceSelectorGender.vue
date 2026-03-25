<script setup lang="ts">
import { computed } from "vue"
import {
  CircleSmallIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorGender" })

const props = defineProps<{
  value?: "male" | "female" | "transgender" | "androgyne" | "non-binary" | "intersex"
  class?: string
}>()
</script>

<template>
  <span :class="cn('text-muted-foreground text-xs', props.class)">
    <slot>
      <MarsIcon v-if="value === 'male'" class="size-4" />
      <VenusIcon v-else-if="value === 'female'" class="size-4" />
      <TransgenderIcon v-else-if="value === 'transgender'" class="size-4" />
      <MarsStrokeIcon v-else-if="value === 'androgyne'" class="size-4" />
      <NonBinaryIcon v-else-if="value === 'non-binary'" class="size-4" />
      <VenusAndMarsIcon v-else-if="value === 'intersex'" class="size-4" />
      <CircleSmallIcon v-else class="size-4" />
    </slot>
  </span>
</template>
