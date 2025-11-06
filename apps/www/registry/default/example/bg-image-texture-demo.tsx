"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BackgroundImageTexture } from "@/registry/default/ui/bg-image-texture"
import type { TextureVariant } from "@/registry/default/ui/bg-image-texture"

const textureVariants: TextureVariant[] = [
  "fabric-of-squares",
  "grid-noise",
  "inflicted",
  "debut-light",
  "groovepaper",
  "none",
]

const textureMap: Record<Exclude<TextureVariant, "none">, string> = {
  "fabric-of-squares": "/textures/fabric-of-squares.png",
  "grid-noise": "/textures/grid-noise.png",
  inflicted: "/textures/inflicted.png",
  "debut-light": "/textures/debut-light.png",
  groovepaper: "/textures/groovepaper.png",
}

async function downloadTexture(variant: Exclude<TextureVariant, "none">) {
  const url = textureMap[variant]
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = blobUrl
    link.download = `${variant}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch {
    // Fallback to direct link if fetch fails
    const link = document.createElement("a")
    link.href = url
    link.download = `${variant}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default function BackgroundImageTextureDemo() {
  const [selectedVariant, setSelectedVariant] =
    useState<TextureVariant>("fabric-of-squares")
  const [opacity, setOpacity] = useState([0.5])

  return (
    <div className="space-y-8 p-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Texture Controls</CardTitle>
          <CardDescription>
            Select a texture variant and adjust the opacity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Texture Variant</Label>
            <div className="flex flex-wrap gap-2">
              {textureVariants.map((variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant === "none" ? "None" : variant}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Opacity: {opacity[0].toFixed(2)}</Label>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview with Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Preview with Content</CardTitle>
              <CardDescription>
                See how the texture looks with content on top
              </CardDescription>
            </div>
            {selectedVariant !== "none" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadTexture(selectedVariant)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Texture
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <BackgroundImageTexture
            variant={selectedVariant}
            opacity={opacity[0]}
            className="rounded-lg border border-border p-8 min-h-[400px]"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  Texture Background
                </h3>
                <p className="text-muted-foreground text-lg">
                  This content sits on top of the texture layer. Adjust the
                  opacity slider to see how the texture affects the background.
                  The texture is fully interactive and customizable.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <h4 className="font-semibold mb-2">Feature 1</h4>
                  <p className="text-sm text-muted-foreground">
                    Content with texture background
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <h4 className="font-semibold mb-2">Feature 2</h4>
                  <p className="text-sm text-muted-foreground">
                    More content examples
                  </p>
                </div>
              </div>
            </div>
          </BackgroundImageTexture>
        </CardContent>
      </Card>

      {/* All Variants Showcase */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">All Texture Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {textureVariants
            .filter((v) => v !== "none")
            .map((variant) => (
              <Card key={variant}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">
                      {variant.replace(/-/g, " ")}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadTexture(variant)}
                      className="h-8 w-8 p-0"
                      title={`Download ${variant}.png`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <BackgroundImageTexture
                    variant={variant}
                    opacity={0.5}
                    className="rounded-lg border border-border p-6 h-48 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        {variant}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Opacity: 0.5
                      </p>
                    </div>
                  </BackgroundImageTexture>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Opacity Variations */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Opacity Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0.2, 0.5, 0.8].map((opacityValue) => (
            <Card key={opacityValue}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Opacity: {opacityValue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BackgroundImageTexture
                  variant="grid-noise"
                  opacity={opacityValue}
                  className="rounded-lg border border-border p-6 h-48 flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      grid-noise texture
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Opacity: {opacityValue}
                    </p>
                  </div>
                </BackgroundImageTexture>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Use Case Examples */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Use Case Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card with Texture */}
          <Card>
            <CardHeader>
              <CardTitle>Card with Texture</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <BackgroundImageTexture
                variant="debut-light"
                opacity={0.3}
                className="rounded-b-lg p-6"
              >
                <div className="space-y-2">
                  <h4 className="font-semibold">Beautiful Card</h4>
                  <p className="text-sm text-muted-foreground">
                    Cards look great with subtle texture backgrounds
                  </p>
                </div>
              </BackgroundImageTexture>
            </CardContent>
          </Card>

          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <BackgroundImageTexture
                variant="groovepaper"
                opacity={0.4}
                className="rounded-b-lg p-6 min-h-[200px] flex items-center justify-center"
              >
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bold">Hero Title</h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect for hero sections and banners
                  </p>
                </div>
              </BackgroundImageTexture>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
