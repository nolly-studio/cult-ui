"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

export type PatternCell = "0" | "1" | "2" | "3"
type Pattern = PatternCell[][]

interface LightBoardProps {
  gap?: number
  rows?: number
  lightSize?: number
  updateInterval?: number
  text: string
  font?: "default" | "7segment"
  colors?: Partial<LightBoardColors>
  disableDrawing?: boolean
  controlledDrawState?: PatternCell
  onDrawStateChange?: (newState: PatternCell) => void
  controlledHoverState?: boolean
  onHoverStateChange?: (isHovered: boolean) => void
}

interface LightBoardColors {
  drawLine: string // Color for moderately lit text
  background: string // Color for inactive lights
  textDim: string // Color for dimly lit text
  textBright: string // Color for brightly lit text
}

const defaultColors: LightBoardColors = {
  drawLine: "rgba(160, 160, 200, 0.7)",
  background: "rgba(30, 30, 40, 0.3)",
  textDim: "rgba(100, 100, 140, 0.5)",
  textBright: "rgba(220, 220, 255, 0.9)",
}

// This function takes some text and makes sure there's enough space between words
const normalizeText = (text: string, minSpacing: number = 3): string => {
  const trimmed = text.trim().toUpperCase() // Remove extra spaces and make all letters big
  const spacedText = ` ${trimmed} `.replace(/\s+/g, " ".repeat(minSpacing)) // Add spaces between words
  return spacedText
}

// This function turns text into a pattern of lights
const textToPattern = (
  text: string,
  rows: number,
  columns: number,
  font: { [key: string]: Pattern }
): Pattern => {
  // First, we make the letters bigger if we have more rows
  const letterHeight = font["A"].length
  const scale = Math.max(1, Math.floor(rows / letterHeight))

  // We make each letter in the font bigger
  const scaledFont = Object.fromEntries(
    Object.entries(font).map(([char, pattern]) => [
      char,
      pattern
        .flatMap((row) => Array(scale).fill(row))
        .map((row) =>
          row.flatMap((cell: PatternCell) =>
            Array(scale).fill(cell === "1" ? "1" : "3")
          )
        ),
    ])
  )
  // We add spaces to the text
  const normalizedText = normalizeText(text)

  // We turn each letter into a pattern of lights
  const letterPatterns = normalizedText
    .split("")
    .map((char) => scaledFont[char] || scaledFont[" "])

  // We combine all the letter patterns into one big pattern
  let fullPattern: Pattern = Array(scaledFont["A"].length)
    .fill([])
    .map(() => [])

  letterPatterns.forEach((letterPattern) => {
    fullPattern = fullPattern.map((row, i) => [...row, ...letterPattern[i]])
  })

  // We add empty space above and below the pattern to center it
  const totalRows = rows
  const patternRows = fullPattern.length
  const topPadding = Math.floor((totalRows - patternRows) / 2)
  const bottomPadding = totalRows - patternRows - topPadding

  const paddedPattern = [
    ...Array(topPadding).fill(Array(fullPattern[0].length).fill("0")),
    ...fullPattern,
    ...Array(bottomPadding).fill(Array(fullPattern[0].length).fill("0")),
  ]

  // We make the pattern wider by repeating it
  const extendedPattern = paddedPattern.map((row) => {
    while (row.length < columns * 2) {
      row = [...row, ...row]
    }
    return row
  })

  return extendedPattern
}

// This function decides what color each light should be
function getLightColor(
  state: PatternCell,
  colors: Partial<LightBoardColors>
): string {
  const mergedColors = { ...defaultColors, ...colors }

  switch (state) {
    case "1":
      return mergedColors.textDim
    case "2":
      return mergedColors.drawLine
    case "3":
      return mergedColors.textBright
    default:
      return mergedColors.background
  }
}

const defaultDrawState: PatternCell = "2"

function LightBoard({
  text,
  gap = 1,
  lightSize = 4,
  rows = 5,
  font = "default",
  updateInterval = 10,
  colors = {},
  controlledDrawState,
  disableDrawing = true,
  controlledHoverState,
  onHoverStateChange,
}: LightBoardProps) {
  // We decide how many rows and columns of lights we need
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(0)
  const mergedColors = { ...defaultColors, ...colors }

  // We choose which font to use for our text
  const selectedFont = font === "default" ? defaultFont : sevenSegmentFont
  // We keep track of whether the mouse is over our board

  // We keep track of whether we're drawing on the board
  const [isDrawing, setIsDrawing] = useState(false)
  // Use controlled state if provided, otherwise use local state
  const [internalHoverState, setInternalHoverState] = useState(false)
  // This is the brightness of the lights we're drawing (0 to 3)

  // This is our pattern of lights that make up the text
  const [basePattern, setBasePattern] = useState<Pattern>(() => {
    return textToPattern(normalizeText(text), rows, columns, selectedFont)
  })
  // This helps us move the text across the board
  const [offset, setOffset] = useState(0)
  // This is how we draw on our light board (it's like a special piece of paper)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // This remembers where we last drew on the board
  const lastDrawnPosition = useRef<{ x: number; y: number } | null>(null)
  // This helps us know when to update our animation
  const [lastUpdateTime, setLastUpdateTime] = useState(0)

  const drawState =
    controlledDrawState !== undefined ? controlledDrawState : defaultDrawState

  const isHovered =
    controlledHoverState !== undefined
      ? controlledHoverState
      : internalHoverState

  // Calculate the number of columns based on container width
  useEffect(() => {
    const calculateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const calculatedColumns = Math.floor(containerWidth / (lightSize + gap))
        setColumns(calculatedColumns)
      }
    }

    calculateColumns()
    window.addEventListener("resize", calculateColumns)
    return () => window.removeEventListener("resize", calculateColumns)
  }, [lightSize, gap])

  // This function draws all our lights on the board
  const drawToCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const patternWidth = basePattern[0].length

    basePattern.forEach((row, rowIndex) => {
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        const patternColIndex = (colIndex + offset) % patternWidth
        const state = row[patternColIndex]

        ctx.fillStyle = getLightColor(state as PatternCell, mergedColors)
        ctx.beginPath()
        ctx.arc(
          colIndex * (lightSize + gap) + lightSize / 2,
          rowIndex * (lightSize + gap) + lightSize / 2,
          lightSize / 2,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    })
  }, [basePattern, offset, columns, lightSize, gap, mergedColors])

  // This makes our text move across the board
  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (!isHovered) {
        // If the mouse isn't over the board, we move the text
        setOffset((prevOffset) => (prevOffset + 1) % basePattern[0].length)
      }
      drawToCanvas()
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // We clean up our animation when we're done
    return () => cancelAnimationFrame(animationFrameId)
  }, [basePattern, isHovered, drawToCanvas])

  // This updates our light pattern when the text changes
  useEffect(() => {
    setBasePattern(
      textToPattern(normalizeText(text), rows, columns, selectedFont)
    )
  }, [text, rows, columns, selectedFont])

  // This is another way we make our text move
  const animate = useCallback(() => {
    const currentTime = Date.now()
    if (currentTime - lastUpdateTime >= updateInterval && !isHovered) {
      setOffset((prevOffset) => (prevOffset + 1) % basePattern[0].length)
      setLastUpdateTime(currentTime)
    }
    drawToCanvas()
  }, [updateInterval, isHovered, basePattern, drawToCanvas, lastUpdateTime])

  // This keeps our animation going
  useEffect(() => {
    let animationFrameId: number

    const loop = () => {
      animate()
      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    // We clean up our animation when we're done
    return () => cancelAnimationFrame(animationFrameId)
  }, [animate])

  // This function helps us draw a line on our light board
  const drawLine = useCallback(
    (startX: number, startY: number, endX: number, endY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // We figure out which direction we're drawing
      const dx = Math.abs(endX - startX)
      const dy = Math.abs(endY - startY)
      const sx = startX < endX ? 1 : -1
      const sy = startY < endY ? 1 : -1
      let err = dx - dy

      // We keep drawing until we reach the end of our line
      while (true) {
        // We figure out which light we're on
        const colIndex = Math.floor(startX / (lightSize + gap))
        const rowIndex = Math.floor(startY / (lightSize + gap))

        // If we're still on the board...
        if (
          rowIndex >= 0 &&
          rowIndex < rows &&
          colIndex >= 0 &&
          colIndex < columns
        ) {
          // We figure out which light to change in our pattern
          const actualColIndex = (colIndex + offset) % basePattern[0].length

          // If this light isn't already the brightness we want...
          if (basePattern[rowIndex][actualColIndex] !== drawState) {
            // We update our pattern of lights
            setBasePattern((prevPattern) => {
              const newPattern = [...prevPattern]
              newPattern[rowIndex] = [...newPattern[rowIndex]]
              newPattern[rowIndex][actualColIndex] = drawState
              return newPattern
            })

            // We draw the new light on our board
            ctx.fillStyle = getLightColor(drawState, mergedColors)

            ctx.beginPath()
            ctx.arc(
              colIndex * (lightSize + gap) + lightSize / 2,
              rowIndex * (lightSize + gap) + lightSize / 2,
              lightSize / 2,
              0,
              2 * Math.PI
            )
            ctx.fill()
          }
        }

        // If we've reached the end of our line, we stop
        if (startX === endX && startY === endY) break

        // We figure out where to draw next
        const e2 = 2 * err
        if (e2 > -dy) {
          err -= dy
          startX += sx
        }
        if (e2 < dx) {
          err += dx
          startY += sy
        }
      }
    },
    [
      basePattern,
      columns,
      drawState,
      gap,
      lightSize,
      offset,
      rows,
      mergedColors,
    ]
  )

  // _________DRAWING HANDLING_________

  const handleInteractionStart = useCallback(
    (x: number, y: number) => {
      if (disableDrawing) return
      setIsDrawing(true)
      lastDrawnPosition.current = null
      drawLine(x, y, x, y)
    },
    [disableDrawing, drawLine]
  )

  const handleInteractionMove = useCallback(
    (x: number, y: number) => {
      if (!isDrawing || disableDrawing) return
      if (lastDrawnPosition.current) {
        drawLine(lastDrawnPosition.current.x, lastDrawnPosition.current.y, x, y)
      } else {
        drawLine(x, y, x, y)
      }
      lastDrawnPosition.current = { x, y }
    },
    [isDrawing, disableDrawing, drawLine]
  )

  const handleInteractionEnd = useCallback(() => {
    setIsDrawing(false)
    lastDrawnPosition.current = null
  }, [])

  // This happens when we press the mouse button to start drawing
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      handleInteractionStart(x, y)
    },
    [handleInteractionStart]
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      handleInteractionMove(x, y)
    },
    [handleInteractionMove]
  )

  const handleMouseUp = handleInteractionEnd

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault()
      const touch = event.touches[0]
      const canvas = event.currentTarget
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      handleInteractionStart(x, y)
    },
    [handleInteractionStart]
  )

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault()
      const touch = event.touches[0]
      const canvas = event.currentTarget
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      handleInteractionMove(x, y)
    },
    [handleInteractionMove]
  )

  const handleTouchEnd = handleInteractionEnd

  // Update hover state
  const updateHoverState = useCallback(
    (newState: boolean) => {
      if (controlledHoverState === undefined) {
        setInternalHoverState(newState)
      }
      onHoverStateChange?.(newState)
    },
    [controlledHoverState, onHoverStateChange]
  )

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      {columns > 0 && (
        <canvas
          ref={canvasRef}
          width={columns * (lightSize + gap)}
          height={rows * (lightSize + gap)}
          onMouseDown={!disableDrawing ? handleMouseDown : undefined}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() =>
            controlledHoverState === undefined && updateHoverState(true)
          }
          onMouseLeave={() => {
            controlledHoverState === undefined && updateHoverState(false)
            handleInteractionEnd()
          }}
          onTouchStart={!disableDrawing ? handleTouchStart : undefined}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{
            cursor: disableDrawing ? "default" : "pointer",
            touchAction: "none",
            userSelect: "none",
          }}
        />
      )}
    </div>
  )
}

export { LightBoard }

const sevenSegmentFont: { [key: string]: Pattern } = {
  "0": [
    ["1", "1", "1"],
    ["1", "0", "1"],
    ["1", "0", "1"],
    ["1", "0", "1"],
    ["1", "1", "1"],
  ],
  "1": [
    ["0", "0", "1"],
    ["0", "0", "1"],
    ["0", "0", "1"],
    ["0", "0", "1"],
    ["0", "0", "1"],
  ],
  // Add more digits as needed
}

const defaultFont: { [key: string]: Pattern } = {
  " ": [
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
  ],
  A: [
    ["0", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
  ],
  B: [
    ["1", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "0"],
  ],
  C: [
    ["0", "1", "1", "1"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
    ["0", "1", "1", "1"],
  ],
  D: [
    ["1", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "0"],
  ],
  E: [
    ["1", "1", "1", "1"],
    ["1", "0", "0", "0"],
    ["1", "1", "1", "0"],
    ["1", "0", "0", "0"],
    ["1", "1", "1", "1"],
  ],
  F: [
    ["1", "1", "1", "1"],
    ["1", "0", "0", "0"],
    ["1", "1", "1", "0"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
  ],
  G: [
    ["0", "1", "1", "1"],
    ["1", "0", "0", "0"],
    ["1", "0", "1", "1"],
    ["1", "0", "0", "1"],
    ["0", "1", "1", "1"],
  ],
  H: [
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
  ],
  I: [
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["0", "1", "0"],
    ["0", "1", "0"],
    ["1", "1", "1"],
  ],
  J: [
    ["0", "0", "1", "1"],
    ["0", "0", "0", "1"],
    ["0", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["0", "1", "1", "0"],
  ],
  K: [
    ["1", "0", "0", "1"],
    ["1", "0", "1", "0"],
    ["1", "1", "0", "0"],
    ["1", "0", "1", "0"],
    ["1", "0", "0", "1"],
  ],
  L: [
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
    ["1", "1", "1", "1"],
  ],
  M: [
    ["1", "0", "0", "0", "1"],
    ["1", "1", "0", "1", "1"],
    ["1", "0", "1", "0", "1"],
    ["1", "0", "0", "0", "1"],
    ["1", "0", "0", "0", "1"],
  ],
  N: [
    ["1", "0", "0", "1"],
    ["1", "1", "0", "1"],
    ["1", "0", "1", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
  ],
  O: [
    ["0", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["0", "1", "1", "0"],
  ],
  P: [
    ["1", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "0"],
    ["1", "0", "0", "0"],
    ["1", "0", "0", "0"],
  ],
  Q: [
    ["0", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "1", "0"],
    ["0", "1", "0", "1"],
  ],
  R: [
    ["1", "1", "1", "0"],
    ["1", "0", "0", "1"],
    ["1", "1", "1", "0"],
    ["1", "0", "1", "0"],
    ["1", "0", "0", "1"],
  ],
  S: [
    ["0", "1", "1", "1"],
    ["1", "0", "0", "0"],
    ["0", "1", "1", "0"],
    ["0", "0", "0", "1"],
    ["1", "1", "1", "0"],
  ],
  T: [
    ["1", "1", "1", "1", "1"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
  ],
  U: [
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["1", "0", "0", "1"],
    ["0", "1", "1", "0"],
  ],
  V: [
    ["1", "0", "0", "0", "1"],
    ["1", "0", "0", "0", "1"],
    ["0", "1", "0", "1", "0"],
    ["0", "1", "0", "1", "0"],
    ["0", "0", "1", "0", "0"],
  ],
  W: [
    ["1", "0", "0", "0", "1"],
    ["1", "0", "0", "0", "1"],
    ["1", "0", "1", "0", "1"],
    ["1", "1", "0", "1", "1"],
    ["1", "0", "0", "0", "1"],
  ],
  X: [
    ["1", "0", "0", "1"],
    ["0", "1", "1", "0"],
    ["0", "0", "0", "0"],
    ["0", "1", "1", "0"],
    ["1", "0", "0", "1"],
  ],
  Y: [
    ["1", "0", "0", "0", "1"],
    ["0", "1", "0", "1", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0"],
  ],
  Z: [
    ["1", "1", "1", "1"],
    ["0", "0", "0", "1"],
    ["0", "0", "1", "0"],
    ["0", "1", "0", "0"],
    ["1", "1", "1", "1"],
  ],
}
