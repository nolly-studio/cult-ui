"use client"

import { ChevronLeft, Trash, X } from "lucide-react"

import { TextureButton } from "@/registry/default/ui/texture-button"

export default function TextureButtonDemo() {
  return (
    <div className="dark:bg-stone-950  py-6 px-4 md:px-0 rounded-md flex justify-center">
      <div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3">
            <div>
              <TextureButton size="sm">Primary</TextureButton>
            </div>
            <div className="">
              <TextureButton>Primary</TextureButton>
            </div>
            <div className="md:w-36 hidden">
              <TextureButton size="lg">Primary</TextureButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3">
            <div>
              <TextureButton variant="accent" size="sm">
                Accent
              </TextureButton>
            </div>
            <div className="">
              <TextureButton variant="accent">Accent</TextureButton>
            </div>
            <div className="md:w-36 hidden">
              <TextureButton variant="accent" size="lg">
                Accent
              </TextureButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div className="">
              <TextureButton variant="secondary" size="sm">
                Secondary
              </TextureButton>
            </div>
            <div className="">
              <TextureButton variant="secondary">Secondary</TextureButton>
            </div>
            <div className="hidden md:w-48">
              <TextureButton variant="secondary" size="lg">
                Secondary
              </TextureButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div className="">
              <TextureButton variant="destructive" size="sm">
                Destructive
              </TextureButton>
            </div>
            <div className="">
              <TextureButton variant="destructive">Destructive</TextureButton>
            </div>
            <div className="hidden md:w-48">
              <TextureButton variant="destructive" size="lg">
                Destructive
              </TextureButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-lg mt-4">
          <div className="flex gap-3 w-full">
            <div className="">
              <TextureButton variant="minimal" size="sm">
                Minimal
              </TextureButton>
            </div>
            <div className="">
              <TextureButton variant="minimal">Minimal</TextureButton>
            </div>
            <div className="hidden md:w-48">
              <TextureButton variant="minimal" size="lg">
                Minimal
              </TextureButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 max-w-xs mt-4">
          <div className="flex gap-3">
            <TextureButton variant="icon" size="icon">
              <ChevronLeft className="h-6 w-6 p-1" />
            </TextureButton>

            <TextureButton variant="icon" size="icon">
              <Trash className="h-5 w-6 p-1" />
            </TextureButton>

            <TextureButton variant="icon" size="icon">
              <X className="h-6 w-6 p-1" />
            </TextureButton>
          </div>
        </div>
      </div>
    </div>
  )
}
