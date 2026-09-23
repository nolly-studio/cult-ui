"use client";

import { useAtom } from "jotai";
import { Circle, CircleOff, Sliders, Square, Triangle } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useId } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import ColorPicker from "../ui/color-picker";
import ShaderLensBlur, { configAtom } from "../ui/shader-lens-blur";

function ShaderLensBlurDemo() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <ShaderLensBlur />
      <ShaderBlurConfig />
    </div>
  );
}

function ShaderBlurConfig() {
  const [config, setConfig] = useAtom(configAtom);
  const id = useId();
  const variationId = `${id}-variation`;
  const enableHoverId = `${id}-enable-hover`;
  const invertMouseId = `${id}-invert-mouse`;
  const widthId = `${id}-width`;
  const heightId = `${id}-height`;

  const handleVariationChange = useCallback(
    (value: string) => {
      setConfig((prev) => ({ ...prev, variation: parseInt(value) }));
    },
    [setConfig]
  );

  const handleColorChange = useCallback(
    (key: "color1" | "color2" | "color3" | "color4", value: string) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [setConfig]
  );

  const handleDimensionChange = useCallback(
    (key: "width" | "height", value: number) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [setConfig]
  );

  const variationIcons = [
    { icon: Square, label: "Square" },
    { icon: Circle, label: "Solid Circle" },
    { icon: CircleOff, label: "Hollow Circle" },
    { icon: Triangle, label: "Triangle" },
  ];

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="border-border border-b">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Sliders className="mr-2 h-5 w-5" />
          Shader Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label
                htmlFor={variationId}
                className="text-muted-foreground text-sm font-medium"
              >
                Variation
              </Label>
              <Select
                value={config.variation.toString()}
                onValueChange={handleVariationChange}
              >
                <SelectTrigger
                  id={variationId}
                  className="border-border bg-background w-full"
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
                        <variation.icon className="h-5 w-5" />
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
                        className="text-muted-foreground block text-sm font-medium"
                      >
                        {color}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-border focus-visible:ring-ring focus-visible:ring-offset-background h-10 w-full rounded-md border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                            style={{ backgroundColor: config[color] }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="border-border w-64 p-3">
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
                    className="text-muted-foreground text-sm font-medium"
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
                    className="text-muted-foreground text-sm font-medium"
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
                      className="text-muted-foreground text-sm font-medium"
                    >
                      Width
                    </Label>
                    <span className="text-muted-foreground text-sm">
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
                      className="text-muted-foreground text-sm font-medium"
                    >
                      Height
                    </Label>
                    <span className="text-muted-foreground text-sm">
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
  );
}
export default ShaderLensBlurDemo;
