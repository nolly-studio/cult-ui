"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Image as ImageIcon, Paintbrush, Plus, X } from "lucide-react"

import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelHeader,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "../ui/floating-panel"

function FloatingPanelInput() {
  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note)
  }

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Add Note"
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <span>Add Note</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="note-input">Note</FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

const ColorPickerFloatingPanel = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F1",
    "#33FFF1",
    "#F1FF33",
  ]

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Choose Color"
        className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
      >
        <span>Choose Color</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-64">
        <FloatingPanelBody>
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className="w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  style={{ backgroundColor: color }}
                  onClick={() => console.log(`Selected color: ${color}`)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

const QuickActionsFloatingPanel = () => {
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
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Quick Actions"
        className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
      >
        <span>Quick Actions</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-56">
        <FloatingPanelBody>
          <AnimatePresence>
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 }}
              >
                <FloatingPanelButton
                  onClick={action.action}
                  className="w-full flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </FloatingPanelButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

const ImagePreviewFloatingPanel = () => {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Preview Image"
        className="flex items-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/90 transition-colors"
      >
        <span>Preview Image</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelBody>
          <motion.img
            src="/placeholder.svg?height=200&width=300"
            alt="Preview"
            className="w-full h-auto rounded-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="mt-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Image preview description goes here.
          </motion.p>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
          <FloatingPanelButton
            onClick={() => console.log("Download clicked")}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Download
          </FloatingPanelButton>
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

export default function FloatingPanelExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">FloatingPanel Examples</h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <FloatingPanelInput />
        <ColorPickerFloatingPanel />
        <QuickActionsFloatingPanel />
        <ImagePreviewFloatingPanel />
      </div>
    </div>
  )
}
