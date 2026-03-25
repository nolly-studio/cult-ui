<script setup lang="ts">
import { NavigationMenuList } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "NavigationMenuList" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <NavigationMenuList
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center space-x-1',
        props.class
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
