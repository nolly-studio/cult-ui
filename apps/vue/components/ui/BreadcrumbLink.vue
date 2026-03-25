<script setup lang="ts">
import { Primitive } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "BreadcrumbLink" })

const props = withDefaults(
  defineProps<{
    class?: string
    asChild?: boolean
    href?: string
  }>(),
  { asChild: false }
)
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'a'"
    :as-child="asChild"
    :href="asChild ? undefined : href"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
