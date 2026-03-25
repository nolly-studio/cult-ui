<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  File,
  Image,
  Trash,
  Upload,
  XCircle,
} from 'lucide-vue-next'
import {
  FamilyDrawerButton,
  FamilyDrawerClose,
  FamilyDrawerContent,
  FamilyDrawerHeader,
  FamilyDrawerOverlay,
  FamilyDrawerPortal,
  FamilyDrawerRoot,
  FamilyDrawerTrigger,
} from '@/registry/default/ui/family-drawer'
</script>

<template>
  <div class="flex flex-col items-center gap-8 p-8">
    <h1 class="text-3xl font-bold">Family Drawer Demo</h1>
    <FamilyDrawerRoot>
      <FamilyDrawerTrigger>
        <button class="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm">
          Open Drawer
        </button>
      </FamilyDrawerTrigger>
      <FamilyDrawerPortal>
        <FamilyDrawerOverlay />
        <FamilyDrawerContent>
          <FamilyDrawerHeader>
            <h2 class="text-lg font-semibold">Custom Menu</h2>
          </FamilyDrawerHeader>
          <div class="space-y-3 p-4">
            <FamilyDrawerButton>
              <Upload class="w-4 h-4 mr-2" /> Upload Files
            </FamilyDrawerButton>
            <FamilyDrawerButton>
              <Image class="w-4 h-4 mr-2" /> Browse Images
            </FamilyDrawerButton>
            <FamilyDrawerButton>
              <File class="w-4 h-4 mr-2" /> Documents
            </FamilyDrawerButton>
          </div>
          <div class="p-4 border-t">
            <FamilyDrawerClose>
              <button class="w-full rounded-md border px-4 py-2 text-sm">Close</button>
            </FamilyDrawerClose>
          </div>
        </FamilyDrawerContent>
      </FamilyDrawerPortal>
    </FamilyDrawerRoot>
  </div>
</template>
