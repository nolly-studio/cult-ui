<script setup lang="ts">
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from '../ui/minimal-card'

const cards = [
  { id: 1, title: 'Sick title', description: 'How to design with gestures and motion that feel intuitive and natural.' },
  { id: 2, title: 'Sick title', description: 'How to design with gestures and motion that feel intuitive and natural.' },
  { id: 3, title: 'Sick title', description: 'How to design with gestures and motion that feel intuitive and natural.' },
  { id: 4, title: 'Sick title', description: 'How to design with gestures and motion that feel intuitive and natural.' },
  { id: 5, title: 'Sick title', description: 'How to design with gestures and motion that feel intuitive and natural.' },
]
</script>

<template>
  <div class="w-full max-w-4xl">
    <div class="min-h-[500px] p-4 flex flex-col justify-center rounded-lg space-y-4">
      <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <MinimalCard v-for="card in cards" :key="card.id">
          <MinimalCardImage src="/basic-img.png" :alt="card.title" />
          <MinimalCardTitle>{{ card.title }}</MinimalCardTitle>
          <MinimalCardDescription>{{ card.description }}</MinimalCardDescription>
        </MinimalCard>
      </div>
    </div>
  </div>
</template>
