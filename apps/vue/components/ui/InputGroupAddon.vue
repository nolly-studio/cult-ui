<script setup lang="ts">
import { cn } from "~/lib/utils"
import { inputGroupAddonVariants, type InputGroupAddonVariants } from "./InputGroup.vue"

const props = withDefaults(
  defineProps<{
    class?: string
    align?: NonNullable<InputGroupAddonVariants["align"]>
  }>(),
  {
    align: "inline-start",
  },
)

function handleClick(e: MouseEvent) {
  const target = e.target
  if (target instanceof HTMLElement && target.closest("button")) {
    return
  }
  const parent = (e.currentTarget instanceof HTMLElement) ? e.currentTarget.parentElement : null
  parent?.querySelector("input")?.focus()
}
</script>

<template>
  <div
    role="group"
    data-slot="input-group-addon"
    :data-align="align"
    :class="cn(inputGroupAddonVariants({ align }), props.class)"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
