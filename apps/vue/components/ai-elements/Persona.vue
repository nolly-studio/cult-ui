<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from "vue"
import { cn } from "@/lib/utils"
import Rive from "@rive-app/canvas"

defineOptions({ name: "Persona" })

export type PersonaState = "idle" | "listening" | "thinking" | "speaking" | "asleep"

type VariantKey = "command" | "glint" | "halo" | "mana" | "obsidian" | "opal"

const props = withDefaults(
  defineProps<{
    state?: PersonaState
    class?: string
    variant?: VariantKey
  }>(),
  {
    state: "idle",
    variant: "obsidian",
  }
)

const emit = defineEmits<{
  load: []
  loadError: [err: unknown]
  ready: []
  pause: []
  play: []
  stop: []
}>()

const stateMachine = "default"

const sources: Record<VariantKey, { source: string; dynamicColor: boolean; hasModel: boolean }> = {
  command: {
    dynamicColor: true,
    hasModel: true,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv",
  },
  glint: {
    dynamicColor: true,
    hasModel: true,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv",
  },
  halo: {
    dynamicColor: true,
    hasModel: true,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv",
  },
  mana: {
    dynamicColor: false,
    hasModel: true,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv",
  },
  obsidian: {
    dynamicColor: true,
    hasModel: true,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv",
  },
  opal: {
    dynamicColor: false,
    hasModel: false,
    source: "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv",
  },
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let riveInstance: InstanceType<typeof Rive> | null = null

function getCurrentTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    if (document.documentElement.classList.contains("dark")) {
      return "dark"
    }
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
  }
  return "light"
}

const theme = ref<"light" | "dark">(getCurrentTheme())
let observer: MutationObserver | null = null
let mql: MediaQueryList | null = null

const source = computed(() => sources[props.variant])

function updateStateMachineInputs() {
  if (!riveInstance) return
  const inputs = riveInstance.stateMachineInputs(stateMachine)
  if (!inputs) return

  for (const input of inputs) {
    if (input.name === "listening") {
      input.value = props.state === "listening"
    } else if (input.name === "thinking") {
      input.value = props.state === "thinking"
    } else if (input.name === "speaking") {
      input.value = props.state === "speaking"
    } else if (input.name === "asleep") {
      input.value = props.state === "asleep"
    }
  }
}

function updateDynamicColor() {
  if (!riveInstance || !source.value.dynamicColor || !source.value.hasModel) return

  try {
    const viewModel = riveInstance.viewModelByName?.("default")
    if (!viewModel) return
    const instance = viewModel.defaultInstance?.()
    if (!instance) return
    const colorProp = instance.color?.("color")
    if (!colorProp) return

    const [r, g, b] = theme.value === "dark" ? [255, 255, 255] : [0, 0, 0]
    colorProp.setRgb(r, g, b)
  } catch {
    // View model API may not be available on all Rive versions
  }
}

function initRive() {
  if (!canvasRef.value) return

  riveInstance?.cleanup()
  riveInstance = null

  riveInstance = new Rive({
    src: source.value.source,
    canvas: canvasRef.value,
    autoplay: true,
    stateMachines: stateMachine,
    onLoad: () => {
      riveInstance?.resizeDrawingSurfaceToCanvas()
      updateStateMachineInputs()
      updateDynamicColor()
      emit("load")
    },
    onLoadError: (err) => {
      emit("loadError", err)
    },
    onPlay: () => {
      emit("play")
    },
    onPause: () => {
      emit("pause")
    },
    onStop: () => {
      emit("stop")
    },
  })
}

onMounted(() => {
  initRive()

  // Watch theme changes for dynamic color
  if (source.value.dynamicColor) {
    observer = new MutationObserver(() => {
      theme.value = getCurrentTheme()
    })
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })

    if (window.matchMedia) {
      mql = window.matchMedia("(prefers-color-scheme: dark)")
      const handleMediaChange = () => {
        theme.value = getCurrentTheme()
      }
      mql.addEventListener("change", handleMediaChange)
    }
  }
})

onUnmounted(() => {
  riveInstance?.cleanup()
  riveInstance = null
  observer?.disconnect()
  if (mql) {
    mql.removeEventListener("change", () => {})
  }
})

watch(() => props.state, () => {
  updateStateMachineInputs()
})

watch(theme, () => {
  updateDynamicColor()
})

watch(() => props.variant, () => {
  initRive()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :class="cn('size-16 shrink-0', props.class)"
  />
</template>
