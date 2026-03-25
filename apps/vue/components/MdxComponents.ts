import { defineComponent, h, type Component } from 'vue'
import { cn } from '@/lib/utils'

// MDX heading components
const MdxH1 = defineComponent({
  name: 'MdxH1',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h1',
        { class: cn('font-heading mt-2 scroll-m-20 text-4xl font-bold', props.class) },
        slots.default?.()
      )
  },
})

const MdxH2 = defineComponent({
  name: 'MdxH2',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h2',
        {
          class: cn(
            'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxH3 = defineComponent({
  name: 'MdxH3',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h3',
        {
          class: cn(
            'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxH4 = defineComponent({
  name: 'MdxH4',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h4',
        {
          class: cn(
            'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxH5 = defineComponent({
  name: 'MdxH5',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h5',
        {
          class: cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', props.class),
        },
        slots.default?.()
      )
  },
})

const MdxH6 = defineComponent({
  name: 'MdxH6',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h6',
        {
          class: cn(
            'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxA = defineComponent({
  name: 'MdxA',
  props: { class: String, href: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          href: props.href,
          class: cn('font-medium underline underline-offset-4', props.class),
        },
        slots.default?.()
      )
  },
})

const MdxP = defineComponent({
  name: 'MdxP',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'p',
        { class: cn('leading-7 [&:not(:first-child)]:mt-6', props.class) },
        slots.default?.()
      )
  },
})

const MdxUl = defineComponent({
  name: 'MdxUl',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('ul', { class: cn('my-6 ml-6 list-disc', props.class) }, slots.default?.())
  },
})

const MdxOl = defineComponent({
  name: 'MdxOl',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('ol', { class: cn('my-6 ml-6 list-decimal', props.class) }, slots.default?.())
  },
})

const MdxLi = defineComponent({
  name: 'MdxLi',
  props: { class: String },
  setup(props, { slots }) {
    return () => h('li', { class: cn('mt-2', props.class) }, slots.default?.())
  },
})

const MdxBlockquote = defineComponent({
  name: 'MdxBlockquote',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'blockquote',
        { class: cn('mt-6 border-l-2 pl-6 italic', props.class) },
        slots.default?.()
      )
  },
})

const MdxImg = defineComponent({
  name: 'MdxImg',
  props: { class: String, alt: String, src: String },
  setup(props, { attrs }) {
    return () =>
      h('img', {
        ...attrs,
        src: props.src,
        alt: props.alt,
        class: cn('rounded-md', props.class),
      })
  },
})

const MdxHr = defineComponent({
  name: 'MdxHr',
  setup(_, { attrs }) {
    return () => h('hr', { ...attrs, class: 'my-4 md:my-8' })
  },
})

const MdxTable = defineComponent({
  name: 'MdxTable',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'my-6 w-full overflow-y-auto' }, [
        h('table', { class: cn('w-full', props.class) }, slots.default?.()),
      ])
  },
})

const MdxTr = defineComponent({
  name: 'MdxTr',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'tr',
        { class: cn('m-0 border-t p-0 even:bg-muted', props.class) },
        slots.default?.()
      )
  },
})

const MdxTh = defineComponent({
  name: 'MdxTh',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'th',
        {
          class: cn(
            'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxTd = defineComponent({
  name: 'MdxTd',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'td',
        {
          class: cn(
            'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxPre = defineComponent({
  name: 'MdxPre',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'pre',
        {
          class: cn(
            'mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const MdxCode = defineComponent({
  name: 'MdxCode',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'code',
        {
          class: cn(
            'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const Step = defineComponent({
  name: 'Step',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h3',
        {
          class: cn(
            'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const Steps = defineComponent({
  name: 'Steps',
  setup(_, { slots }) {
    return () =>
      h(
        'div',
        {
          class:
            '[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]',
        },
        slots.default?.()
      )
  },
})

const CitationTitle = defineComponent({
  name: 'CitationTitle',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'h3',
        {
          class: cn(
            'mb-2 border-b bg-transparent text-xl font-semibold text-primary/90',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

const CitationList = defineComponent({
  name: 'CitationList',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h('ul', { class: cn('list-none pl-0', props.class) }, slots.default?.())
  },
})

const CitationItem = defineComponent({
  name: 'CitationItem',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'li',
        { class: cn('flex items-start text-muted-foreground', props.class) },
        slots.default?.()
      )
  },
})

const CitationLink = defineComponent({
  name: 'CitationLink',
  props: { class: String, href: String },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'a',
        { ...attrs, href: props.href, class: cn('ml-1 hover:underline', props.class) },
        slots.default?.()
      )
  },
})

const Citations = defineComponent({
  name: 'Citations',
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: cn(
            'my-6 rounded-md border-l-4 border-border bg-transparent p-4',
            props.class
          ),
        },
        slots.default?.()
      )
  },
})

/**
 * MDX component mapping for Vue.
 *
 * Maps MDX component names to their Vue component equivalents.
 * Use with your MDX renderer to provide styled components.
 */
export const mdxComponents: Record<string, Component> = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  a: MdxA,
  p: MdxP,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  blockquote: MdxBlockquote,
  img: MdxImg,
  hr: MdxHr,
  table: MdxTable,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  pre: MdxPre,
  code: MdxCode,
  Step,
  Steps,
  CitationTitle,
  CitationList,
  CitationItem,
  CitationLink,
  Citations,
}

export {
  MdxH1,
  MdxH2,
  MdxH3,
  MdxH4,
  MdxH5,
  MdxH6,
  MdxA,
  MdxP,
  MdxUl,
  MdxOl,
  MdxLi,
  MdxBlockquote,
  MdxImg,
  MdxHr,
  MdxTable,
  MdxTr,
  MdxTh,
  MdxTd,
  MdxPre,
  MdxCode,
  Step,
  Steps,
  CitationTitle,
  CitationList,
  CitationItem,
  CitationLink,
  Citations,
}
