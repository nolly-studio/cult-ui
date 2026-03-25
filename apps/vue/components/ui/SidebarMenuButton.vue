<script setup lang="ts">
import { Primitive } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "SidebarMenuButton" })

const props = withDefaults(
  defineProps<{
    class?: string
    asChild?: boolean
    isActive?: boolean
  }>(),
  {
    asChild: false,
    isActive: false,
  }
)
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'button'"
    :as-child="asChild"
    data-slot="sidebar-menu-button"
    :data-active="isActive ? 'true' : 'false'"
    :type="asChild ? undefined : 'button'"
    :class="
      cn(
        'relative flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-[0.8rem] font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-foreground',
        props.class
      )
    "
  >
    <slot />
  </Primitive>
</template>
