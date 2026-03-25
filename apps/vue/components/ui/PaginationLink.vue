<script setup lang="ts">
import { cn } from "@/lib/utils"
import { buttonVariants } from "./Button.vue"

defineOptions({ name: "PaginationLink" })

const props = withDefaults(
  defineProps<{
    class?: string
    isActive?: boolean
    size?: "default" | "sm" | "lg" | "icon"
    href?: string
  }>(),
  {
    isActive: false,
    size: "icon",
  }
)
</script>

<template>
  <a
    :href="href"
    :aria-current="isActive ? 'page' : undefined"
    :class="
      cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        props.class
      )
    "
  >
    <slot />
  </a>
</template>
