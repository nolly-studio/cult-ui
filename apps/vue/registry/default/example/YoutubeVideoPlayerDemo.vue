<script setup lang="ts">
import { YouTubePlayer } from '../ui/youtube-video-player'
</script>

<template>
  <div class="space-y-12 p-8">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold">YouTube Video Player Examples</h1>
      <p class="text-muted-foreground">A collection of YouTube video player examples showcasing different configurations.</p>
    </div>

    <section class="space-y-4">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Custom Thumbnail</h2>
        <p class="text-muted-foreground">Player with a custom thumbnail image.</p>
      </div>
      <div class="max-w-2xl">
        <YouTubePlayer
          video-id="jNQXAC9IVRw"
          title="Me at the zoo - First YouTube Video"
          custom-thumbnail="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&crop=center"
        />
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Multiple Players</h2>
        <p class="text-muted-foreground">A grid of multiple video players.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <YouTubePlayer video-id="9bZkp7q19f0" title="PSY - GANGNAM STYLE" class="w-full" />
        <YouTubePlayer video-id="fJ9rUzIMcZQ" title="Queen - Bohemian Rhapsody" class="w-full" />
        <YouTubePlayer video-id="L_jWHffIx5E" title="Smash Mouth - All Star" class="w-full" />
        <YouTubePlayer video-id="hTWKbfoikeg" title="Nirvana - Smells Like Teen Spirit" class="w-full" />
        <YouTubePlayer video-id="djV11Xbc914" title="a-ha - Take On Me" class="w-full" />
        <YouTubePlayer video-id="ZbZSe6N_BXs" title="Happy - Pharrell Williams" class="w-full" />
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Different Sizes</h2>
        <p class="text-muted-foreground">Players in different container sizes.</p>
      </div>
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-medium mb-3">Small (300px)</h3>
          <div class="w-[300px]">
            <YouTubePlayer video-id="2yJgwwDcgV8" title="Nyan Cat [original]" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-3">Medium (500px)</h3>
          <div class="w-[500px]">
            <YouTubePlayer video-id="oHg5SJYRHA0" title="RickRoll'D" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-3">Large (800px)</h3>
          <div class="w-[800px]">
            <YouTubePlayer video-id="y6120QOlsfU" title="Darude - Sandstorm" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
