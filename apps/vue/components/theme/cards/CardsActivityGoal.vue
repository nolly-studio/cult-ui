<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { useThemePrimaryColor } from '@/composables/useThemePrimaryColor'

const { primaryColor } = useThemePrimaryColor()

const goal = ref(350)
const goalData = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349]
const maxGoal = Math.max(...goalData)

function onClick(adjustment: number) {
  goal.value = Math.max(200, Math.min(400, goal.value + adjustment))
}
</script>

<template>
  <Card>
    <CardHeader class="px-2 pb-4">
      <CardTitle class="text-base">Move Goal</CardTitle>
      <CardDescription>Set your daily activity goal.</CardDescription>
    </CardHeader>
    <CardContent class="px-2 pb-2">
      <div class="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          class="size-8 shrink-0 rounded-full"
          :disabled="goal <= 200"
          @click="onClick(-10)"
        >
          <Minus class="size-4" />
          <span class="sr-only">Decrease</span>
        </Button>
        <div class="flex-1 text-center">
          <div class="text-5xl font-bold tracking-tighter">{{ goal }}</div>
          <div class="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="size-8 shrink-0 rounded-full"
          :disabled="goal >= 400"
          @click="onClick(10)"
        >
          <Plus class="size-4" />
          <span class="sr-only">Increase</span>
        </Button>
      </div>
      <div class="my-3 flex h-[60px] items-end gap-0.5">
        <div
          v-for="(value, i) in goalData"
          :key="i"
          class="flex-1 rounded-sm"
          :style="{
            height: `${(value / maxGoal) * 100}%`,
            backgroundColor: primaryColor,
            opacity: 0.2,
          }"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">Set Goal</Button>
    </CardFooter>
  </Card>
</template>
