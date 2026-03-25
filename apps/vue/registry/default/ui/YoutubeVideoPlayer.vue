<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Maximize2, Minimize2, Play } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  videoId: string
  title?: string
  defaultExpanded?: boolean
  customThumbnail?: string
  class?: string
  containerClass?: string
  expandedClass?: string
  thumbnailClass?: string
  thumbnailImageClass?: string
  playButtonClass?: string
  playIconClass?: string
  titleClass?: string
  controlsClass?: string
  expandButtonClass?: string
  backdropClass?: string
  playerClass?: string
}>(), {
  defaultExpanded: false,
})

const expanded = ref(props.defaultExpanded)
const playing = ref(false)
const isHovered = ref(false)

const actualVideoId = computed(() => {
  const id = props.videoId
  if (id.includes('youtube.com') || id.includes('youtu.be')) {
    try {
      const url = new URL(id)
      if (id.includes('youtube.com')) {
        return url.searchParams.get('v') || ''
      } else {
        return url.pathname.substring(1)
      }
    } catch {
      return id
    }
  }
  return id
})

const thumbnailUrl = computed(() => {
  if (props.customThumbnail) return props.customThumbnail
  return actualVideoId.value
    ? `https://i.ytimg.com/vi/${actualVideoId.value}/hqdefault.jpg`
    : ''
})

const embedUrl = computed(() =>
  `https://www.youtube.com/embed/${actualVideoId.value}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1`
)

const shouldShowControls = computed(() => !playing.value || isHovered.value || expanded.value)

function handlePlay() {
  playing.value = true
}

function toggleExpand() {
  expanded.value = !expanded.value
}

// Handle Escape key
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && expanded.value) {
    expanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <!-- Main container -->
  <div
    :class="cn(
      'relative',
      expanded ? 'invisible' : 'visible',
      props.class
    )"
  >
    <div
      :class="cn(
        'overflow-hidden border bg-card text-card-foreground shadow-lg rounded-xl',
        containerClass
      )"
    >
      <div :class="cn('relative aspect-video bg-muted', playerClass)">
        <!-- Thumbnail state -->
        <template v-if="!playing">
          <div
            :class="cn(
              'absolute inset-0 bg-gradient-to-br from-muted to-muted/80',
              thumbnailClass
            )"
          >
            <img
              v-if="thumbnailUrl"
              :src="thumbnailUrl"
              :alt="title || 'Video thumbnail'"
              :class="cn(
                'absolute inset-0 h-full w-full object-cover opacity-70',
                thumbnailImageClass
              )"
            />
          </div>

          <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
            <button
              :class="cn(
                'relative h-16 w-16 rounded-full border border-border/20 bg-background/80 backdrop-blur-sm md:h-20 md:w-20 p-0 inline-flex items-center justify-center',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                playButtonClass
              )"
              aria-label="Play video"
              @click="handlePlay"
            >
              <Play
                :class="cn(
                  'h-6 w-6 translate-x-[2px] fill-primary text-primary md:h-8 md:w-8',
                  playIconClass
                )"
              />
            </button>

            <h3
              v-if="title"
              :class="cn(
                'mt-4 max-w-xs text-center text-sm font-medium text-secondary/90 md:max-w-md md:text-base',
                titleClass
              )"
            >
              {{ title }}
            </h3>
          </div>
        </template>

        <!-- Playing state -->
        <iframe
          v-if="playing"
          :src="embedUrl"
          :title="title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="h-full w-full border-0"
        />

        <!-- Controls overlay -->
        <Transition name="fade">
          <div
            v-if="shouldShowControls"
            :class="cn('absolute right-2 top-2 z-20', controlsClass)"
          >
            <button
              :class="cn(
                'h-8 w-8 rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 focus-visible:ring-ring/50 md:h-9 md:w-9 inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95',
                expandButtonClass
              )"
              :aria-label="expanded ? 'Minimize video' : 'Maximize video'"
              @click="toggleExpand"
            >
              <Minimize2 v-if="expanded" class="h-4 w-4 md:h-5 md:w-5" />
              <Maximize2 v-else class="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>

  <!-- Expanded state -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="expanded"
        :class="cn(
          'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
          backdropClass
        )"
        aria-label="Close expanded video"
        @click="toggleExpand"
      />
    </Transition>

    <Transition name="scale">
      <div
        v-if="expanded"
        class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div
          :class="cn(
            'overflow-hidden border bg-card text-card-foreground shadow-xl rounded-lg pointer-events-auto',
            'w-[90vw] max-w-[1200px] max-h-[90vh] aspect-video',
            expandedClass
          )"
        >
          <div :class="cn('relative aspect-video bg-muted', playerClass)">
            <template v-if="!playing">
              <div
                :class="cn(
                  'absolute inset-0 bg-gradient-to-br from-muted to-muted/80',
                  thumbnailClass
                )"
              >
                <img
                  v-if="thumbnailUrl"
                  :src="thumbnailUrl"
                  :alt="title || 'Video thumbnail'"
                  :class="cn(
                    'absolute inset-0 h-full w-full object-cover opacity-70',
                    thumbnailImageClass
                  )"
                />
              </div>

              <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
                <button
                  :class="cn(
                    'relative h-16 w-16 rounded-full border border-border/20 bg-background/80 backdrop-blur-sm md:h-20 md:w-20 p-0 inline-flex items-center justify-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    playButtonClass
                  )"
                  aria-label="Play video"
                  @click="handlePlay"
                >
                  <Play
                    :class="cn(
                      'h-6 w-6 translate-x-[2px] fill-primary text-primary md:h-8 md:w-8',
                      playIconClass
                    )"
                  />
                </button>

                <h3
                  v-if="title"
                  :class="cn(
                    'mt-4 max-w-xs text-center text-sm font-medium text-foreground/90 md:max-w-md md:text-base',
                    titleClass
                  )"
                >
                  {{ title }}
                </h3>
              </div>
            </template>

            <iframe
              v-if="playing"
              :src="embedUrl"
              :title="title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="h-full w-full border-0"
            />

            <!-- Controls overlay -->
            <Transition name="fade">
              <div
                v-if="shouldShowControls"
                :class="cn('absolute right-2 top-2 z-20', controlsClass)"
              >
                <button
                  :class="cn(
                    'h-8 w-8 rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 focus-visible:ring-ring/50 md:h-9 md:w-9 inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95',
                    expandButtonClass
                  )"
                  :aria-label="expanded ? 'Minimize video' : 'Maximize video'"
                  @click="toggleExpand"
                >
                  <Minimize2 v-if="expanded" class="h-4 w-4 md:h-5 md:w-5" />
                  <Maximize2 v-else class="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
