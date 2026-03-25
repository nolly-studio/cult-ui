<script setup lang="ts">
import { ref, provide, computed, type InjectionKey } from "vue"
import { Eye, EyeOff, Check, Copy } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "EnvironmentVariables" })

export const ENV_VARS_KEY = Symbol("env-vars") as InjectionKey<{
  showValues: Ref<boolean>
  setShowValues: (show: boolean) => void
}>

const props = withDefaults(
  defineProps<{
    class?: string
    defaultShowValues?: boolean
  }>(),
  { defaultShowValues: false }
)

const emit = defineEmits<{
  "update:showValues": [value: boolean]
}>()

const showValues = ref(props.defaultShowValues)

function setShowValues(show: boolean) {
  showValues.value = show
  emit("update:showValues", show)
}

provide(ENV_VARS_KEY, { showValues, setShowValues })
</script>

<template>
  <div :class="cn('rounded-lg border bg-background', props.class)">
    <slot />
  </div>
</template>
