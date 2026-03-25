<script setup lang="ts">
import { useId } from 'vue'
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from '@/registry/default/ui/expandable-screen'

const nameId = useId()
const emailId = useId()
const websiteId = useId()
const companySizeId = useId()
const messageId = useId()
</script>

<template>
  <ExpandableScreen
    layout-id="cta-card"
    trigger-radius="100px"
    content-radius="24px"
  >
    <div class="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
      <div class="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[90%] tracking-[-0.03em] text-foreground mix-blend-exclusion max-w-2xl">
          Join the waitlist
        </h1>
        <p class="text-base sm:text-lg md:text-xl leading-[160%] text-foreground max-w-2xl px-4">
          Be among the first to experience our next-generation platform.
        </p>
        <ExpandableScreenTrigger>
          <div class="bg-primary h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-primary-foreground tracking-[-0.01em]">
            Get early access
          </div>
        </ExpandableScreenTrigger>
      </div>
    </div>

    <ExpandableScreenContent class="bg-primary">
      <div class="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
        <div class="flex-1 flex flex-col justify-center space-y-3 w-full">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
            Reserve your spot
          </h2>
          <div class="space-y-4 sm:space-y-6 pt-4">
            <div class="flex gap-3 sm:gap-4">
              <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Icon</title>
                  <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm sm:text-base text-primary-foreground leading-[150%]">
                Get priority access to new features and updates before public release.
              </p>
            </div>
            <div class="flex gap-3 sm:gap-4">
              <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Icon</title>
                  <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p class="text-sm sm:text-base text-primary-foreground leading-[150%]">
                Join a community of early adopters and help influence our product roadmap.
              </p>
            </div>
          </div>
          <div class="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-primary-foreground/20">
            <p class="text-lg sm:text-xl lg:text-2xl text-primary-foreground leading-[150%] mb-4">
              The waitlist has been a game-changer for our workflow. Highly recommend joining early.
            </p>
            <div class="flex items-center gap-3 sm:gap-4">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Alex Rivera"
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <p class="text-base sm:text-lg lg:text-xl text-primary-foreground">Alex Rivera</p>
                <p class="text-sm sm:text-base text-primary-foreground/70">Early Access Member</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full">
          <form class="space-y-4 sm:space-y-5">
            <div>
              <label :for="nameId" class="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">FULL NAME *</label>
              <input type="text" :id="nameId" name="name" class="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
            </div>
            <div>
              <label :for="emailId" class="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">EMAIL *</label>
              <input type="email" :id="emailId" name="email" class="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <label :for="websiteId" class="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">USE CASE</label>
                <input type="text" :id="websiteId" name="use-case" placeholder="e.g., Project management" class="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10" />
              </div>
              <div class="sm:w-32 w-full">
                <label :for="companySizeId" class="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">TEAM SIZE</label>
                <select :id="companySizeId" name="team-size" class="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10">
                  <option value="">Select</option>
                  <option value="solo">Solo</option>
                  <option value="2-5">2-5</option>
                  <option value="6-20">6-20</option>
                  <option value="21-50">21-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
            </div>
            <div>
              <label :for="messageId" class="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase">WHAT ARE YOU MOST EXCITED ABOUT?</label>
              <textarea :id="messageId" name="excited-about" rows="3" placeholder="Tell us what features you're looking forward to..." class="w-full px-4 py-3 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all resize-none text-sm" />
            </div>
            <button type="submit" class="w-full px-8 py-2.5 rounded-full bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors tracking-[-0.03em] h-10">
              Join waitlist
            </button>
          </form>
        </div>
      </div>
    </ExpandableScreenContent>
  </ExpandableScreen>
</template>
