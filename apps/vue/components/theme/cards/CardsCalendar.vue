<script setup lang="ts">
import { addDays } from 'date-fns'

const start = new Date(2023, 5, 5)
const range = { from: start, to: addDays(start, 8) }
</script>

<template>
  <Card class="max-w-[280px]">
    <CardContent class="p-0">
      <Calendar
        :number-of-months="1"
        mode="range"
        :default-month="start"
        :selected="range"
      />
    </CardContent>
  </Card>
</template>
