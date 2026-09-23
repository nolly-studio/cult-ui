"use client";

import { Image as ImageIcon, Paintbrush, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

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
} from "../ui/floating-panel";

function FloatingPanelInput() {
  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note);
  };

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Add Note"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
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
  );
}

const ColorPickerFloatingPanel = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F1",
    "#33FFF1",
    "#F1FF33",
  ];

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Choose Color"
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
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
                  className="focus:ring-primary h-12 w-12 rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
  );
};

const QuickActionsFloatingPanel = () => {
  const actions = [
    {
      icon: <Plus className="h-4 w-4" />,
      label: "New File",
      action: () => console.log("New File"),
    },
    {
      icon: <ImageIcon className="h-4 w-4" />,
      label: "Upload Image",
      action: () => console.log("Upload Image"),
    },
    {
      icon: <Paintbrush className="h-4 w-4" />,
      label: "Edit Colors",
      action: () => console.log("Edit Colors"),
    },
  ];

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Quick Actions"
        className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
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
                  className="hover:bg-muted flex w-full items-center space-x-2 rounded-md px-2 py-1 transition-colors"
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
  );
};

const ImagePreviewFloatingPanel = () => {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Preview Image"
        className="bg-muted text-muted-foreground hover:bg-muted/90 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors"
      >
        <span>Preview Image</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelBody>
          <motion.img
            src="/placeholder.svg?height=200&width=300"
            alt="Preview"
            className="h-auto w-full rounded-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="text-muted-foreground mt-2 text-sm"
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1 transition-colors"
          >
            Download
          </FloatingPanelButton>
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
};

export default function FloatingPanelExamples() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="mb-4 text-3xl font-bold">FloatingPanel Examples</h1>
      <div className="flex flex-col flex-wrap gap-4 md:flex-row">
        <FloatingPanelInput />
        <ColorPickerFloatingPanel />
        <QuickActionsFloatingPanel />
        <ImagePreviewFloatingPanel />
      </div>
    </div>
  );
}
