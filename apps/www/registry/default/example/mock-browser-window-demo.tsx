"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BrowserWindow } from "@/registry/default/ui/mock-browser-window"

export default function DemoPage() {
  const [config, setConfig] = useState({
    variant: "chrome" as "chrome" | "safari",
    headerStyle: "full" as "minimal" | "full",
    size: "lg" as "sm" | "md" | "lg" | "xl",
    showSidebar: true,
    sidebarPosition: "left" as "left" | "right" | "top" | "bottom",
    url: "https://example.com/dashboard",
  })

  const [sidebarItems] = useState([
    { label: "Overview", active: true },
    { label: "Users", badge: "12" },
    { label: "Analytics", badge: "new" },
    { label: "Settings" },
  ])

  return (
    <div className="min-h-screen ">
      <main className="container ">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-6">Preview</h2>
                <div className="flex justify-center p-8 bg-muted/30 rounded-xl border">
                  <BrowserWindow
                    variant={config.variant}
                    headerStyle={config.headerStyle}
                    size={config.size}
                    showSidebar={config.showSidebar}
                    sidebarPosition={config.sidebarPosition}
                    url={config.url}
                    sidebarItems={config.showSidebar ? sidebarItems : undefined}
                    className="w-full max-w-4xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-lg font-semibold">Window Settings</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm">Browser</Label>
                  <Select
                    value={config.variant}
                    onValueChange={(value: "chrome" | "safari") =>
                      setConfig((prev) => ({ ...prev, variant: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome">Chrome</SelectItem>
                      <SelectItem value="safari">Safari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Header Style</Label>
                  <Select
                    value={config.headerStyle}
                    onValueChange={(value: "minimal" | "full") =>
                      setConfig((prev) => ({ ...prev, headerStyle: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="full">Address Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Size</Label>
                  <Select
                    value={config.size}
                    onValueChange={(value: "sm" | "md" | "lg" | "xl") =>
                      setConfig((prev) => ({ ...prev, size: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <Label className="text-sm">URL</Label>
                  <Input
                    value={config.url}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Sidebar</Label>
                    <Switch
                      checked={config.showSidebar}
                      onCheckedChange={(checked) =>
                        setConfig((prev) => ({
                          ...prev,
                          showSidebar: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                {config.showSidebar && (
                  <div className="space-y-2">
                    <Label className="text-sm">Sidebar Position</Label>
                    <Select
                      value={config.sidebarPosition}
                      onValueChange={(
                        value: "left" | "right" | "top" | "bottom"
                      ) =>
                        setConfig((prev) => ({
                          ...prev,
                          sidebarPosition: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <Label className="text-sm">Quick Presets</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          variant: "chrome",
                          headerStyle: "full",
                          showSidebar: true,
                          size: "lg",
                        }))
                      }
                    >
                      Chrome Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          variant: "safari",
                          headerStyle: "minimal",
                          showSidebar: false,
                          size: "md",
                        }))
                      }
                    >
                      Safari Minimal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
