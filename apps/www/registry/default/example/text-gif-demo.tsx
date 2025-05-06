"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TextGif } from "../ui/text-gif"

export default function TextGifDemo() {
  const [text, setText] = useState("TextGif")
  const [size, setSize] = useState("xl")
  const [weight, setWeight] = useState("bold")

  const gifUrls = [
    "https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif",
    "https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif",
    "https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif",
    "https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif",
  ]

  const [selectedGif, setSelectedGif] = useState(gifUrls[0])

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
      {/* Preview */}
      <div className="flex items-center justify-center p-12 bg-white dark:bg-black rounded-xl">
        <TextGif
          gifUrl={selectedGif}
          text={text}
          size={size as any}
          weight={weight as any}
        />
      </div>

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <label className="text-sm font-medium">Text</label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">GIF Background</label>
          <Select value={selectedGif} onValueChange={setSelectedGif}>
            <SelectTrigger>
              <SelectValue placeholder="Select GIF" />
            </SelectTrigger>
            <SelectContent>
              {gifUrls.map((gif, index) => (
                <SelectItem key={index} value={gif}>
                  GIF {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Text Size</label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {["sm", "md", "lg", "xl", "xxl"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Font Weight</label>
          <Select value={weight} onValueChange={setWeight}>
            <SelectTrigger>
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              {["normal", "medium", "semi", "bold"].map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
            <TextGif
              gifUrl={gifUrls[1]}
              text="Headings"
              size="xl"
              weight="bold"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
            <TextGif gifUrl={gifUrls[2]} text="$49" size="xxl" weight="bold" />
            <p className="text-sm mt-2">per month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
