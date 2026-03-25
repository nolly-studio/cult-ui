<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorAccent" })

const props = defineProps<{
  value?: string
  class?: string
}>()

const accentEmojis: Record<string, string> = {
  american: "\u{1F1FA}\u{1F1F8}",
  british: "\u{1F1EC}\u{1F1E7}",
  australian: "\u{1F1E6}\u{1F1FA}",
  canadian: "\u{1F1E8}\u{1F1E6}",
  irish: "\u{1F1EE}\u{1F1EA}",
  scottish: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
  indian: "\u{1F1EE}\u{1F1F3}",
  "south-african": "\u{1F1FF}\u{1F1E6}",
  "new-zealand": "\u{1F1F3}\u{1F1FF}",
  spanish: "\u{1F1EA}\u{1F1F8}",
  french: "\u{1F1EB}\u{1F1F7}",
  german: "\u{1F1E9}\u{1F1EA}",
  italian: "\u{1F1EE}\u{1F1F9}",
  portuguese: "\u{1F1F5}\u{1F1F9}",
  brazilian: "\u{1F1E7}\u{1F1F7}",
  mexican: "\u{1F1F2}\u{1F1FD}",
  argentinian: "\u{1F1E6}\u{1F1F7}",
  japanese: "\u{1F1EF}\u{1F1F5}",
  chinese: "\u{1F1E8}\u{1F1F3}",
  korean: "\u{1F1F0}\u{1F1F7}",
  russian: "\u{1F1F7}\u{1F1FA}",
  arabic: "\u{1F1F8}\u{1F1E6}",
  dutch: "\u{1F1F3}\u{1F1F1}",
  swedish: "\u{1F1F8}\u{1F1EA}",
  norwegian: "\u{1F1F3}\u{1F1F4}",
  danish: "\u{1F1E9}\u{1F1F0}",
  finnish: "\u{1F1EB}\u{1F1EE}",
  polish: "\u{1F1F5}\u{1F1F1}",
  turkish: "\u{1F1F9}\u{1F1F7}",
  greek: "\u{1F1EC}\u{1F1F7}",
}

const emoji = computed(() => (props.value ? accentEmojis[props.value] ?? null : null))
</script>

<template>
  <span :class="cn('text-muted-foreground text-xs', props.class)">
    <slot>{{ emoji }}</slot>
  </span>
</template>
