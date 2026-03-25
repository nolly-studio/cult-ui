<script setup lang="ts">
interface OGAttr {
  img: string
  title?: string
  desc?: string
  url: string
}

defineProps<{
  variant: "facebook" | "twitter" | "linkedin" | "sms" | "ios-shell"
} & OGAttr>()
</script>

<template>
  <!-- Facebook OG Card -->
  <div v-if="variant === 'facebook'" class="max-w-full cursor-pointer overflow-hidden rounded-md bg-white font-[Helvetica] shadow-lg">
    <div class="relative h-56 w-full md:h-72">
      <img :src="img" :alt="title || ''" class="size-full rounded-t-md object-cover" />
    </div>
    <div class="p-4">
      <p class="truncate text-xs text-gray-500 md:text-sm">{{ url }}</p>
      <h4 class="mt-1 truncate text-lg font-semibold text-gray-900 md:text-xl">{{ title }}</h4>
      <p class="mt-1 line-clamp-2 text-sm text-gray-700 md:text-neutral-500">{{ desc }}</p>
    </div>
  </div>

  <!-- Twitter OG Card -->
  <div v-else-if="variant === 'twitter'" class="relative max-w-full overflow-hidden rounded-lg bg-black shadow-lg">
    <div class="relative h-56 w-full md:h-72">
      <img :src="img" :alt="title || ''" class="size-full object-cover" />
    </div>
    <div class="absolute bottom-2 left-2 rounded px-1 py-0.5 text-xs text-white md:text-sm">
      {{ url }}
    </div>
  </div>

  <!-- LinkedIn OG Card -->
  <div v-else-if="variant === 'linkedin'" class="max-w-full overflow-hidden rounded-sm bg-white shadow-lg">
    <div class="relative h-56 w-full md:h-72">
      <img :src="img" :alt="title || ''" class="size-full object-cover" />
    </div>
    <div class="p-4">
      <h4 class="truncate text-lg font-semibold text-gray-900 md:text-xl">{{ title }}</h4>
      <p class="truncate text-xs text-gray-500 md:text-sm">{{ url }}</p>
    </div>
  </div>

  <!-- SMS OG Card -->
  <div v-else-if="variant === 'sms'" class="flex max-w-full flex-col overflow-hidden rounded-3xl border shadow-lg">
    <div class="relative h-56 w-full md:h-56">
      <img :src="img" alt="Article Thumbnail" class="size-full rounded-t-3xl object-cover" />
    </div>
    <div class="flex items-center space-x-4 bg-white p-4">
      <div class="flex min-w-0 flex-1 flex-col">
        <p class="truncate text-sm font-semibold text-neutral-500 md:text-neutral-500">{{ title }}</p>
        <p class="truncate text-xs text-neutral-500 md:text-sm">{{ url }}</p>
      </div>
    </div>
  </div>

  <!-- iOS Shell Card -->
  <div v-else-if="variant === 'ios-shell'" class="shadow-inner-shadow mx-auto flex max-w-xs flex-col rounded-lg bg-neutral-900 px-px pb-px md:max-w-md">
    <div class="flex flex-col p-4 md:px-5">
      <div class="mb-2 text-sm text-neutral-500">iMessage</div>
      <div class="mb-3 text-xs text-neutral-500 md:text-sm">Today 11:29</div>
      <div class="mb-3 ml-auto rounded-2xl bg-blue-500 px-4 py-2 text-white">
        <span>Check out this new product!</span>
      </div>
      <slot />
      <div class="mt-3 text-xs text-neutral-500 md:text-sm">Delivered</div>
    </div>
  </div>
</template>
