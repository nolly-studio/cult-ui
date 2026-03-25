<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBlock } from '@/lib/blocks'
import BlockPreview from '@/components/BlockPreview.vue'
import { styles } from '@/registry/styles'

const props = defineProps<{
  name: string
}>()

const blocks = ref<any[]>([])

onMounted(async () => {
  const results = await Promise.all(
    styles.map(async (style) => {
      const block = await getBlock(props.name, style.name)
      const hasLiftMode = block?.chunks ? block.chunks.length > 0 : false

      // Cannot (and don't need to) pass to the client.
      const { component, chunks, ...rest } = block ?? {}

      return {
        ...rest,
        hasLiftMode,
      }
    })
  )

  blocks.value = results.filter(Boolean)
})
</script>

<template>
  <template v-if="blocks.length">
    <BlockPreview
      v-for="block in blocks"
      :key="`${block.style}-${block.name}`"
      :block="block"
    />
  </template>
</template>
