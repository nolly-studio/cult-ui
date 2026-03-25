export type PixelFont = 'square' | 'grid' | 'circle' | 'triangle' | 'line'
export type PlainFont = 'sans' | 'mono'

export const PIXEL_FONT_MAP: Record<PixelFont, string> = {
  square: 'font-pixel-square',
  grid: 'font-pixel-grid',
  circle: 'font-pixel-circle',
  triangle: 'font-pixel-triangle',
  line: 'font-pixel-line',
}

export const PIXEL_FONTS = Object.values(PIXEL_FONT_MAP)
export const PIXEL_FONT_KEYS: PixelFont[] = ['square', 'grid', 'circle', 'triangle', 'line']

export const PLAIN_FONT_MAP: Record<PlainFont, string> = {
  sans: 'font-sans',
  mono: 'font-mono',
}

export const PLAIN_FONTS = Object.values(PLAIN_FONT_MAP)
export const PLAIN_FONT_KEYS = Object.keys(PLAIN_FONT_MAP) as PlainFont[]

export type Segment = { type: 'pixel' | 'plain'; text: string }

/**
 * Splits text into alternating segments based on matched words.
 * Matched words get `matchType`, unmatched get the opposite.
 * Longer phrases match first to avoid partial overlaps.
 */
export function splitTextByWords(
  text: string,
  words: string[],
  matchType: 'pixel' | 'plain',
): Segment[] {
  const unmatchType = matchType === 'pixel' ? 'plain' : 'pixel'
  if (words.length === 0) return [{ type: unmatchType, text }]

  const sorted = [...words].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')

  const segments: Segment[] = []
  let lastIndex = 0
  for (const match of text.matchAll(pattern)) {
    const matchStart = match.index ?? 0
    if (matchStart > lastIndex) {
      segments.push({ type: unmatchType, text: text.slice(lastIndex, matchStart) })
    }
    segments.push({ type: matchType, text: match[0] })
    lastIndex = matchStart + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ type: unmatchType, text: text.slice(lastIndex) })
  }
  return segments
}
