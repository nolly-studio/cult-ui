"use client"

import React from "react"
import { Image as ImageIcon, Paintbrush, Plus } from "lucide-react"

import {
  PopoverBody,
  PopoverButton,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverHeader,
  PopoverLabel,
  PopoverRoot,
  PopoverSubmitButton,
  PopoverTextarea,
  PopoverTrigger,
} from "../ui/popover"

function PopoverInput() {
  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note)
  }

  return (
    <PopoverRoot>
      <PopoverTrigger>Add Feedback</PopoverTrigger>
      <PopoverContent>
        <PopoverForm onSubmit={handleSubmit}>
          <PopoverLabel>Add Feedback</PopoverLabel>
          <PopoverTextarea />
          <PopoverFooter>
            <PopoverCloseButton />
            <PopoverSubmitButton />
          </PopoverFooter>
        </PopoverForm>
      </PopoverContent>
    </PopoverRoot>
  )
}

const ColorPickerPopover = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F1",
    "#33FFF1",
    "#F1FF33",
  ]

  return (
    <PopoverRoot>
      <PopoverTrigger>Choose Color</PopoverTrigger>
      <PopoverContent className="w-48 h-48">
        <PopoverHeader>Pick a Color</PopoverHeader>
        <PopoverBody className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: color }}
                onClick={() => console.log(`Selected color: ${color}`)}
              />
            ))}
          </div>
        </PopoverBody>
        <PopoverFooter>
          <PopoverCloseButton />
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  )
}

const QuickActionsPopover = () => {
  const actions = [
    {
      icon: <Plus className="w-4 h-4" />,
      label: "New File",
      action: () => console.log("New File"),
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Upload Image",
      action: () => console.log("Upload Image"),
    },
    {
      icon: <Paintbrush className="w-4 h-4" />,
      label: "Edit Colors",
      action: () => console.log("Edit Colors"),
    },
  ]

  return (
    <PopoverRoot>
      <PopoverTrigger>Quick Actions</PopoverTrigger>
      <PopoverContent className="w-48 h-48">
        <PopoverHeader>Quick Actions</PopoverHeader>
        <PopoverBody>
          {actions.map((action, index) => (
            <PopoverButton key={index} onClick={action.action}>
              {action.icon}
              <span>{action.label}</span>
            </PopoverButton>
          ))}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

const ImagePreviewPopover = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger>Preview Image</PopoverTrigger>
      <PopoverContent className="w-96 h-[500px]">
        <PopoverHeader>Image Preview</PopoverHeader>
        <PopoverBody>
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Image preview description goes here.
          </p>
        </PopoverBody>
        <PopoverFooter>
          <PopoverCloseButton />
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default function PopoverExamples() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid md:grid-cols-2 gap-36">
        <div className="flex flex-col gap-24 flex-wrap ">
          <PopoverInput />
          <ColorPickerPopover />
        </div>
        <div className="flex flex-col gap-24 flex-wrap ">
          <QuickActionsPopover />
          <ImagePreviewPopover />
        </div>
      </div>
    </div>
  )
}
