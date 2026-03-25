<script setup lang="ts">
import { ref, provide, inject, computed, watch, type InjectionKey, type Ref, type Component } from 'vue'

// Types
type ViewComponent = Component
interface ViewsRegistry {
  [viewName: string]: ViewComponent
}

// Context
interface FamilyDrawerContextType {
  isOpen: Ref<boolean>
  setIsOpen: (val: boolean) => void
  view: Ref<string>
  setView: (view: string) => void
  views: ViewsRegistry | undefined
}

const FAMILY_DRAWER_KEY: InjectionKey<FamilyDrawerContextType> = Symbol('family-drawer')

export function useFamilyDrawer() {
  const ctx = inject(FAMILY_DRAWER_KEY)
  if (!ctx) throw new Error('FamilyDrawer components must be used within FamilyDrawerRoot')
  return ctx
}

// Props
interface Props {
  open?: boolean
  defaultOpen?: boolean
  defaultView?: string
  views?: ViewsRegistry
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  defaultView: 'default',
  views: undefined,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  viewChange: [view: string]
}>()

// State
const internalOpen = ref(props.defaultOpen)
const view = ref(props.defaultView)

const isOpen = computed(() => props.open !== undefined ? props.open : internalOpen.value)
const isOpenRef = ref(isOpen.value)
watch(isOpen, (val) => { isOpenRef.value = val })

function setIsOpen(val: boolean) {
  if (props.open !== undefined) {
    emit('update:open', val)
  } else {
    internalOpen.value = val
  }
}

function setView(newView: string) {
  view.value = newView
  emit('viewChange', newView)
}

provide(FAMILY_DRAWER_KEY, {
  isOpen: isOpenRef,
  setIsOpen,
  view,
  setView,
  views: props.views,
})
</script>

<template>
  <div>
    <!-- Trigger -->
    <slot name="trigger" :open="() => setIsOpen(true)" />

    <!-- Overlay + Content -->
    <Teleport to="body">
      <Transition name="drawer-overlay">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-10 bg-black/30"
          @click="setView('default')"
        />
      </Transition>

      <Transition name="drawer-content">
        <div
          v-if="isOpen"
          class="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-background outline-none md:mx-auto md:w-full"
        >
          <div class="px-6 pb-6 pt-2.5 antialiased">
            <!-- Close button -->
            <button
              class="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform focus:scale-95 active:scale-75 cursor-pointer"
              @click="setIsOpen(false)"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Close</title>
                <path d="M10.4854 1.99998L2.00007 10.4853" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.4854 10.4844L2.00007 1.99908" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <!-- View content -->
            <slot :view="view" :set-view="setView" />

            <!-- Dynamic view component -->
            <component
              v-if="views && views[view]"
              :is="views[view]"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

.drawer-content-enter-active {
  transition: all 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-content-leave-active {
  transition: all 0.2s ease-in;
}
.drawer-content-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.drawer-content-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
