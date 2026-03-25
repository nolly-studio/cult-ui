<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue'

type PatternCell = '0' | '1' | '2' | '3'
type Pattern = PatternCell[][]

interface LightBoardColors {
  drawLine: string
  background: string
  textDim: string
  textBright: string
}

const props = withDefaults(defineProps<{
  text: string
  gap?: number
  lightSize?: number
  rows?: number
  font?: 'default' | '7segment'
  updateInterval?: number
  colors?: Partial<LightBoardColors>
  disableDrawing?: boolean
  controlledDrawState?: PatternCell
  controlledHoverState?: boolean
}>(), {
  gap: 1,
  lightSize: 4,
  rows: 5,
  font: 'default',
  updateInterval: 10,
  colors: () => ({}),
  disableDrawing: true,
})

const emit = defineEmits<{
  hoverStateChange: [isHovered: boolean]
}>()

const defaultColors: LightBoardColors = {
  drawLine: 'rgba(160, 160, 200, 0.7)',
  background: 'rgba(30, 30, 40, 0.3)',
  textDim: 'rgba(100, 100, 140, 0.5)',
  textBright: 'rgba(220, 220, 255, 0.9)',
}

const containerRef = useTemplateRef<HTMLDivElement>('container')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')
const columns = ref(0)
const offset = ref(0)
const isDrawing = ref(false)
const internalHoverState = ref(false)
const basePattern = ref<Pattern>([])
const lastDrawnPosition = ref<{ x: number; y: number } | null>(null)
let animationFrameId: number

const mergedColors = { ...defaultColors, ...props.colors }
const drawState = props.controlledDrawState ?? '2'
const isHovered = () => props.controlledHoverState !== undefined ? props.controlledHoverState : internalHoverState.value

// Font data (abbreviated - key letters)
const defaultFont: Record<string, Pattern> = {
  ' ': [['0','0','0','0'],['0','0','0','0'],['0','0','0','0'],['0','0','0','0'],['0','0','0','0']],
  A: [['0','1','1','0'],['1','0','0','1'],['1','1','1','1'],['1','0','0','1'],['1','0','0','1']],
  B: [['1','1','1','0'],['1','0','0','1'],['1','1','1','0'],['1','0','0','1'],['1','1','1','0']],
  C: [['0','1','1','1'],['1','0','0','0'],['1','0','0','0'],['1','0','0','0'],['0','1','1','1']],
  D: [['1','1','1','0'],['1','0','0','1'],['1','0','0','1'],['1','0','0','1'],['1','1','1','0']],
  E: [['1','1','1','1'],['1','0','0','0'],['1','1','1','0'],['1','0','0','0'],['1','1','1','1']],
  F: [['1','1','1','1'],['1','0','0','0'],['1','1','1','0'],['1','0','0','0'],['1','0','0','0']],
  G: [['0','1','1','1'],['1','0','0','0'],['1','0','1','1'],['1','0','0','1'],['0','1','1','1']],
  H: [['1','0','0','1'],['1','0','0','1'],['1','1','1','1'],['1','0','0','1'],['1','0','0','1']],
  I: [['1','1','1'],['0','1','0'],['0','1','0'],['0','1','0'],['1','1','1']],
  J: [['0','0','1','1'],['0','0','0','1'],['0','0','0','1'],['1','0','0','1'],['0','1','1','0']],
  K: [['1','0','0','1'],['1','0','1','0'],['1','1','0','0'],['1','0','1','0'],['1','0','0','1']],
  L: [['1','0','0','0'],['1','0','0','0'],['1','0','0','0'],['1','0','0','0'],['1','1','1','1']],
  M: [['1','0','0','0','1'],['1','1','0','1','1'],['1','0','1','0','1'],['1','0','0','0','1'],['1','0','0','0','1']],
  N: [['1','0','0','1'],['1','1','0','1'],['1','0','1','1'],['1','0','0','1'],['1','0','0','1']],
  O: [['0','1','1','0'],['1','0','0','1'],['1','0','0','1'],['1','0','0','1'],['0','1','1','0']],
  P: [['1','1','1','0'],['1','0','0','1'],['1','1','1','0'],['1','0','0','0'],['1','0','0','0']],
  Q: [['0','1','1','0'],['1','0','0','1'],['1','0','0','1'],['1','0','1','0'],['0','1','0','1']],
  R: [['1','1','1','0'],['1','0','0','1'],['1','1','1','0'],['1','0','1','0'],['1','0','0','1']],
  S: [['0','1','1','1'],['1','0','0','0'],['0','1','1','0'],['0','0','0','1'],['1','1','1','0']],
  T: [['1','1','1','1','1'],['0','0','1','0','0'],['0','0','1','0','0'],['0','0','1','0','0'],['0','0','1','0','0']],
  U: [['1','0','0','1'],['1','0','0','1'],['1','0','0','1'],['1','0','0','1'],['0','1','1','0']],
  V: [['1','0','0','0','1'],['1','0','0','0','1'],['0','1','0','1','0'],['0','1','0','1','0'],['0','0','1','0','0']],
  W: [['1','0','0','0','1'],['1','0','0','0','1'],['1','0','1','0','1'],['1','1','0','1','1'],['1','0','0','0','1']],
  X: [['1','0','0','1'],['0','1','1','0'],['0','0','0','0'],['0','1','1','0'],['1','0','0','1']],
  Y: [['1','0','0','0','1'],['0','1','0','1','0'],['0','0','1','0','0'],['0','0','1','0','0'],['0','0','1','0','0']],
  Z: [['1','1','1','1'],['0','0','0','1'],['0','0','1','0'],['0','1','0','0'],['1','1','1','1']],
}

const sevenSegmentFont: Record<string, Pattern> = {
  '0': [['1','1','1'],['1','0','1'],['1','0','1'],['1','0','1'],['1','1','1']],
  '1': [['0','0','1'],['0','0','1'],['0','0','1'],['0','0','1'],['0','0','1']],
}

function normalizeText(text: string, minSpacing = 3): string {
  const trimmed = text.trim().toUpperCase()
  return ` ${trimmed} `.replace(/\s+/g, ' '.repeat(minSpacing))
}

function textToPattern(text: string, rows: number, cols: number, font: Record<string, Pattern>): Pattern {
  const letterHeight = font['A']?.length ?? 5
  const scale = Math.max(1, Math.floor(rows / letterHeight))
  const scaledFont = Object.fromEntries(
    Object.entries(font).map(([char, pattern]) => [
      char,
      pattern.flatMap(row => Array(scale).fill(row)).map(row =>
        (row as PatternCell[]).flatMap((cell: PatternCell) => Array(scale).fill(cell === '1' ? '1' : '3') as PatternCell[])
      ),
    ])
  )
  const normalized = normalizeText(text)
  const letterPatterns = normalized.split('').map(char => scaledFont[char] || scaledFont[' '])
  let fullPattern: Pattern = Array(scaledFont['A']?.length ?? 5).fill([]).map(() => [])
  letterPatterns.forEach(lp => {
    fullPattern = fullPattern.map((row, i) => [...row, ...lp[i]])
  })
  const totalRows = rows
  const patternRows = fullPattern.length
  const topPadding = Math.floor((totalRows - patternRows) / 2)
  const bottomPadding = totalRows - patternRows - topPadding
  const paddedPattern = [
    ...Array(topPadding).fill(Array(fullPattern[0]?.length ?? 0).fill('0')),
    ...fullPattern,
    ...Array(bottomPadding).fill(Array(fullPattern[0]?.length ?? 0).fill('0')),
  ]
  return paddedPattern.map(row => {
    let r = [...row]
    while (r.length < cols * 2) r = [...r, ...r]
    return r
  })
}

function getLightColor(state: PatternCell): string {
  switch (state) {
    case '1': return mergedColors.textDim
    case '2': return mergedColors.drawLine
    case '3': return mergedColors.textBright
    default: return mergedColors.background
  }
}

function drawToCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const patternWidth = basePattern.value[0]?.length ?? 0
  basePattern.value.forEach((row, rowIndex) => {
    for (let colIndex = 0; colIndex < columns.value; colIndex++) {
      const patternColIndex = (colIndex + offset.value) % patternWidth
      const state = row[patternColIndex]
      ctx.fillStyle = getLightColor(state as PatternCell)
      ctx.beginPath()
      ctx.arc(
        colIndex * (props.lightSize + props.gap) + props.lightSize / 2,
        rowIndex * (props.lightSize + props.gap) + props.lightSize / 2,
        props.lightSize / 2, 0, 2 * Math.PI
      )
      ctx.fill()
    }
  })
}

function animate() {
  if (!isHovered()) {
    offset.value = (offset.value + 1) % (basePattern.value[0]?.length || 1)
  }
  drawToCanvas()
  animationFrameId = requestAnimationFrame(animate)
}

function calculateColumns() {
  if (containerRef.value) {
    columns.value = Math.floor(containerRef.value.offsetWidth / (props.lightSize + props.gap))
  }
}

onMounted(() => {
  calculateColumns()
  window.addEventListener('resize', calculateColumns)
  const selectedFont = props.font === 'default' ? defaultFont : sevenSegmentFont
  basePattern.value = textToPattern(normalizeText(props.text), props.rows, columns.value, selectedFont)
  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateColumns)
  cancelAnimationFrame(animationFrameId)
})

watch([() => props.text, () => props.rows, columns], () => {
  const selectedFont = props.font === 'default' ? defaultFont : sevenSegmentFont
  basePattern.value = textToPattern(normalizeText(props.text), props.rows, columns.value, selectedFont)
})
</script>

<template>
  <div ref="container" style="width: 100%">
    <canvas
      v-if="columns > 0"
      ref="canvas"
      :width="columns * (props.lightSize + props.gap)"
      :height="props.rows * (props.lightSize + props.gap)"
      :style="{ cursor: props.disableDrawing ? 'default' : 'pointer', touchAction: 'none', userSelect: 'none' }"
      @mouseenter="internalHoverState = true; emit('hoverStateChange', true)"
      @mouseleave="internalHoverState = false; emit('hoverStateChange', false)"
    />
  </div>
</template>
