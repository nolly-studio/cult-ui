<script lang="ts">
import type { InjectionKey } from "vue"

export type ChangeType = "major" | "minor" | "patch" | "added" | "removed"

export interface PackageInfoContextType {
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: ChangeType
}

export const packageInfoKey: InjectionKey<PackageInfoContextType> = Symbol("packageInfo")

export function usePackageInfoContext() {
  const context = inject(packageInfoKey)
  if (!context) {
    throw new Error("PackageInfo components must be used within a PackageInfo provider")
  }
  return context
}
</script>

<script setup lang="ts">
import { computed, provide, inject } from "vue"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, MinusIcon, PackageIcon, PlusIcon } from "lucide-vue-next"

defineOptions({ name: "PackageInfo" })

const props = defineProps<{
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: ChangeType
  class?: string
}>()

provide(packageInfoKey, {
  name: props.name,
  currentVersion: props.currentVersion,
  newVersion: props.newVersion,
  changeType: props.changeType,
})

const changeTypeStyles: Record<ChangeType, string> = {
  added: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  major: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  minor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  patch: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  removed: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
}

const hasVersions = computed(() => props.currentVersion || props.newVersion)
</script>

<template>
  <div :class="cn('rounded-lg border bg-background p-4', props.class)">
    <slot>
      <!-- Default content: header + version -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <PackageIcon class="size-4 text-muted-foreground" />
          <span class="font-medium font-mono text-sm">{{ props.name }}</span>
        </div>
        <Badge
          v-if="props.changeType"
          :class="cn('gap-1 text-xs capitalize', changeTypeStyles[props.changeType])"
          variant="secondary"
        >
          <PlusIcon v-if="props.changeType === 'added'" class="size-3" />
          <MinusIcon v-else-if="props.changeType === 'removed'" class="size-3" />
          <ArrowRightIcon v-else class="size-3" />
          {{ props.changeType }}
        </Badge>
      </div>
      <div
        v-if="hasVersions"
        class="mt-2 flex items-center gap-2 font-mono text-muted-foreground text-sm"
      >
        <span v-if="props.currentVersion">{{ props.currentVersion }}</span>
        <ArrowRightIcon v-if="props.currentVersion && props.newVersion" class="size-3" />
        <span v-if="props.newVersion" class="font-medium text-foreground">{{ props.newVersion }}</span>
      </div>
    </slot>
  </div>
</template>
