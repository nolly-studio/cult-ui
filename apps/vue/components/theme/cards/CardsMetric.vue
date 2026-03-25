<script setup lang="ts">
import { useThemePrimaryColor } from '@/composables/useThemePrimaryColor'

const { primaryColor } = useThemePrimaryColor()

const data = [
  { average: 400, today: 240 },
  { average: 300, today: 139 },
  { average: 200, today: 980 },
  { average: 278, today: 390 },
  { average: 189, today: 480 },
  { average: 239, today: 380 },
  { average: 349, today: 430 },
]
const maxValue = Math.max(...data.map(d => Math.max(d.average, d.today)))
</script>

<template>
  <Card>
    <CardHeader class="px-2">
      <CardTitle>Exercise Minutes</CardTitle>
      <CardDescription>
        Your exercise minutes are ahead of where you normally are.
      </CardDescription>
    </CardHeader>
    <CardContent class="pb-4">
      <div class="flex h-[200px] items-end gap-2">
        <div v-for="(item, i) in data" :key="i" class="flex flex-1 gap-0.5 items-end h-full">
          <div
            class="flex-1 rounded-sm"
            :style="{
              height: `${(item.average / maxValue) * 100}%`,
              backgroundColor: primaryColor,
              opacity: 0.25,
            }"
          />
          <div
            class="flex-1 rounded-sm"
            :style="{
              height: `${(item.today / maxValue) * 100}%`,
              backgroundColor: primaryColor,
            }"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
