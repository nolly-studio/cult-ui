"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

import { FractalDotGrid } from "../ui/bg-animated-fractal-dot-grid"

const initialConfig = {
  dotSize: 5.5,
  dotSpacing: 13,
  dotOpacity: 0.7,
  waveIntensity: 99,
  waveRadius: 200,
  dotColor: "rgba(100, 100, 255, 1)",
  glowColor: "rgba(100, 100, 255, 1)",
  enableNoise: false,
  noiseOpacity: 0.03,
  enableMouseGlow: false,
  initialPerformance: "medium" as const,
}

export function ConfigurableFractalDotGridDemo() {
  const [config, setConfig] = useState(initialConfig)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const copyConfigToClipboard = () => {
    const configString = `
"use client"

import { FractalDotGrid } from "./fractal-dot-grid"

export function FractalDotGridExample() {
  return (
    <div className="h-screen w-screen relative">
      <FractalDotGrid
        dotSize={${config.dotSize}}
        dotSpacing={${config.dotSpacing}}
        dotOpacity={${config.dotOpacity}}
        waveIntensity={${config.waveIntensity}}
        waveRadius={${config.waveRadius}}
        dotColor="${config.dotColor}"
        glowColor="${config.glowColor}"
        enableNoise={${config.enableNoise}}
        noiseOpacity={${config.noiseOpacity}}
        enableMouseGlow={${config.enableMouseGlow}}
        initialPerformance="${config.initialPerformance}"
      />
    </div>
  )
}
`

    navigator.clipboard.writeText(configString).then(() => {
      setIsCopied(true)
      toast({
        title: "Configuration Copied",
        description:
          "The current configuration has been copied to your clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1  gap-8">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyConfigToClipboard}
            className="mb-4"
          >
            {isCopied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {isCopied ? "Copied!" : "Copy Config"}
          </Button>
          <div className="overflow-hidden bg-white rounded-lg">
            <div className="h-[500px] w-full relative">
              <FractalDotGrid {...config} />
            </div>
          </div>
        </div>
        <Card className="overflow-hidden bg-gradient-to-b from-primary/5 to-primary/5">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="dots">
                <AccordionTrigger>Dots</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dotSize">Dot Size</Label>
                      <Slider
                        id="dotSize"
                        min={1}
                        max={10}
                        step={0.5}
                        value={[config.dotSize]}
                        onValueChange={([value]) =>
                          updateConfig("dotSize", value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="dotSpacing">Dot Spacing</Label>
                      <Slider
                        id="dotSpacing"
                        min={10}
                        max={50}
                        step={1}
                        value={[config.dotSpacing]}
                        onValueChange={([value]) =>
                          updateConfig("dotSpacing", value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="dotOpacity">Dot Opacity</Label>
                      <Slider
                        id="dotOpacity"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[config.dotOpacity]}
                        onValueChange={([value]) =>
                          updateConfig("dotOpacity", value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="dotColor">Dot Color</Label>
                      <Input
                        id="dotColor"
                        type="color"
                        value={config.dotColor}
                        onChange={(e) =>
                          updateConfig("dotColor", e.target.value)
                        }
                        className="h-10 px-3 py-2"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="waves">
                <AccordionTrigger>Waves</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="waveIntensity">Wave Intensity</Label>
                      <Slider
                        id="waveIntensity"
                        min={0}
                        max={100}
                        step={1}
                        value={[config.waveIntensity]}
                        onValueChange={([value]) =>
                          updateConfig("waveIntensity", value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="waveRadius">Wave Radius</Label>
                      <Slider
                        id="waveRadius"
                        min={50}
                        max={500}
                        step={10}
                        value={[config.waveRadius]}
                        onValueChange={([value]) =>
                          updateConfig("waveRadius", value)
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="effects">
                <AccordionTrigger>Effects</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="glowColor">Glow Color</Label>
                      <Input
                        id="glowColor"
                        type="color"
                        value={config.glowColor}
                        onChange={(e) =>
                          updateConfig("glowColor", e.target.value)
                        }
                        className="h-10 px-3 py-2"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableNoise"
                        checked={config.enableNoise}
                        onCheckedChange={(checked) =>
                          updateConfig("enableNoise", checked)
                        }
                      />
                      <Label htmlFor="enableNoise">Enable Noise</Label>
                    </div>
                    {config.enableNoise && (
                      <div>
                        <Label htmlFor="noiseOpacity">Noise Opacity</Label>
                        <Slider
                          id="noiseOpacity"
                          min={0}
                          max={0.1}
                          step={0.01}
                          value={[config.noiseOpacity]}
                          onValueChange={([value]) =>
                            updateConfig("noiseOpacity", value)
                          }
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableMouseGlow"
                        checked={config.enableMouseGlow}
                        onCheckedChange={(checked) =>
                          updateConfig("enableMouseGlow", checked)
                        }
                      />
                      <Label htmlFor="enableMouseGlow">Enable Mouse Glow</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="performance">
                <AccordionTrigger>Performance</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Label htmlFor="initialPerformance">
                      Initial Performance
                    </Label>
                    <Select
                      value={config.initialPerformance}
                      onValueChange={(value) =>
                        updateConfig(
                          "initialPerformance",
                          value as "low" | "medium" | "high"
                        )
                      }
                    >
                      <SelectTrigger id="initialPerformance">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConfigurableFractalDotGridDemo
