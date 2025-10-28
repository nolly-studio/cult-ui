"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"
import useClickOutside from "@/hooks/use-click-outside"

import { TwoToneText } from "./two-tone-text"
import { Badge } from "./ui/badge"

const transition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.25,
}

interface CliRegistryConfigProps {
  docsChildren: React.ReactNode
  installComponentsChildren: React.ReactNode
}

const CliRegistryConfig = React.memo<CliRegistryConfigProps>(
  function CliRegistryConfig({ docsChildren, installComponentsChildren }) {
    const [active, setActive] = useState<string | null>(null)
    const [contentRef, { height: heightContent }] = useMeasure()
    const [menuRef, { width: widthContainer }] = useMeasure()
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [maxWidth, setMaxWidth] = useState(0)

    const [activeHelpSection, setActiveHelpSection] = useState<string | null>(
      null
    )

    // Memoize the click outside handler
    const handleClickOutside = useCallback(() => {
      setIsOpen(false)
      setActive(null)
    }, [])

    useClickOutside(ref, handleClickOutside)

    useEffect(() => {
      if (!widthContainer || maxWidth > 0) return
      setMaxWidth(widthContainer)
    }, [widthContainer, maxWidth])

    // Memoize the navigation click handler
    const handleNavClick = useCallback(
      (item: string) => {
        if (active === item && isOpen) {
          setIsOpen(false)
          setActive(null)
          return
        }
        setActive(item)
        setIsOpen(true)
      },
      [active, isOpen]
    )

    // Memoize the help section toggle handler
    const handleHelpSectionToggle = useCallback(
      (section: string) => {
        setActiveHelpSection(activeHelpSection === section ? null : section)
      },
      [activeHelpSection]
    )

    // Memoize the content rendering function
    const renderContent = useCallback(() => {
      switch (active) {
        case "registry":
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  Registry Configuration
                </h3>
                <p className="text-sm text-gray-600">
                  Configure your project to use the Cult UI registry with shadcn
                  CLI v3.
                </p>
              </div>

              {docsChildren}
            </div>
          )

        case "install-components":
          return (
            <div className="space-y-4">
              <div className="space-y-4">{installComponentsChildren}</div>
            </div>
          )

        case "help":
          return (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-900">
                    Help & Documentation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Namespaced registries let you install components, libraries,
                    and other resources from multiple sources in one project.
                    Think of it like having different app stores - you can get
                    UI components from shadcn, AI prompts from v0, and custom
                    tools from your company&apos;s private registry, all using
                    the same command.
                  </p>
                </div>

                {/* Quick Start Guide - Always Visible */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Quick Start
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="mt-0.5 text-gray-400">1.</span>
                      <span>
                        Configure registries in your{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                          components.json
                        </code>
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="mt-0.5 text-gray-400">2.</span>
                      <span>
                        Install resources using{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                          npx shadcn@beta add @namespace/resource
                        </code>
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="mt-0.5 text-gray-400">3.</span>
                      <span>
                        View resources before installing with{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                          npx shadcn@beta view @namespace/resource
                        </code>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collapsible: Basic Usage */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleHelpSectionToggle("basic")}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      Basic Usage
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {activeHelpSection === "basic" ? "−" : "+"}
                    </span>
                  </button>
                  {activeHelpSection === "basic" && (
                    <div className="space-y-2 pl-4">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <code className="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">
                            npx shadcn@beta add @cult-ui/button
                          </code>
                          <p className="text-sm text-zinc-600">
                            Install button from Cult UI registry
                          </p>
                        </div>
                        <div className="space-y-1">
                          <code className="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">
                            npx shadcn@beta add @cult-ui/button @cult-ui/card
                          </code>
                          <p className="text-sm text-zinc-600">
                            Install multiple resources at once
                          </p>
                        </div>
                        <div className="space-y-1">
                          <code className="block rounded bg-zinc-50 px-2 py-1 text-sm text-zinc-800">
                            npx shadcn@beta search @cult-ui --query
                            &quot;button&quot;
                          </code>
                          <p className="text-sm text-zinc-600">
                            Search for button-related resources
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible: Configuration */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleHelpSectionToggle("config")}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      Configuration
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {activeHelpSection === "config" ? "−" : "+"}
                    </span>
                  </button>
                  {activeHelpSection === "config" && (
                    <div className="space-y-2 pl-4">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium text-zinc-800">
                            Simple Registry
                          </h5>
                          <pre className="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">
                            {`{
  "@cult-ui": "https://cult-ui.com/r/{name}.json",
  "@v0": "https://v0.dev/chat/b/{name}"
}`}
                          </pre>
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium text-zinc-800">
                            With Multiple Registries
                          </h5>
                          <pre className="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">
                            {`{
  "@cult-ui": "https://cult-ui.com/r/{name}.json",
  "@v0": "https://v0.dev/chat/b/{name}",
  "@acme": "https://registry.acme.com/{name}.json"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible: Advanced Configuration */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleHelpSectionToggle("advanced")}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      Advanced Setup
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {activeHelpSection === "advanced" ? "−" : "+"}
                    </span>
                  </button>
                  {activeHelpSection === "advanced" && (
                    <div className="space-y-2 pl-4">
                      <div className="space-y-1">
                        <h5 className="text-sm font-medium text-zinc-800">
                          Complete components.json
                        </h5>
                        <pre className="overflow-x-auto rounded bg-zinc-50 p-2 text-xs text-zinc-600">
                          {`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide",

  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible: Troubleshooting */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleHelpSectionToggle("troubleshoot")}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      Troubleshooting
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {activeHelpSection === "troubleshoot" ? "−" : "+"}
                    </span>
                  </button>
                  {activeHelpSection === "troubleshoot" && (
                    <div className="space-y-2 pl-4 text-sm text-zinc-600">
                      <div className="flex items-start space-x-2">
                        <span className="mt-0.5 text-zinc-400">•</span>
                        <span>
                          <strong>Registry not found:</strong> Check your{" "}
                          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">
                            components.json
                          </code>{" "}
                          configuration
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="mt-0.5 text-zinc-400">•</span>
                        <span>
                          <strong>Resource not found:</strong> Check resource
                          name and registry URL pattern
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="mt-0.5 text-zinc-400">•</span>
                        <span>
                          <strong>Installation fails:</strong> Ensure
                          you&apos;re using{" "}
                          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">
                            shadcn@beta
                          </code>{" "}
                          for v3 features
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible: Resources */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleHelpSectionToggle("resources")}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-900"
                  >
                    <h4 className="text-sm font-medium text-zinc-600">
                      Resources & Docs
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {activeHelpSection === "resources" ? "−" : "+"}
                    </span>
                  </button>
                  {activeHelpSection === "resources" && (
                    <div className="space-y-2 pl-4">
                      <a
                        href="https://ui.shadcn.com/docs/registry/namespaced-registries"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                      >
                        → Full Documentation
                      </a>
                      <a
                        href="https://ui.shadcn.com/docs/registry/registry-item-json"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                      >
                        → Registry Item Schema
                      </a>
                      <a
                        href="https://github.com/shadcn/ui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 transition-colors hover:text-blue-800"
                      >
                        → GitHub Repository
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    }, [
      active,
      docsChildren,
      installComponentsChildren,
      activeHelpSection,
      handleHelpSectionToggle,
    ])

    // Memoize the active title display
    const activeTitle = useMemo(() => {
      if (!active) return ""
      return active.charAt(0).toUpperCase() + active.slice(1).replace("-", " ")
    }, [active])

    // Memoize the navigation buttons to prevent unnecessary re-renders
    const navigationButtons = useMemo(
      () => [
        {
          id: "registry",
          label: "Configure",
          step: "1",
          onClick: () => handleNavClick("registry"),
          isActive: active === "registry",
          isFirst: true,
        },
        {
          id: "install-components",
          label: "Install",
          step: "2",
          onClick: () => handleNavClick("install-components"),
          isActive: active === "install-components",
          isFirst: false,
        },
        {
          id: "help",
          label: "Help",
          step: "3",
          onClick: () => handleNavClick("help"),
          isActive: active === "help",
          isLast: true,
        },
      ],
      [active, handleNavClick]
    )

    return (
      <div className="mx-auto hidden w-full max-w-lg space-y-2 md:block">
        <Badge variant="outline" className="bg-gray-100">
          OPTION 1
        </Badge>
        <div className="mb-2 flex items-center gap-2">
          <TwoToneText
            primaryText="Install with shadcn cli"
            secondaryText="Quickly add components to existing project"
            size="sm"
            className="text-gray-900"
          />
        </div>
        <MotionConfig transition={transition}>
          <div
            className="mx-auto w-full max-w-lg rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_16px_-4px_rgba(0,0,0,0.04)]"
            ref={ref}
          >
            <div className="rounded-2xl">
              <div className="overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="expanded-content"
                      initial={{ height: 0 }}
                      animate={{ height: heightContent || 0 }}
                      exit={{ height: 0 }}
                      className=""
                    >
                      <div ref={contentRef} className=" px-2 pb-1 pt-2">
                        <h4 className="px-2 text-sm font-medium text-gray-900">
                          {activeTitle}
                        </h4>

                        <div className="shadow-elevation-light mt-3 rounded-[0.8rem] bg-[#F7F7F8] px-3 py-4">
                          {renderContent()}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Navigation bar */}
              <div
                className="flex w-full items-center justify-center p-px"
                ref={menuRef}
              >
                <div className="flex w-full items-center">
                  {navigationButtons.map((button) => (
                    <button
                      key={button.id}
                      onClick={button.onClick}
                      className={cn(
                        "flex-1 px-2 py-4 text-sm text-gray-600 transition-colors hover:text-gray-900 ",
                        button.isActive ? "font-medium text-gray-900" : "",
                        active === null ? "hover:bg-muted/50" : "",
                        button.isFirst && !isOpen ? "hover:rounded-l-2xl" : "",
                        button.isLast && !isOpen ? "hover:rounded-r-2xl" : ""
                      )}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="shadow-inner-shadow flex  w-5 items-center justify-center rounded-md text-[10px]  font-bold  transition-all duration-300">
                          <span
                            className={cn(
                              "w-full rounded-md bg-muted",
                              button.isActive
                                ? "bg-blue-300/20 text-blue-700 "
                                : "bg-muted/50 text-gray-500"
                            )}
                          >
                            {button.step}
                          </span>
                        </div>{" "}
                        <span className="text-sm font-medium text-gray-900">
                          {button.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    )
  }
)

CliRegistryConfig.displayName = "CliRegistryConfig"

export default CliRegistryConfig
