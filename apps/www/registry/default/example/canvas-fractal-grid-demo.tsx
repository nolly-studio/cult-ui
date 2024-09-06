"use client"

import React, { useState } from "react"
import { Check, Copy, Minus, Plus, Trash2 } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

import { CanvasFractalGrid } from "../ui/canvas-fractal-grid"

type GradientStop = {
  color: string
  position: number
}

type Gradient = {
  stops: GradientStop[]
  centerX: number
  centerY: number
}

const initialConfig = {
  dotSize: 5,
  dotSpacing: 25,
  dotOpacity: 0.8,
  gradientAnimationDuration: 5,
  waveIntensity: 40,
  waveRadius: 250,
  dotColor: "rgba(100, 200, 255, 0.2)",
  glowColor: "rgba(100, 200, 255, 1)",
  enableNoise: true,
  noiseOpacity: 0.05,
  enableMouseGlow: false,
  initialPerformance: "high" as const,
  gradients: [
    {
      stops: [
        { color: "#3498DB", position: 0 },
        { color: "#2980B9", position: 25 },
        { color: "#1ABC9C", position: 50 },
        { color: "transparent", position: 75 },
      ],
      centerX: 30,
      centerY: 70,
    },
    {
      stops: [
        { color: "#16A085", position: 0 },
        { color: "#2980B9", position: 25 },
        { color: "#3498DB", position: 50 },
        { color: "transparent", position: 75 },
      ],
      centerX: 70,
      centerY: 30,
    },
  ],
}

export function ConfigurableCanvasFractalGrid() {
  const [config, setConfig] = useState(initialConfig)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const updateGradient = (index: number, updatedGradient: Gradient) => {
    const newGradients = [...config.gradients]
    newGradients[index] = updatedGradient
    updateConfig("gradients", newGradients)
  }

  const addGradient = () => {
    const newGradient: Gradient = {
      stops: [
        { color: "#000000", position: 0 },
        { color: "#FFFFFF", position: 100 },
      ],
      centerX: 50,
      centerY: 50,
    }
    updateConfig("gradients", [...config.gradients, newGradient])
  }

  const removeGradient = (index: number) => {
    const newGradients = config.gradients.filter((_, i) => i !== index)
    updateConfig("gradients", newGradients)
  }

  const copyConfigToClipboard = () => {
    const configString = `
"use client"

import { CanvasFractalGrid } from "../ui/canvas-fractal-grid"

export function CanvasFractalGridExample() {
  return (
    <div className="h-screen w-screen relative grid">
      <CanvasFractalGrid
        dotSize={${config.dotSize}}
        dotSpacing={${config.dotSpacing}}
        dotOpacity={${config.dotOpacity}}
        gradientAnimationDuration={${config.gradientAnimationDuration}}
        waveIntensity={${config.waveIntensity}}
        waveRadius={${config.waveRadius}}
        dotColor="${config.dotColor}"
        glowColor="${config.glowColor}"
        enableNoise={${config.enableNoise}}
        noiseOpacity={${config.noiseOpacity}}
        enableMouseGlow={${config.enableMouseGlow}}
        initialPerformance="${config.initialPerformance}"
        gradients={${JSON.stringify(config.gradients, null, 2)}}
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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Configurable CanvasFractalGrid
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <Button
          variant="outline"
          size="sm"
          onClick={copyConfigToClipboard}
          className="ml-2"
        >
          {isCopied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {isCopied ? "Copied!" : "Copy Config"}
        </Button>
        <div className="overflow-hidden bg-white  rounded-lg">
          <div className="h-[500px] w-full relative ">
            <CanvasFractalGrid {...config} />
          </div>
        </div>
        <Card className="overflow-hidden bg-gradient-to-b from-primary/5 to-primary/5">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="gradients">Gradients</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
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
                            max={20}
                            step={1}
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
                          <Label htmlFor="gradientAnimationDuration">
                            Gradient Animation Duration
                          </Label>
                          <Slider
                            id="gradientAnimationDuration"
                            min={5}
                            max={30}
                            step={1}
                            value={[config.gradientAnimationDuration]}
                            onValueChange={([value]) =>
                              updateConfig("gradientAnimationDuration", value)
                            }
                          />
                        </div>
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
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="enableMouseGlow"
                            checked={config.enableMouseGlow}
                            onCheckedChange={(checked) =>
                              updateConfig("enableMouseGlow", checked)
                            }
                          />
                          <Label htmlFor="enableMouseGlow">
                            Enable Mouse Glow
                          </Label>
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
              </TabsContent>
              <TabsContent value="gradients">
                <div className="space-y-4">
                  {config.gradients.map((gradient, index) => (
                    <Card
                      key={index}
                      className="bg-gradient-to-b from-primary/5 to-primary/10"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Gradient {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`centerX-${index}`}>
                                Center X
                              </Label>
                              <Slider
                                id={`centerX-${index}`}
                                min={0}
                                max={100}
                                step={1}
                                value={[gradient.centerX]}
                                onValueChange={([value]) =>
                                  updateGradient(index, {
                                    ...gradient,
                                    centerX: value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`centerY-${index}`}>
                                Center Y
                              </Label>
                              <Slider
                                id={`centerY-${index}`}
                                min={0}
                                max={100}
                                step={1}
                                value={[gradient.centerY]}
                                onValueChange={([value]) =>
                                  updateGradient(index, {
                                    ...gradient,
                                    centerY: value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          {gradient.stops.map((stop, stopIndex) => (
                            <div
                              key={stopIndex}
                              className="flex items-center space-x-2"
                            >
                              <Input
                                type="color"
                                value={stop.color}
                                onChange={(e) => {
                                  const newStops = [...gradient.stops]
                                  newStops[stopIndex] = {
                                    ...stop,
                                    color: e.target.value,
                                  }
                                  updateGradient(index, {
                                    ...gradient,
                                    stops: newStops,
                                  })
                                }}
                                className="w-16 h-10"
                              />
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={[stop.position]}
                                onValueChange={([value]) => {
                                  const newStops = [...gradient.stops]
                                  newStops[stopIndex] = {
                                    ...stop,
                                    position: value,
                                  }
                                  updateGradient(index, {
                                    ...gradient,
                                    stops: newStops,
                                  })
                                }}
                                className="flex-grow"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const newStops = gradient.stops.filter(
                                    (_, i) => i !== stopIndex
                                  )
                                  updateGradient(index, {
                                    ...gradient,
                                    stops: newStops,
                                  })
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={() => {
                                const newStops = [
                                  ...gradient.stops,
                                  { color: "#000000", position: 100 },
                                ]
                                updateGradient(index, {
                                  ...gradient,
                                  stops: newStops,
                                })
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Stop
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => removeGradient(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Gradient
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addGradient} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Gradient
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConfigurableCanvasFractalGrid
