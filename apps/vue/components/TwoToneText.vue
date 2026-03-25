<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gradientVariants = cva('bg-clip-text tracking-tight text-transparent', {
  variants: {
    variant: {
      default:
        'bg-gradient-to-t from-primary to-primary/90 dark:from-primary-foreground dark:to-primary-foreground/90',
      helper:
        'bg-gradient-to-t from-muted-foreground to-muted-foreground/80 dark:from-muted-foreground dark:to-muted-foreground/70',
      accent:
        'bg-gradient-to-t from-accent to-accent/80 dark:from-accent dark:to-accent/90',
      pink: 'bg-gradient-to-t from-[#fb21ff] to-[#fd67ff] dark:from-[#fb21ff] dark:to-[#fd67ff]',
      blue: 'bg-gradient-to-t from-[hsl(var(--chart-5))] to-[hsl(var(--chart-5))/80] dark:from-[hsl(var(--chart-5))] dark:to-[hsl(var(--chart-5))/90]',
      light:
        'bg-gradient-to-t from-neutral-200 to-neutral-300 dark:from-neutral-300 dark:to-neutral-400',
      secondary:
        'bg-gradient-to-t from-secondary-foreground to-muted-foreground',
      none: '',
    },
    weight: {
      default: 'font-bold',
      thin: 'font-thin',
      base: 'font-normal',
      semi: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    variant: 'none',
    weight: 'default',
  },
})

export type GradientVariant =
  | 'default'
  | 'helper'
  | 'accent'
  | 'pink'
  | 'blue'
  | 'light'
  | 'secondary'
  | 'none'

export type FontWeight = 'default' | 'thin' | 'base' | 'semi' | 'bold' | 'black'

export interface TextLink {
  text: string
  href: string
}

interface Props {
  primaryText: string
  secondaryText: string
  size?: 'xs' | 'ssm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  allowWrap?: boolean
  align?: 'left' | 'center' | 'right'
  primaryGradient?: GradientVariant
  secondaryGradient?: GradientVariant
  primaryWeight?: FontWeight
  secondaryWeight?: FontWeight
  primaryLinks?: TextLink[]
  secondaryLinks?: TextLink[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  as: 'h2',
  allowWrap: false,
  align: 'left',
  primaryGradient: 'default',
  secondaryGradient: 'helper',
  primaryWeight: 'semi',
  secondaryWeight: 'semi',
  primaryLinks: () => [],
  secondaryLinks: () => [],
})

const sizeClasses: Record<string, string> = {
  xs: 'text-base leading-[1.2] tracking-tight',
  ssm: 'text-base md:text-lg leading-[1.2] tracking-tight',
  sm: 'text-xl md:text-2xl leading-[1.2] tracking-tight',
  md: 'text-[20px] md:text-[32px] leading-[1.05] tracking-tight',
  lg: 'text-2xl md:text-[32px] leading-[1.125] tracking-tight',
  xl: 'text-4xl md:text-6xl leading-[1.1] tracking-tight',
  xxl: 'text-6xl md:text-7xl leading-[1.1] tracking-tight',
  xxxl: 'text-7xl md:text-8xl leading-[1.1] tracking-tight',
}

const alignmentClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

interface TextSegment {
  type: 'text' | 'link'
  content: string
  href?: string
  gradientVariant?: GradientVariant
  weight?: FontWeight
}

function buildSegments(
  text: string,
  links: TextLink[],
  gradientVariant: GradientVariant,
  weight: FontWeight,
): TextSegment[] {
  if (!links.length) {
    return [{ type: 'text', content: text }]
  }

  const linkMap = new Map<number, TextLink & { endIndex: number }>()
  links.forEach((link) => {
    const startIndex = text.indexOf(link.text)
    if (startIndex !== -1) {
      linkMap.set(startIndex, { ...link, endIndex: startIndex + link.text.length })
    }
  })

  const positions = Array.from(linkMap.keys()).sort((a, b) => a - b)
  if (!positions.length) {
    return [{ type: 'text', content: text }]
  }

  const segments: TextSegment[] = []
  let lastIndex = 0

  positions.forEach((position) => {
    const link = linkMap.get(position)!
    if (position > lastIndex) {
      segments.push({ type: 'text', content: text.substring(lastIndex, position) })
    }
    segments.push({
      type: 'link',
      content: link.text,
      href: link.href,
      gradientVariant,
      weight,
    })
    lastIndex = link.endIndex
  })

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.substring(lastIndex) })
  }

  return segments
}

const primarySegments = computed(() =>
  buildSegments(props.primaryText, props.primaryLinks, props.primaryGradient, props.primaryWeight),
)

const secondarySegments = computed(() =>
  buildSegments(props.secondaryText, props.secondaryLinks, props.secondaryGradient, props.secondaryWeight),
)

const rootClass = computed(() =>
  cn(sizeClasses[props.size], alignmentClasses[props.align], props.class),
)

const primaryClass = computed(() =>
  cn(
    props.primaryGradient === 'none' ? 'text-black dark:text-white' : '',
    gradientVariants({ variant: props.primaryGradient, weight: props.primaryWeight }),
  ),
)

const secondaryClass = computed(() =>
  cn(
    props.secondaryGradient === 'none' ? 'text-[#86868b] dark:text-[#86868b]' : '',
    gradientVariants({ variant: props.secondaryGradient, weight: props.secondaryWeight }),
  ),
)

const spacerClass = computed(() =>
  cn('mt-1 block', sizeClasses[props.size] === 'sm' ? 'mt-0.5' : 'mt-1'),
)

function linkClass(segment: TextSegment) {
  return cn(
    gradientVariants({ weight: segment.weight, variant: 'none' }),
    segment.gradientVariant === 'none'
      ? 'text-black dark:text-white'
      : segment.gradientVariant === 'helper'
        ? 'text-muted-foreground hover:text-muted-foreground/90'
        : 'text-primary hover:text-primary/90',
    'relative inline-block transition-all duration-200',
    'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300',
    'hover:after:origin-left hover:after:scale-x-100',
  )
}
</script>

<template>
  <component :is="props.as" :class="rootClass">
    <span :class="primaryClass">
      <template v-for="(segment, i) in primarySegments" :key="i">
        <NuxtLink
          v-if="segment.type === 'link'"
          :to="segment.href!"
          :class="linkClass(segment)"
        >
          {{ segment.content }}
        </NuxtLink>
        <template v-else>{{ segment.content }}</template>
      </template>
    </span>
    <span v-if="allowWrap" class="inline-block">&nbsp;</span>
    <span v-else :class="spacerClass" />
    <span :class="secondaryClass">
      <template v-for="(segment, i) in secondarySegments" :key="i">
        <NuxtLink
          v-if="segment.type === 'link'"
          :to="segment.href!"
          :class="linkClass(segment)"
        >
          {{ segment.content }}
        </NuxtLink>
        <template v-else>{{ segment.content }}</template>
      </template>
    </span>
  </component>
</template>
