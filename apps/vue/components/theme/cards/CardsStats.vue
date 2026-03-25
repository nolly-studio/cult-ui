<script setup lang="ts">
import { useThemePrimaryColor } from '@/composables/useThemePrimaryColor'

const { primaryColor } = useThemePrimaryColor()

const revenueData = [10400, 14405, 9400, 8200, 7000, 9600, 11244, 26475]
const subscriptionData = [240, 300, 200, 278, 189, 239, 278, 189]
const maxRevenue = Math.max(...revenueData)
const maxSubscription = Math.max(...subscriptionData)
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 px-2 pb-2">
        <CardTitle class="text-base font-normal">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">$15,231.89</div>
        <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        <div class="mt-4 flex h-[80px] items-end gap-1">
          <div
            v-for="(value, i) in revenueData"
            :key="i"
            class="flex-1 rounded-sm"
            :style="{
              height: `${(value / maxRevenue) * 100}%`,
              backgroundColor: primaryColor,
              opacity: 0.8,
            }"
          />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-base font-normal">Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">+2350</div>
        <p class="text-xs text-muted-foreground">+180.1% from last month</p>
        <div class="mt-4 flex h-[80px] items-end gap-1">
          <div
            v-for="(value, i) in subscriptionData"
            :key="i"
            class="flex-1 rounded-sm"
            :style="{
              height: `${(value / maxSubscription) * 100}%`,
              backgroundColor: primaryColor,
            }"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
