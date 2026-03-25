<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="relative z-50 w-full bg-[#ADFA1B] text-black">
    <a
      href="https://aisdkagents.com"
      target="_blank"
      rel="noopener"
      class="group flex items-center justify-center gap-3 px-4 py-1.5 transition-colors hover:bg-[#9de610]"
    >
      <div class="hidden h-px w-8 bg-gradient-to-r from-transparent to-black/10 sm:block" />
      <div class="flex items-center gap-2">
        <span class="border shadow-inner border-black/20 bg-black/5 px-1.5 py-0.5 font-pixel-square text-[10px] uppercase tracking-wider text-black">
          New
        </span>
        <span class="font-pixel-square text-[11px] uppercase tracking-wider text-black/80">
          AI SDK Agents
        </span>
        <span class="hidden font-pixel-square text-[11px] text-black/25 sm:inline">
          /
        </span>
        <span class="hidden font-pixel-square text-[11px] tracking-wider text-black/50 sm:inline">
          100+ AI agent patterns - just copy &amp; paste
        </span>
      </div>
      <ArrowRight class="size-3 text-black/40 transition-transform group-hover:translate-x-0.5 group-hover:text-black" />
      <div class="hidden h-px w-8 bg-gradient-to-l from-transparent to-black/10 sm:block" />
    </a>
  </div>
</template>
