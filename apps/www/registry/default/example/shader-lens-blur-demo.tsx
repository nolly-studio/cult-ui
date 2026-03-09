"use client"

import { useCallback, useId } from "react"
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
  const id = useId()
  const variationId = `${id}-variation`
  const enableHoverId = `${id}-enable-hover`
  const invertMouseId = `${id}-invert-mouse`
  const widthId = `${id}-width`
  const heightId = `${id}-height`

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
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Sliders className="w-5 h-5 mr-2" />
          Shader Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label
                htmlFor={variationId}
                className="text-sm font-medium text-muted-foreground"
              >
                Variation
              </Label>
              <Select
                value={config.variation.toString()}
                onValueChange={handleVariationChange}
              >
                <SelectTrigger
                  id={variationId}
                  className="w-full border-border bg-background"
                >
                  <SelectValue placeholder="Select variation" />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover text-popover-foreground">
                  {variationIcons.map((variation, index) => (
                    <SelectItem
                      key={variation.label}
                      value={index.toString()}
                      className="cursor-pointer"
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

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                {(["color1", "color2", "color3", "color4"] as const).map(
                  (color) => (
                    <div key={color} className="space-y-2">
                      <Label
                        htmlFor={color}
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        {color}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-10 w-full rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            style={{ backgroundColor: config[color] }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-64 border-border p-3">
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
              <h3 className="text-sm font-medium">Options</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={enableHoverId}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Enable Hover
                  </Label>
                  <Switch
                    id={enableHoverId}
                    checked={config.enableHover}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({ ...prev, enableHover: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={invertMouseId}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Invert Mouse
                  </Label>
                  <Switch
                    id={invertMouseId}
                    checked={config.invertMouse}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({ ...prev, invertMouse: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Dimensions</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={widthId}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Width
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {config.width}px
                    </span>
                  </div>
                  <Slider
                    id={widthId}
                    min={100}
                    max={1000}
                    step={10}
                    value={[parseInt(config.width.toString())]}
                    onValueChange={([value]) =>
                      handleDimensionChange("width", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={heightId}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Height
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {config.height}px
                    </span>
                  </div>
                  <Slider
                    id={heightId}
                    min={100}
                    max={1000}
                    step={10}
                    value={[parseInt(config.height.toString())]}
                    onValueChange={([value]) =>
                      handleDimensionChange("height", value)
                    }
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
