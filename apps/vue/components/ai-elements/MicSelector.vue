<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, type InjectionKey } from "vue"
import { ChevronsUpDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "MicSelector" })

export const MIC_SELECTOR_KEY = Symbol("mic-selector") as InjectionKey<{
  devices: Ref<MediaDeviceInfo[]>
  value: Ref<string | undefined>
  open: Ref<boolean>
  onValueChange: (value: string) => void
  onOpenChange: (open: boolean) => void
}>

const props = defineProps<{
  class?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string | undefined]
}>()

const devices = ref<MediaDeviceInfo[]>([])
const value = ref(props.modelValue)
const open = ref(false)
const loading = ref(true)
const hasPermission = ref(false)

async function loadDevicesWithoutPermission() {
  try {
    loading.value = true
    const deviceList = await navigator.mediaDevices.enumerateDevices()
    devices.value = deviceList.filter((d) => d.kind === "audioinput")
  } catch (e) {
    console.error("Error getting audio devices:", e)
  } finally {
    loading.value = false
  }
}

async function loadDevicesWithPermission() {
  if (loading.value) return
  try {
    loading.value = true
    const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    for (const track of tempStream.getTracks()) track.stop()
    const deviceList = await navigator.mediaDevices.enumerateDevices()
    devices.value = deviceList.filter((d) => d.kind === "audioinput")
    hasPermission.value = true
  } catch (e) {
    console.error("Error getting audio devices:", e)
  } finally {
    loading.value = false
  }
}

function onValueChange(val: string) {
  value.value = val
  emit("update:modelValue", val)
}

function onOpenChange(val: boolean) {
  open.value = val
  if (val && !hasPermission.value && !loading.value) {
    loadDevicesWithPermission()
  }
}

onMounted(() => {
  loadDevicesWithoutPermission()
})

provide(MIC_SELECTOR_KEY, { devices, value, open, onValueChange, onOpenChange })
</script>

<template>
  <div :class="cn('relative', props.class)">
    <slot :devices="devices" :value="value" :open="open" />
  </div>
</template>
