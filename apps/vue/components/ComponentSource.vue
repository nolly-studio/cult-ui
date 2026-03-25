<script setup lang="ts">
import { cn } from '@/lib/utils'
import CodeCollapsibleWrapper from '@/components/CodeCollapsibleWrapper.vue'
import CopyButton from '@/components/CopyButton.vue'
import { getIconForLanguageExtension } from '@/components/icons'

interface Props {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  collapsible: true,
})

const code = ref<string | undefined>()
const highlightedCode = ref<string>('')

onMounted(async () => {
  if (!props.name && !props.src) return

  if (props.name) {
    // Fetch from registry API or use a registry composable
    const { data } = await useFetch(`/api/registry/${props.name}`)
    if (data.value) {
      code.value = (data.value as any)?.files?.[0]?.content
    }
  }

  if (props.src) {
    const { data } = await useFetch(props.src, { responseType: 'text' })
    if (data.value) {
      code.value = data.value as string
    }
  }

  if (code.value) {
    const lang = computedLang.value
    // Use a highlight utility or composable
    const { data } = await useFetch('/api/highlight', {
      method: 'POST',
      body: { code: code.value, lang },
    })
    if (data.value) {
      highlightedCode.value = data.value as string
    }
  }
})

const computedLang = computed(() => {
  return props.language ?? props.title?.split('.').pop() ?? 'tsx'
})
</script>

<template>
  <template v-if="!code">
    <!-- nothing to render -->
  </template>

  <div v-else-if="!collapsible" :class="cn('relative', props.class)">
    <figure
      data-rehype-pretty-code-figure=""
      class="group relative [&>pre]:max-h-[650px] [&>pre]:overflow-auto"
    >
      <figcaption
        v-if="title"
        data-rehype-pretty-code-title=""
        class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
        :data-language="computedLang"
      >
        <component :is="getIconForLanguageExtension(computedLang)" />
        {{ title }}
      </figcaption>
      <div class="absolute top-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
        <CopyButton :value="code" class="hover:opacity-100" />
      </div>
      <div v-html="highlightedCode" />
    </figure>
  </div>

  <CodeCollapsibleWrapper v-else :class="props.class">
    <figure
      data-rehype-pretty-code-figure=""
      class="group relative [&>pre]:max-h-[650px] [&>pre]:overflow-auto"
    >
      <figcaption
        v-if="title"
        data-rehype-pretty-code-title=""
        class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
        :data-language="computedLang"
      >
        <component :is="getIconForLanguageExtension(computedLang)" />
        {{ title }}
      </figcaption>
      <div class="absolute top-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
        <CopyButton :value="code" class="hover:opacity-100" />
      </div>
      <div v-html="highlightedCode" />
    </figure>
  </CodeCollapsibleWrapper>
</template>
