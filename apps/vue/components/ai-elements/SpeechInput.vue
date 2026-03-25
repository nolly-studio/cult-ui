<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue"
import { MicIcon, SquareIcon } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/Button.vue"

defineOptions({ name: "SpeechInput" })

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
}

interface SpeechRecognitionEvent extends Event {
  results: {
    readonly length: number
    [index: number]: {
      readonly length: number
      [index: number]: { transcript: string; confidence: number }
      isFinal: boolean
    }
  }
  resultIndex: number
}

type SpeechInputMode = "speech-recognition" | "media-recorder" | "none"

const props = withDefaults(
  defineProps<{
    class?: string
    lang?: string
    disabled?: boolean
  }>(),
  {
    lang: "en-US",
    disabled: false,
  },
)

const emit = defineEmits<{
  transcriptionChange: [text: string]
  audioRecorded: [audioBlob: Blob]
}>()

defineExpose({})

const isListening = ref(false)
const isProcessing = ref(false)
const isRecognitionReady = ref(false)

let recognition: SpeechRecognitionInstance | null = null
let mediaRecorder: MediaRecorder | null = null
let stream: MediaStream | null = null
let audioChunks: Blob[] = []

const detectSpeechInputMode = (): SpeechInputMode => {
  if (typeof window === "undefined") return "none"
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    return "speech-recognition"
  }
  if ("MediaRecorder" in window && "mediaDevices" in navigator) {
    return "media-recorder"
  }
  return "none"
}

const mode = ref<SpeechInputMode>("none")

const isDisabled = computed(
  () =>
    props.disabled ||
    mode.value === "none" ||
    (mode.value === "speech-recognition" && !isRecognitionReady.value) ||
    isProcessing.value,
)

function initSpeechRecognition() {
  if (mode.value !== "speech-recognition") return

  const SpeechRecognitionCtor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const sr = new SpeechRecognitionCtor() as SpeechRecognitionInstance

  sr.continuous = true
  ;(sr as any).interimResults = true
  ;(sr as any).lang = props.lang

  const handleStart = () => {
    isListening.value = true
  }
  const handleEnd = () => {
    isListening.value = false
  }
  const handleResult = (event: Event) => {
    const speechEvent = event as unknown as SpeechRecognitionEvent
    let finalTranscript = ""
    for (let i = speechEvent.resultIndex; i < speechEvent.results.length; i += 1) {
      const result = speechEvent.results[i]
      if (result.isFinal) {
        finalTranscript += result[0]?.transcript ?? ""
      }
    }
    if (finalTranscript) {
      emit("transcriptionChange", finalTranscript)
    }
  }
  const handleError = () => {
    isListening.value = false
  }

  sr.addEventListener("start", handleStart)
  sr.addEventListener("end", handleEnd)
  sr.addEventListener("result", handleResult)
  sr.addEventListener("error", handleError)

  recognition = sr
  isRecognitionReady.value = true
}

async function startMediaRecorder() {
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream = s
    const mr = new MediaRecorder(s)
    audioChunks = []

    mr.addEventListener("dataavailable", (event: BlobEvent) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    })

    mr.addEventListener("stop", () => {
      for (const track of s.getTracks()) {
        track.stop()
      }
      stream = null

      const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
      if (audioBlob.size > 0) {
        isProcessing.value = true
        emit("audioRecorded", audioBlob)
        isProcessing.value = false
      }
    })

    mr.addEventListener("error", () => {
      isListening.value = false
      for (const track of s.getTracks()) {
        track.stop()
      }
      stream = null
    })

    mediaRecorder = mr
    mr.start()
    isListening.value = true
  } catch {
    isListening.value = false
  }
}

function stopMediaRecorder() {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop()
  }
  isListening.value = false
}

function toggleListening() {
  if (mode.value === "speech-recognition" && recognition) {
    if (isListening.value) {
      recognition.stop()
    } else {
      recognition.start()
    }
  } else if (mode.value === "media-recorder") {
    if (isListening.value) {
      stopMediaRecorder()
    } else {
      startMediaRecorder()
    }
  }
}

onMounted(() => {
  mode.value = detectSpeechInputMode()
  initSpeechRecognition()
})

onBeforeUnmount(() => {
  if (recognition) {
    recognition.stop()
    recognition = null
    isRecognitionReady.value = false
  }
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop()
  }
  if (stream) {
    for (const track of stream.getTracks()) {
      track.stop()
    }
  }
})
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <!-- Animated pulse rings -->
    <template v-if="isListening">
      <div
        v-for="index in [0, 1, 2]"
        :key="index"
        class="absolute inset-0 animate-ping rounded-full border-2 border-red-400/30"
        :style="{
          animationDelay: `${index * 0.3}s`,
          animationDuration: '2s',
        }"
      />
    </template>

    <!-- Main record button -->
    <Button
      :class="cn(
        'relative z-10 rounded-full transition-all duration-300',
        isListening
          ? 'bg-destructive text-white hover:bg-destructive/80 hover:text-white'
          : 'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground',
        props.class
      )"
      :disabled="isDisabled"
      @click="toggleListening"
    >
      <svg
        v-if="isProcessing"
        class="size-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <SquareIcon v-else-if="isListening" class="size-4" />
      <MicIcon v-else class="size-4" />
    </Button>
  </div>
</template>
