<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const timeOfDay = ref('today')
let intervalId: ReturnType<typeof setInterval> | null = null

function updateTimeOfDay() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    timeOfDay.value = 'this morning'
  } else if (hour >= 12 && hour < 17) {
    timeOfDay.value = 'this afternoon'
  } else if (hour >= 17 && hour < 22) {
    timeOfDay.value = 'this evening'
  } else {
    timeOfDay.value = 'today'
  }
}

onMounted(() => {
  updateTimeOfDay()
  intervalId = setInterval(updateTimeOfDay, 60_000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <span>{{ timeOfDay }}</span>
</template>
