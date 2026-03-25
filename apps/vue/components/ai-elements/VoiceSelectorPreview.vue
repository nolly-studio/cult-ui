<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { PauseIcon, PlayIcon } from "lucide-vue-next"

defineOptions({ name: "VoiceSelectorPreview" })

const props = withDefaults(defineProps<{
  playing?: boolean
  loading?: boolean
  class?: string
}>(), {
  playing: false,
  loading: false,
})

const emit = defineEmits<{
  play: []
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  emit("click", event)
  emit("play")
}
</script>

<template>
  <Button
    :aria-label="playing ? 'Pause preview' : 'Play preview'"
    :class="cn('size-6', props.class)"
    :disabled="loading"
    size="icon-sm"
    type="button"
    variant="outline"
    @click="handleClick"
  >
    <Spinner v-if="loading" class="size-3" />
    <PauseIcon v-else-if="playing" class="size-3" />
    <PlayIcon v-else class="size-3" />
  </Button>
</template>
