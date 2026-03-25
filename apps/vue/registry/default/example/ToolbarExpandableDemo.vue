<script setup lang="ts">
import { ref } from 'vue'
import {
  CheckCircle,
  Code,
  Database,
  Download,
  Palette,
  Rocket,
  Settings,
  Upload,
} from 'lucide-vue-next'
import ToolbarExpandable from '../ui/toolbar-expandable'

const deploymentSteps = [
  { id: 'setup', title: 'Project Setup', description: 'Initialize your project with the required dependencies and configuration.', icon: Settings },
  { id: 'configure', title: 'Configuration', description: 'Set up environment variables and project settings.', icon: Database },
  { id: 'customize', title: 'Customize Design', description: 'Personalize your application\'s appearance.', icon: Palette },
  { id: 'upload', title: 'Upload Assets', description: 'Upload your project files and assets.', icon: Upload },
  { id: 'deploy', title: 'Deploy', description: 'Deploy your application to production.', icon: Rocket },
]

const downloadSteps = [
  { id: 'format', title: 'Choose Format', description: 'Select the download format.', icon: Download },
  { id: 'options', title: 'Download Options', description: 'Configure additional options.', icon: Settings },
]

const controlledExpanded = ref(false)
const controlledActiveStep = ref<string | null>(null)
</script>

<template>
  <div>
    <div class="max-w-sm sm:max-w-5xl mx-auto">
      <div class="relative">
        <div class="px-4 sm:px-6 pt-8 sm:pt-16 pb-8 sm:pb-12 text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-muted text-muted-foreground rounded-full border">
            Component Demo
          </div>
          <h1 class="text-2xl sm:text-3xl font-semibold text-foreground mb-3 text-balance">
            Dynamic Toolbar Expandable
          </h1>
          <p class="text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed text-sm sm:text-base">
            Sophisticated expandable toolbar with smooth animations and step-based navigation.
          </p>
        </div>
      </div>

      <div class="space-y-12 sm:space-y-16 max-w-2xl mx-auto px-4 sm:px-0">
        <section class="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
          <div class="mb-8">
            <h2 class="text-lg font-medium text-foreground mb-2">Controlled Usage</h2>
            <p class="text-sm text-muted-foreground">External state management for programmatic control</p>
          </div>
          <div class="mb-6 p-3 sm:p-4">
            <div class="flex flex-wrap gap-2 mb-3">
              <button class="h-9 rounded-md border border-input bg-transparent px-3 text-xs sm:text-sm hover:bg-accent" @click="controlledExpanded = !controlledExpanded; if (!controlledExpanded) controlledActiveStep = null; else if (!controlledActiveStep) controlledActiveStep = 'setup'">
                {{ controlledExpanded ? 'Collapse' : 'Expand' }}
              </button>
              <button class="h-9 rounded-md border border-input bg-transparent px-3 text-xs sm:text-sm hover:bg-accent" @click="controlledExpanded = true; controlledActiveStep = 'configure'">
                Configuration
              </button>
              <button class="h-9 rounded-md border border-input bg-transparent px-3 text-xs sm:text-sm hover:bg-accent" @click="controlledExpanded = true; controlledActiveStep = 'deploy'">
                Deploy
              </button>
              <button class="h-9 rounded-md bg-transparent px-3 text-xs sm:text-sm hover:bg-accent" @click="controlledExpanded = false; controlledActiveStep = null">
                Reset
              </button>
            </div>
            <div class="text-xs text-muted-foreground font-mono">
              expanded: {{ controlledExpanded }} &bull; active: {{ controlledActiveStep || 'null' }}
            </div>
          </div>
          <ToolbarExpandable
            :steps="deploymentSteps"
            badge-text="CONTROLLED"
            :expanded="controlledExpanded"
            @update:expanded="controlledExpanded = $event"
            :active-step="controlledActiveStep"
            @update:active-step="controlledActiveStep = $event"
          />
        </section>

        <section class="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
          <div class="mb-8">
            <h2 class="text-lg font-medium text-foreground mb-2">Deployment Workflow</h2>
            <p class="text-sm text-muted-foreground">5-step process with internal state management</p>
          </div>
          <ToolbarExpandable :steps="deploymentSteps" badge-text="DEPLOYMENT" />
        </section>

        <section class="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
          <div class="mb-8">
            <h2 class="text-lg font-medium text-foreground mb-2">Download Configuration</h2>
            <p class="text-sm text-muted-foreground">2-step process for download preferences</p>
          </div>
          <ToolbarExpandable :steps="downloadSteps" badge-text="DOWNLOAD" />
        </section>
      </div>
    </div>
  </div>
</template>
