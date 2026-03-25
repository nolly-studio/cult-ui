<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  CircleIcon,
  TriangleIcon,
  SquareIcon,
  PentagonIcon,
  HexagonIcon,
  OctagonIcon,
  BlocksIcon,
} from 'lucide-vue-next'
import { Dock, DockCard, DockCardInner, DockDivider } from '@/registry/default/ui/dock'

const isMobile = ref(false)

onMounted(() => {
  const userAgent = navigator.userAgent
  const isSmall = window.matchMedia('(max-width: 768px)').matches
  const isMobileDevice = Boolean(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(userAgent)
  )
  isMobile.value = isSmall && isMobileDevice
})

const gradients = [
  'https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg',
  'https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg',
  'https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg',
  'https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg',
  'https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg',
  'https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg',
  null,
  'https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg',
]

const icons = [CircleIcon, TriangleIcon, SquareIcon, PentagonIcon, HexagonIcon, OctagonIcon, null, BlocksIcon]

const responsiveGradients = computed(() => isMobile.value ? gradients.slice(3) : gradients)
const responsiveIcons = computed(() => isMobile.value ? icons.slice(3) : icons)
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <Dock>
      <template v-for="(src, index) in responsiveGradients" :key="index">
        <DockCard v-if="src" :id="`${index}`">
          <DockCardInner :src="src" :id="`${index}`">
            <component
              v-if="responsiveIcons[index]"
              :is="responsiveIcons[index]!"
              class="h-8 w-8 fill-black stroke-black rounded-full"
            />
          </DockCardInner>
        </DockCard>
        <DockDivider v-else />
      </template>
    </Dock>
  </div>
</template>
