"use client";

import { Check, Copy, Lock, LockOpen, Palette, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { Poline, positionFunctions } from "poline";
import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ColorPicker from "../ui/color-picker";

type ColorScheme = {
  [key: string]: string;
};

export default function ColorPickerDemo() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    "card-foreground": "240 10% 3.9%",
    popover: "0 0% 100%",
    "popover-foreground": "240 10% 3.9%",
    primary: "240 5.9% 10%",
    "primary-foreground": "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    "secondary-foreground": "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    "muted-foreground": "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    "accent-foreground": "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 5.9% 10%",
  });
  const [lockedColor, setLockedColor] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateHarmoniousColors = useCallback(() => {
    let anchorColors: [number, number, number][] = [];

    if (lockedColor) {
      const [h, s, l] = colorScheme[lockedColor].split(" ").map(parseFloat);
      anchorColors.push([h, s / 100, l / 100]);
    }

    while (anchorColors.length < 3) {
      anchorColors.push([Math.random() * 360, 0.7, 0.5]);
    }

    const poline = new Poline({
      numPoints: 20,
      anchorColors,
      positionFunctionX: positionFunctions.sinusoidalPosition,
      positionFunctionY: positionFunctions.quadraticPosition,
      positionFunctionZ: positionFunctions.linearPosition,
    });

    const newColorScheme = { ...colorScheme };
    const colors = poline.colorsCSS;

    Object.keys(newColorScheme).forEach((key, index) => {
      if (key !== lockedColor) {
        const color = colors[index % colors.length];
        const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];

        let adjustedLightness = l;
        if (key.includes("foreground")) {
          adjustedLightness = Math.min(l - 30, 20);
        } else if (key === "background") {
          adjustedLightness = Math.max(l + 30, 90);
        } else if (key === "border" || key === "input") {
          adjustedLightness = Math.min(Math.max(l, 70), 90);
        }

        newColorScheme[key] = `${h.toFixed(1)} ${s.toFixed(
          1
        )}% ${adjustedLightness.toFixed(1)}%`;
      }
    });

    setColorScheme(newColorScheme);
  }, [colorScheme, lockedColor]);

  const resetColors = useCallback(() => {
    setColorScheme({
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "240 5.9% 10%",
      "primary-foreground": "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 5.9% 10%",
    });
    setLockedColor(null);
  }, []);

  const copyColorScheme = useCallback(() => {
    const cssVariables = Object.entries(colorScheme)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n    ");

    const fullCss = `@layer base {
  :root {
    ${cssVariables}
  }
}`;

    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [colorScheme]);

  const getContrastColor = useCallback((color: string) => {
    const [, , lightness] = color.split(" ").map(parseFloat);
    return lightness > 50 ? "0 0% 0%" : "0 0% 100%";
  }, []);

  const toggleLock = useCallback((key: string) => {
    setLockedColor((prev) => (prev === key ? null : key));
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-1">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <Button
                variant="outline"
                onClick={generateHarmoniousColors}
                className="text-sm"
              >
                Generate Harmonious Colors
              </Button>
              <Button
                variant="outline"
                onClick={resetColors}
                className="text-sm"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Colors
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(colorScheme).map(([key, value]) => (
                <div key={key} className="relative">
                  <div className="flex items-center justify-between">
                    <label className="text-muted-foreground mb-2 block text-sm font-medium">
                      {key}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => toggleLock(key)}
                    >
                      {lockedColor === key ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <LockOpen className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <ColorPicker
                      color={`hsl(${value})`}
                      onChange={(newColor) => {
                        const [h, s, l] = newColor
                          .match(/\d+(\.\d+)?/g)
                          ?.map(Number) || [0, 0, 0];
                        setColorScheme({
                          ...colorScheme,
                          [key]: `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(
                            1
                          )}%`,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            className="h-full min-h-[24rem] w-full overflow-hidden rounded-lg p-6 shadow-lg transition-colors duration-300 ease-in-out"
            style={{
              backgroundColor: `hsl(${colorScheme.background})`,
              color: `hsl(${colorScheme.foreground})`,
              borderColor: `hsl(${colorScheme.border})`,
              borderWidth: 2,
              borderStyle: "solid",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-xl font-semibold">Color Preview</h3>
            <p className="mb-4 text-sm">
              Experience your color palette in action. This preview showcases
              your selected colors.
            </p>
            <div className="space-y-2">
              {Object.entries(colorScheme).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
                >
                  <span>{key}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-mono"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `--${key}: ${value};`
                            );
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          style={{
                            backgroundColor: `hsl(${value})`,
                            color: `hsl(${getContrastColor(value)})`,
                            borderColor: `hsl(${colorScheme.border})`,
                          }}
                        >
                          {value}
                          {copied ? (
                            <Check className="ml-2 h-4 w-4" />
                          ) : (
                            <Copy className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </motion.div>
          <Button onClick={copyColorScheme} className="w-full">
            Copy Full Color Scheme
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
