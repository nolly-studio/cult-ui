<script setup lang="ts">
import { provide, computed, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-vue-next"

defineOptions({ name: "SchemaDisplay" })

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface SchemaParameter {
  name: string
  type: string
  required?: boolean
  description?: string
  location?: "path" | "query" | "header"
}

export interface SchemaProperty {
  name: string
  type: string
  required?: boolean
  description?: string
  properties?: SchemaProperty[]
  items?: SchemaProperty
}

export interface SchemaDisplayContextType {
  method: HttpMethod
  path: string
  description?: string
  parameters?: SchemaParameter[]
  requestBody?: SchemaProperty[]
  responseBody?: SchemaProperty[]
}

export const schemaDisplayKey = Symbol("schemaDisplay") as InjectionKey<SchemaDisplayContextType>

const methodStyles: Record<HttpMethod, string> = {
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PATCH: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

const props = defineProps<{
  class?: string
  method: HttpMethod
  path: string
  description?: string
  parameters?: SchemaParameter[]
  requestBody?: SchemaProperty[]
  responseBody?: SchemaProperty[]
}>()

provide(schemaDisplayKey, {
  method: props.method,
  path: props.path,
  description: props.description,
  parameters: props.parameters,
  requestBody: props.requestBody,
  responseBody: props.responseBody,
})

const highlightedPath = computed(() =>
  props.path.replaceAll(
    /\{([^}]+)\}/g,
    '<span class="text-blue-600 dark:text-blue-400">{$1}</span>'
  )
)
</script>

<template>
  <div
    :class="cn('overflow-hidden rounded-lg border bg-background', props.class)"
  >
    <slot>
      <!-- Default layout matching React version -->
      <div class="flex items-center gap-3 border-b px-4 py-3">
        <div class="flex items-center gap-3">
          <span
            :class="cn('inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold transition-colors', methodStyles[props.method])"
          >
            {{ props.method }}
          </span>
          <span class="font-mono text-sm" v-html="highlightedPath" />
        </div>
      </div>

      <p
        v-if="props.description"
        class="border-b px-4 py-3 text-muted-foreground text-sm"
      >
        {{ props.description }}
      </p>

      <div class="divide-y">
        <SchemaDisplaySection
          v-if="props.parameters && props.parameters.length > 0"
          title="Parameters"
          :count="props.parameters.length"
        >
          <SchemaDisplayParameter
            v-for="param in props.parameters"
            :key="param.name"
            v-bind="param"
          />
        </SchemaDisplaySection>

        <SchemaDisplaySection
          v-if="props.requestBody && props.requestBody.length > 0"
          title="Request Body"
        >
          <SchemaDisplayPropertyItem
            v-for="prop in props.requestBody"
            :key="prop.name"
            v-bind="prop"
            :depth="0"
          />
        </SchemaDisplaySection>

        <SchemaDisplaySection
          v-if="props.responseBody && props.responseBody.length > 0"
          title="Response"
        >
          <SchemaDisplayPropertyItem
            v-for="prop in props.responseBody"
            :key="prop.name"
            v-bind="prop"
            :depth="0"
          />
        </SchemaDisplaySection>
      </div>
    </slot>
  </div>
</template>
