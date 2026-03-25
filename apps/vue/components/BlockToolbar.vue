<script setup lang="ts">
import { CircleHelp, Monitor, Smartphone, Tablet } from 'lucide-vue-next'
import { trackEvent } from '@/lib/events'
import { cn } from '@/lib/utils'
import { useLiftMode } from '@/composables/use-lift-mode'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import BlockCopyButton from '@/components/BlockCopyButton.vue'
import StyleSwitcher from '@/components/StyleSwitcher.vue'
import type { Block } from '@/registry/schema'

const props = defineProps<{
  block: Block & { hasLiftMode: boolean }
  resizablePanelRef: any
}>()

const { isLiftMode, toggleLiftMode } = useLiftMode(props.block.name)

function onCheckedChange(value: boolean) {
  props.resizablePanelRef?.resize(100)
  toggleLiftMode(props.block.name)

  if (value) {
    trackEvent({
      name: 'enable_lift_mode',
      properties: {
        name: props.block.name,
      },
    })
  }
}

function onToggleValueChange(value: string) {
  if (props.resizablePanelRef) {
    props.resizablePanelRef.resize(parseInt(value))
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 sm:flex-row">
    <div class="flex items-center gap-2">
      <TabsList class="hidden h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex">
        <TabsTrigger
          value="preview"
          class="h-[1.45rem] rounded-sm px-2 text-xs"
          :disabled="isLiftMode"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          class="h-[1.45rem] rounded-sm px-2 text-xs"
          :disabled="isLiftMode"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
      <StyleSwitcher
        class="h-[calc(theme(spacing.7)_-_1px)] dark:h-7"
        :disabled="isLiftMode"
      />
      <Popover>
        <PopoverTrigger
          :disabled="isLiftMode"
          class="hidden text-muted-foreground hover:text-foreground disabled:opacity-50 sm:flex"
        >
          <CircleHelp class="size-3.5" />
          <span class="sr-only">Block description</span>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          :side-offset="20"
          class="space-y-3 rounded-[0.5rem] text-sm"
        >
          <p class="font-medium">
            What is the difference between the New York and Default style?
          </p>
          <p>
            A style comes with its own set of components, animations, icons
            and more.
          </p>
          <p>
            The <span class="font-medium">Default</span> style has larger
            inputs, uses lucide-react for icons and tailwindcss-animate for
            animations.
          </p>
          <p>
            The <span class="font-medium">New York</span> style ships with
            smaller buttons and inputs. It also uses shadows on cards and
            buttons.
          </p>
        </PopoverContent>
      </Popover>
      <div class="hidden items-center gap-2 sm:flex">
        <Separator
          orientation="vertical"
          class="mx-2 mr-0 hidden h-4 md:flex"
        />
        <div class="flex items-center gap-2">
          <a :href="`#${block.name}`">
            <Badge
              variant="secondary"
              :class="cn('bg-transparent', isLiftMode && 'opacity-50')"
            >
              {{ block.name }}
            </Badge>
          </a>
        </div>
      </div>
    </div>
    <div v-if="block.code" class="flex items-center gap-2 pr-[14px] sm:ml-auto">
      <template v-if="block.hasLiftMode">
        <div class="flex h-7 items-center justify-between gap-2">
          <Label :for="`lift-mode-${block.name}`" class="text-xs">
            Lift Mode
          </Label>
          <Switch
            :id="`lift-mode-${block.name}`"
            :checked="isLiftMode"
            @update:checked="onCheckedChange"
          />
        </div>
        <Separator
          orientation="vertical"
          class="mx-2 hidden h-4 lg:inline-flex"
        />
      </template>
      <div class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex">
        <ToggleGroup
          :disabled="isLiftMode"
          type="single"
          default-value="100"
          @update:model-value="onToggleValueChange"
        >
          <ToggleGroupItem
            value="100"
            class="size-[22px] rounded-sm p-0"
          >
            <Monitor class="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="60"
            class="size-[22px] rounded-sm p-0"
          >
            <Tablet class="size-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="30"
            class="size-[22px] rounded-sm p-0"
          >
            <Smartphone class="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Separator
        orientation="vertical"
        class="mx-2 hidden h-4 md:flex"
      />
      <BlockCopyButton
        event="copy_block_code"
        :name="block.name"
        :code="block.code"
        :disabled="isLiftMode"
      />
    </div>
  </div>
</template>
