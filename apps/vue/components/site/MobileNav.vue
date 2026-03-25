<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { docsConfig } from "~/config/docs"
import { siteConfig } from "~/config/site"

const open = ref(false)
const router = useRouter()

function goTo(href: string) {
  router.push(href)
  open.value = false
}
</script>

<template>
  <div class="md:hidden">
    <button
      class="mr-2 inline-flex items-center justify-center rounded-md px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      @click="open = !open"
    >
      <svg
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="size-5"
      >
        <path
          d="M3 5H11"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 12H16"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 19H21"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="sr-only">Toggle Menu</span>
    </button>

    <!-- Mobile nav overlay -->
    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="open"
          class="fixed inset-0 z-50 flex"
        >
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black/50"
            @click="open = false"
          />

          <!-- Panel -->
          <div class="relative z-50 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg">
            <button
              class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
              @click="open = false"
            >
              ✕
            </button>

            <a
              href="/"
              class="flex items-center"
              @click.prevent="goTo('/')"
            >
              <span class="text-lg font-bold sm:inline-block">cult ui</span>
              <span class="sr-only">{{ siteConfig.name }}</span>
            </a>

            <div class="flex flex-col space-y-3 bg-background pt-4">
              <a
                href="https://aisdkagents.com/patterns"
                target="_blank"
                rel="noopener noreferrer"
                class="text-base font-semibold transition-colors hover:text-foreground/80"
              >
                Blocks <span class="text-xs text-lime-500">(100 new)</span>
              </a>
              <a
                href="https://aisdkagents.com/templates"
                target="_blank"
                rel="noopener noreferrer"
                class="text-base font-semibold transition-colors hover:text-foreground/80"
              >
                Templates <span class="text-xs text-lime-500">(4 new)</span>
              </a>
            </div>

            <div class="my-4 mr-2 h-[calc(100vh-12rem)] overflow-y-auto rounded-sm px-3 pb-2">
              <div class="flex flex-col space-y-2">
                <div
                  v-for="(item, index) in docsConfig.sidebarNav"
                  :key="index"
                  class="flex flex-col space-y-3 pt-6"
                >
                  <h4 class="font-medium">{{ item.title }}</h4>
                  <template v-for="subItem in item.items" :key="subItem.href || subItem.title">
                    <a
                      v-if="subItem.href"
                      :href="subItem.href"
                      class="text-muted-foreground"
                      @click.prevent="goTo(subItem.href!)"
                    >
                      {{ subItem.title }}
                      <span
                        v-if="subItem.label"
                        class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
                      >
                        {{ subItem.label }}
                      </span>
                    </a>
                    <template v-else>
                      <span class="text-sm font-medium">{{ subItem.title }}</span>
                      <div
                        v-if="subItem.items?.length"
                        class="ml-4 flex flex-col space-y-2"
                      >
                        <a
                          v-for="nestedItem in subItem.items"
                          :key="nestedItem.href ?? ''"
                          :href="nestedItem.href ?? '#'"
                          class="text-sm text-muted-foreground"
                          @click.prevent="goTo(nestedItem.href ?? '#')"
                        >
                          {{ nestedItem.title }}
                          <span
                            v-if="nestedItem.label"
                            class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
                          >
                            {{ nestedItem.label }}
                          </span>
                        </a>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
