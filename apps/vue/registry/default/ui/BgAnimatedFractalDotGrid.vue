<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  dotSize?: number
  dotSpacing?: number
  dotOpacity?: number
  waveIntensity?: number
  waveRadius?: number
  dotColor?: string
  glowColor?: string
  enableNoise?: boolean
  noiseOpacity?: number
  enableMouseGlow?: boolean
  initialPerformance?: 'low' | 'medium' | 'high'
}

const props = withDefaults(defineProps<Props>(), {
  dotSize: 4,
  dotSpacing: 20,
  dotOpacity: 0.3,
  waveIntensity: 30,
  waveRadius: 200,
  dotColor: 'rgba(100, 100, 255, 1)',
  glowColor: 'rgba(100, 100, 255, 1)',
  enableNoise: true,
  noiseOpacity: 0.03,
  enableMouseGlow: true,
  initialPerformance: 'medium',
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const mousePos = ref({ x: 0, y: 0 })
const performanceLevel = ref(props.initialPerformance)
const visible = ref(false)

let animationFrameId: number | null = null
let fpsFrameId: number | null = null

// Responsive
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const isMobile = computed(() => windowWidth.value < 768)
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)

const responsiveDotSize = computed(() => {
  if (isMobile.value) return props.dotSize * 0.75
  if (isTablet.value) return props.dotSize * 0.9
  return props.dotSize
})

const responsiveDotSpacing = computed(() => {
  if (isMobile.value) return props.dotSpacing * 1.5
  if (isTablet.value) return props.dotSpacing * 1.25
  return props.dotSpacing
})

function handleMouseMove(event: MouseEvent) {
  if (!containerRef.value) return
  const { left, top, width, height } = containerRef.value.getBoundingClientRect()
  mousePos.value = {
    x: (event.clientX - left) / width,
    y: (event.clientY - top) / height,
  }
}

function handleResize() {
  windowWidth.value = window.innerWidth
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}

function drawDots(ctx: CanvasRenderingContext2D, time: number) {
  const { width, height } = ctx.canvas
  ctx.clearRect(0, 0, width, height)

  const skipMap = { low: 3, medium: 2, high: 1 }
  const skip = skipMap[performanceLevel.value]

  const cols = Math.ceil(width / responsiveDotSpacing.value)
  const rows = Math.ceil(height / responsiveDotSpacing.value)
  const centerX = mousePos.value.x * width
  const centerY = mousePos.value.y * height

  for (let i = 0; i < cols; i += skip) {
    for (let j = 0; j < rows; j += skip) {
      const x = i * responsiveDotSpacing.value
      const y = j * responsiveDotSpacing.value
      const distanceX = x - centerX
      const distanceY = y - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      let dotX = x
      let dotY = y

      if (distance < props.waveRadius) {
        const waveStrength = Math.pow(1 - distance / props.waveRadius, 2)
        const angle = Math.atan2(distanceY, distanceX)
        const waveOffset = Math.sin(distance * 0.05 - time * 0.005) * props.waveIntensity * waveStrength
        dotX += Math.cos(angle) * waveOffset
        dotY += Math.sin(angle) * waveOffset

        const glowRadius = responsiveDotSize.value * (1 + waveStrength)
        const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, glowRadius)
        gradient.addColorStop(0, props.glowColor.replace('1)', `${props.dotOpacity * (1 + waveStrength)})`))
        gradient.addColorStop(1, props.glowColor.replace('1)', '0)'))
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = props.dotColor.replace('1)', `${props.dotOpacity})`)
      }

      ctx.beginPath()
      ctx.arc(dotX, dotY, responsiveDotSize.value / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function startAnimation() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let lastTime = 0
  const animate = (time: number) => {
    if (time - lastTime > 16) {
      drawDots(ctx, time)
      lastTime = time
    }
    animationFrameId = requestAnimationFrame(animate)
  }
  animationFrameId = requestAnimationFrame(animate)
}

function startFpsMeasure() {
  let frameCount = 0
  let lastTime = performance.now()

  const measure = (time: number) => {
    frameCount++
    if (time - lastTime > 1000) {
      const fps = Math.round((frameCount * 1000) / (time - lastTime))
      frameCount = 0
      lastTime = time

      if (fps < 30 && performanceLevel.value !== 'low') performanceLevel.value = 'low'
      else if (fps >= 30 && fps < 50 && performanceLevel.value !== 'medium') performanceLevel.value = 'medium'
      else if (fps >= 50 && performanceLevel.value !== 'high') performanceLevel.value = 'high'
    }
    fpsFrameId = requestAnimationFrame(measure)
  }
  fpsFrameId = requestAnimationFrame(measure)
}

onMounted(() => {
  visible.value = true
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
  startAnimation()
  startFpsMeasure()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (fpsFrameId) cancelAnimationFrame(fpsFrameId)
})
</script>

<template>
  <Transition name="fade" appear>
    <div
      v-if="visible"
      ref="containerRef"
      class="absolute inset-0 overflow-hidden w-full h-full"
    >
      <canvas
        ref="canvasRef"
        class="absolute inset-0 h-full w-full bg-gray-100"
        :style="{ mixBlendMode: 'multiply' }"
      />
      <!-- Noise Overlay -->
      <div
        v-if="enableNoise"
        class="absolute inset-0 h-full w-full mix-blend-overlay"
        :style="{ opacity: noiseOpacity }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise-fractal">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-fractal)" />
        </svg>
      </div>
      <!-- Mouse Glow -->
      <template v-if="enableMouseGlow">
        <div
          class="absolute w-40 h-40 rounded-full pointer-events-none"
          :style="{
            background: `radial-gradient(circle, ${glowColor.replace('1)', '0.2)')} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10px)',
          }"
        />
        <div
          class="absolute w-20 h-20 rounded-full pointer-events-none"
          :style="{
            background: `radial-gradient(circle, ${glowColor.replace('1)', '0.4)')} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }"
        />
      </template>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 1.5s ease-out;
}
.fade-enter-from {
  opacity: 0;
}
</style>
