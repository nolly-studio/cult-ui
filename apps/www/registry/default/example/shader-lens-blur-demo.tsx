"use client"

import React, { useCallback } from "react"
import { useAtom } from "jotai"
import { Circle, CircleOff, Sliders, Square, Triangle } from "lucide-react"
import { motion } from "motion/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

import ColorPicker from "../ui/color-picker"
import ShaderLensBlur, { configAtom } from "../ui/shader-lens-blur"

function ShaderLensBlurDemo() {
  return (
    <div className="grid grid-cols-1  gap-8   ">
      <ShaderLensBlur />
      <ShaderBlurConfig />
    </div>
  )
}

function ShaderBlurConfig() {
  const [config, setConfig] = useAtom(configAtom)

  const handleVariationChange = useCallback(
    (value: string) => {
      setConfig((prev) => ({ ...prev, variation: parseInt(value) }))
    },
    [setConfig]
  )

  const handleColorChange = useCallback(
    (key: "color1" | "color2" | "color3" | "color4", value: string) => {
      setConfig((prev) => ({ ...prev, [key]: value }))
    },
    [setConfig]
  )

  const handleDimensionChange = useCallback(
    (key: "width" | "height", value: number) => {
      setConfig((prev) => ({ ...prev, [key]: value }))
    },
    [setConfig]
  )

  const variationIcons = [
    { icon: Square, label: "Square" },
    { icon: Circle, label: "Solid Circle" },
    { icon: CircleOff, label: "Hollow Circle" },
    { icon: Triangle, label: "Triangle" },
  ]

  return (
    <Card className="bg-black text-white border-neutral-800 to-bg-primary/100 bg-gradient-to-b from-primary/90 dark:from-card/100 dark:to-card/90">
      <CardHeader className="border-b border-neutral-800">
        <CardTitle className="text-xl font-bold flex items-center">
          <Sliders className="w-5 h-5 mr-2" />
          Shader Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label
                htmlFor="variation"
                className="text-sm font-medium text-neutral-400"
              >
                Variation
              </Label>
              <Select
                value={config.variation.toString()}
                onValueChange={handleVariationChange}
              >
                <SelectTrigger
                  id="variation"
                  className="w-full bg-neutral-900 border-neutral-700 text-white"
                >
                  <SelectValue placeholder="Select variation" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-700 text-white">
                  {variationIcons.map((variation, index) => (
                    <SelectItem
                      key={index}
                      value={index.toString()}
                      className="hover:bg-neutral-800"
                    >
                      <div className="flex items-center space-x-2">
                        <variation.icon className="w-5 h-5" />
                        <span>- {variation.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-neutral-800" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-300">Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                {(["color1", "color2", "color3", "color4"] as const).map(
                  (color) => (
                    <div key={color} className="space-y-2">
                      <Label
                        htmlFor={color}
                        className="text-sm font-medium text-neutral-400 block"
                      >
                        {color}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-10 rounded-md border-2 border-neutral-700 focus:border-blue-500 focus:outline-none"
                            style={{ backgroundColor: config[color] }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3 border-neutral-700">
                          <ColorPicker
                            color={config[color]}
                            onChange={(value) =>
                              handleColorChange(color, value)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-300">
                Options
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="enableHover"
                    className="text-sm font-medium text-neutral-400"
                  >
                    Enable Hover
                  </Label>
                  <Switch
                    id="enableHover"
                    checked={config.enableHover}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({ ...prev, enableHover: checked }))
                    }
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="invertMouse"
                    className="text-sm font-medium text-neutral-400"
                  >
                    Invert Mouse
                  </Label>
                  <Switch
                    id="invertMouse"
                    checked={config.invertMouse}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({ ...prev, invertMouse: checked }))
                    }
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-neutral-800" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-300">
                Dimensions
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="width"
                      className="text-sm font-medium text-neutral-400"
                    >
                      Width
                    </Label>
                    <span className="text-sm text-neutral-400">
                      {config.width}px
                    </span>
                  </div>
                  <Slider
                    id="width"
                    min={100}
                    max={1000}
                    step={10}
                    value={[parseInt(config.width.toString())]}
                    onValueChange={([value]) =>
                      handleDimensionChange("width", value)
                    }
                    className="[&_[role=slider]]:bg-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="height"
                      className="text-sm font-medium text-neutral-400"
                    >
                      Height
                    </Label>
                    <span className="text-sm text-neutral-400">
                      {config.height}px
                    </span>
                  </div>
                  <Slider
                    id="height"
                    min={100}
                    max={1000}
                    step={10}
                    value={[parseInt(config.height.toString())]}
                    onValueChange={([value]) =>
                      handleDimensionChange("height", value)
                    }
                    className="[&_[role=slider]]:bg-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ShaderLensBlurDemo
