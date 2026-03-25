<script setup lang="ts">
import { ArrowRight, Merge } from 'lucide-vue-next'
import { TextureButton } from '../ui/texture-button'
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from '../ui/texture-card'
</script>

<template>
  <div class="flex items-center justify-center py-4">
    <div class="dark:bg-stone-950 h-full rounded-md">
      <div class="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1">
        <div class="col-span-1 grid items-start gap-6 lg:col-span-1">
          <TextureCardStyled>
            <TextureCardHeader class="flex flex-col gap-1 items-center justify-center p-4">
              <div class="p-3 bg-neutral-950 rounded-full mb-3">
                <Merge class="h-7 w-7 stroke-neutral-200" />
              </div>
              <TextureCardTitle>Create your account</TextureCardTitle>
              <p class="text-center">Welcome! Please fill in the details to get started.</p>
            </TextureCardHeader>
            <TextureSeparator />
            <TextureCardContent>
              <div class="flex justify-center gap-2 mb-4">
                <TextureButton variant="icon">
                  <svg width="256" height="262" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="h-5 w-5">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                  </svg>
                  <span class="pl-2">Google</span>
                </TextureButton>
                <TextureButton variant="icon">
                  <svg viewBox="0 0 256 250" width="256" height="250" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="h-5 w-5">
                    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Z" fill="#545454" />
                  </svg>
                  <span class="pl-2">Github</span>
                </TextureButton>
              </div>
              <div class="text-center text-sm mb-4">or</div>
              <form class="flex flex-col gap-6">
                <div class="flex justify-between gap-2">
                  <div>
                    <label class="text-sm font-medium">First name</label>
                    <input type="text" required class="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80" />
                  </div>
                  <div>
                    <label class="text-sm font-medium">Last Name</label>
                    <input type="text" required class="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80" />
                  </div>
                </div>
                <div>
                  <label class="text-sm font-medium">Username</label>
                  <input type="text" required class="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80" />
                </div>
                <div>
                  <label class="text-sm font-medium">Email</label>
                  <input type="email" required class="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80" />
                </div>
                <div>
                  <label class="text-sm font-medium">Password</label>
                  <input type="password" required class="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80" />
                </div>
              </form>
            </TextureCardContent>
            <TextureSeparator />
            <TextureCardFooter class="border-b rounded-b-sm">
              <TextureButton variant="accent" class="w-full">
                <div class="flex gap-1 items-center justify-center">
                  Continue
                  <ArrowRight class="h-4 w-4 text-neutral-50 mt-[1px]" />
                </div>
              </TextureButton>
            </TextureCardFooter>
            <div class="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden">
              <div class="flex flex-col items-center justify-center">
                <div class="py-2 px-2">
                  <div class="text-center text-sm">
                    Already have an account? <span class="text-primary">Sign in</span>
                  </div>
                </div>
              </div>
              <TextureSeparator />
              <div class="flex flex-col items-center justify-center">
                <div class="py-2 px-2">
                  <div class="text-center text-xs">Secured by Supabase</div>
                </div>
              </div>
            </div>
          </TextureCardStyled>
        </div>
      </div>
    </div>
  </div>
</template>
