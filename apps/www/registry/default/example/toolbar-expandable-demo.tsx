"use client"

import { useState } from "react"
import {
  CheckCircle,
  Code,
  Database,
  Download,
  Palette,
  Rocket,
  Settings,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ToolbarExpandable from "@/registry/default/ui/toolbar-expandable"

const deploymentSteps = [
  {
    id: "setup",
    title: "Project Setup",
    description:
      "Initialize your project with the required dependencies and configuration.",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input id="project-name" placeholder="my-awesome-app" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="framework">Framework</Label>
          <select className="w-full p-2 border rounded-md">
            <option>Next.js</option>
            <option>React</option>
            <option>Vue.js</option>
          </select>
        </div>
        <Button className="w-full">
          <Code className="w-4 h-4 mr-2" />
          Initialize Project
        </Button>
      </div>
    ),
  },
  {
    id: "configure",
    title: "Configuration",
    description:
      "Set up environment variables and project settings for optimal performance.",
    icon: Database,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="database-url">Database URL</Label>
          <Input id="database-url" placeholder="postgresql://..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <select className="w-full p-2 border rounded-md">
            <option>Development</option>
            <option>Staging</option>
            <option>Production</option>
          </select>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    ),
  },
  {
    id: "customize",
    title: "Customize Design",
    description:
      "Personalize your application's appearance and branding elements.",
    icon: Palette,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-md border-2 border-blue-600"></div>
              <div className="w-8 h-8 bg-green-500 rounded-md"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-md"></div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <select className="w-full p-2 border rounded-md">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Logo Upload</Label>
          <Input id="logo" type="file" accept="image/*" />
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <Palette className="w-4 h-4 mr-2" />
          Apply Theme
        </Button>
      </div>
    ),
  },
  {
    id: "upload",
    title: "Upload Assets",
    description:
      "Upload your project files, images, and other assets to the platform.",
    icon: Upload,
    content: (
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
          <Button variant="outline" size="sm">
            Choose Files
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Asset Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your assets..."
            rows={3}
          />
        </div>
        <Button className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Assets
        </Button>
      </div>
    ),
  },
  {
    id: "deploy",
    title: "Deploy",
    description:
      "Deploy your application to production with automatic scaling and monitoring.",
    icon: Rocket,
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Ready to Deploy</span>
          </div>
          <p className="text-sm text-green-700">
            All checks passed. Your application is ready for production
            deployment.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Deployment Region</Label>
          <select className="w-full p-2 border rounded-md">
            <option>US East (Virginia)</option>
            <option>US West (California)</option>
            <option>Europe (Frankfurt)</option>
            <option>Asia Pacific (Singapore)</option>
          </select>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Rocket className="w-4 h-4 mr-2" />
          Deploy to Production
        </Button>
      </div>
    ),
  },
]

const downloadSteps = [
  {
    id: "format",
    title: "Choose Format",
    description: "Select the download format that best suits your needs.",
    icon: Download,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="format" value="zip" defaultChecked />
            <div>
              <div className="font-medium">ZIP Archive</div>
              <div className="text-sm text-gray-600">
                Complete project as compressed file
              </div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="format" value="git" />
            <div>
              <div className="font-medium">Git Repository</div>
              <div className="text-sm text-gray-600">
                Clone-ready repository with history
              </div>
            </div>
          </label>
        </div>
      </div>
    ),
  },
  {
    id: "options",
    title: "Download Options",
    description: "Configure additional options for your download.",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Include dependencies</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Include documentation</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm">Include example files</span>
          </label>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Configure Options
        </Button>
      </div>
    ),
  },
]

export default function DynamicToolbarDemo() {
  const [controlledExpanded, setControlledExpanded] = useState(false)
  const [controlledActiveStep, setControlledActiveStep] = useState<
    string | null
  >(null)

  return (
    <div className="">
      <div className="max-w-sm sm:max-w-5xl mx-auto">
        <div className="relative">
          <div className="px-4 sm:px-6 pt-8 sm:pt-16 pb-8 sm:pb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-muted text-muted-foreground rounded-full border">
              Component Demo
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 text-balance">
              Dynamic Toolbar Expandable
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed text-sm sm:text-base">
              Sophisticated expandable toolbar with smooth animations and
              step-based navigation for complex workflows.
            </p>
          </div>
        </div>

        <div className="space-y-12 sm:space-y-16 max-w-2xl mx-auto px-4 sm:px-0">
          <section className="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Controlled Usage
              </h2>
              <p className="text-sm text-muted-foreground">
                External state management for programmatic control
              </p>
            </div>

            <div className="mb-6 p-3 sm:p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setControlledExpanded(!controlledExpanded)
                    if (!controlledExpanded && !controlledActiveStep) {
                      setControlledActiveStep("setup")
                    }
                  }}
                >
                  {controlledExpanded ? "Collapse" : "Expand"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setControlledExpanded(true)
                    setControlledActiveStep("configure")
                  }}
                >
                  Configuration
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setControlledExpanded(true)
                    setControlledActiveStep("deploy")
                  }}
                >
                  Deploy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setControlledExpanded(false)
                    setControlledActiveStep(null)
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                expanded: {controlledExpanded.toString()} • active:{" "}
                {controlledActiveStep || "null"}
              </div>
            </div>

            <ToolbarExpandable
              steps={deploymentSteps}
              badgeText="CONTROLLED"
              expanded={controlledExpanded}
              onExpandedChange={setControlledExpanded}
              activeStep={controlledActiveStep}
              onActiveStepChange={setControlledActiveStep}
            />
          </section>

          <section className="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Deployment Workflow
              </h2>
              <p className="text-sm text-muted-foreground">
                5-step process with internal state management
              </p>
            </div>

            <ToolbarExpandable steps={deploymentSteps} badgeText="DEPLOYMENT" />
          </section>

          <section className="sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Download Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                2-step process for download preferences
              </p>
            </div>

            <ToolbarExpandable steps={downloadSteps} badgeText="DOWNLOAD" />
          </section>

          <section className="pb-16">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Features
              </h2>
              <p className="text-sm text-muted-foreground">
                Key capabilities and technical highlights
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Smooth Animations
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Framer Motion with spring transitions
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Responsive Design
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Fully responsive with mobile optimization
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Enhanced Scrolling
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Automatic fade masks and touch support
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Performance Optimized
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Memoized components and callbacks
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Controllable State
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Controlled and uncontrolled patterns
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    TypeScript Support
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Fully typed with comprehensive interfaces
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
