"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, ResetIcon } from "@radix-ui/react-icons"
import { DatabaseIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { IntroDisclosure } from "../ui/intro-disclosure"

const steps = [
  {
    title: "Welcome to Cult UI",
    short_description: "Discover our modern component library",
    full_description:
      "Welcome to Cult UI! Let's explore how our beautifully crafted components can help you build stunning user interfaces with ease.",
    media: {
      type: "image" as const,
      src: "/feature-3.png",
      alt: "Cult UI components overview",
    },
  },
  {
    title: "Customizable Components",
    short_description: "Style and adapt to your needs",
    full_description:
      "Every component is built with customization in mind. Use our powerful theming system with Tailwind CSS to match your brand perfectly.",
    media: {
      type: "image" as const,
      src: "/feature-2.png",
      alt: "Component customization interface",
    },
    action: {
      label: "View Theme Builder",
      href: "/docs/theming",
    },
  },
  {
    title: "Responsive & Accessible",
    short_description: "Built for everyone",
    full_description:
      "All components are fully responsive and follow WAI-ARIA guidelines, ensuring your application works seamlessly across all devices and is accessible to everyone.",
    media: {
      type: "image" as const,

      src: "/feature-1.png",
      alt: "Responsive design demonstration",
    },
  },
  {
    title: "Start Building",
    short_description: "Create your next project",
    full_description:
      "You're ready to start building! Check out our comprehensive documentation and component examples to create your next amazing project.",
    action: {
      label: "View Components",
      href: "/docs/components",
    },
  },
]

type StorageState = {
  desktop: string | null
  mobile: string | null
}

export default function IntroDisclosureDemo() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [openMobile, setOpenMobile] = useState(true)
  const [debugOpen, setDebugOpen] = useState(false)
  const [storageState, setStorageState] = useState<StorageState>({
    desktop: null,
    mobile: null,
  })

  const updateStorageState = () => {
    setStorageState({
      desktop: localStorage.getItem("feature_intro-demo"),
      mobile: localStorage.getItem("feature_intro-demo-mobile"),
    })
  }

  // Update storage state whenever localStorage changes
  useEffect(() => {
    updateStorageState()
    window.addEventListener("storage", updateStorageState)
    return () => window.removeEventListener("storage", updateStorageState)
  }, [])

  // Update storage state after reset
  const handleReset = () => {
    // localStorage.removeItem("feature_intro-demo")
    setOpen(true)
    if (storageState.desktop === "false") {
      toast.info("Clear the local storage to trigger the feature again")
      setDebugOpen(true)
    }
    if (storageState.desktop === null) {
      updateStorageState()
    }
  }

  const handleResetMobile = () => {
    // localStorage.removeItem("feature_intro-demo-mobile")
    setOpenMobile(true)
    updateStorageState()
  }

  const handleClearDesktop = () => {
    localStorage.removeItem("feature_intro-demo")
    updateStorageState()
    router.refresh()
    toast.success("Desktop storage cleared")
  }

  const handleClearMobile = () => {
    localStorage.removeItem("feature_intro-demo-mobile")
    updateStorageState()
    router.refresh()
    toast.success("Mobile storage cleared")
  }

  const handleDebugOpenChange = (open: boolean) => {
    if (open) {
      updateStorageState()
    }
    setDebugOpen(open)
  }

  return (
    <div className="w-full space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">
            IntroDisclosure Demo
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience our feature introduction component in both desktop and
            mobile variants. Click the reset buttons to restart the demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-0">
          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors",
                !open && "border-muted bg-muted/50",
                open && "border-primary"
              )}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex   flex-col">
                  <p className="text-sm text-muted-foreground text-left">
                    (Disclosure)
                  </p>
                  <h3 className="text-xl font-semibold">Desktop View</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ResetIcon className="mr-2 h-4 w-4" />
                  Start Demo
                </button>
              </div>
              <IntroDisclosure
                open={open}
                setOpen={setOpen}
                steps={steps}
                featureId="intro-demo"
                showProgressBar={false}
                onComplete={() => toast.success("Tour completed")}
                onSkip={() => toast.info("Tour skipped")}
              />
              <div className="text-sm text-muted-foreground">
                Status: {open ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors",
                !openMobile && "border-muted bg-muted/50",
                openMobile && "border-primary"
              )}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex  flex-col">
                  <p className="text-sm text-muted-foreground">
                    (Drawer + Swipe)
                  </p>
                  <h3 className="text-xl font-semibold">Mobile View</h3>
                </div>
                <button
                  onClick={handleResetMobile}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ResetIcon className="mr-2 h-4 w-4" />
                  Start Demo
                </button>
              </div>
              <IntroDisclosure
                open={openMobile}
                setOpen={setOpenMobile}
                steps={steps}
                featureId="intro-demo-mobile"
                onComplete={() => toast.success("Mobile tour completed")}
                onSkip={() => toast.info("Mobile tour skipped")}
                forceVariant="mobile"
              />
              <div className="text-sm text-muted-foreground">
                Status: {openMobile ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <Collapsible
            open={debugOpen}
            onOpenChange={handleDebugOpenChange}
            className="w-full"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-2  text-sm hover:bg-muted/50">
              <div className="flex flex-col items-start text-left">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <DatabaseIcon className="size-4" />{" "}
                  <span className="text-muted-foreground">
                    Browser Local Storage State
                  </span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl">
                  These values represent the "Don't show again" checkbox state.
                  <br />- When set to{" "}
                  <code className="bg-background px-1">true</code>, the intro
                  will be hidden. <br /> - When{" "}
                  <code className="bg-background px-1">null</code>, the intro
                  will be shown.
                </p>
              </div>
              <ChevronDownIcon
                className={cn(
                  "size-8 transition-transform duration-200",
                  debugOpen && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md bg-muted p-4 text-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-muted-foreground">
                        Desktop State:{" "}
                      </span>
                      <code className="rounded bg-background px-2 py-1">
                        {storageState.desktop === null
                          ? "null"
                          : storageState.desktop}
                      </code>
                    </div>
                    <Button size="sm" onClick={handleClearDesktop}>
                      Reset Local Storage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-muted-foreground">
                        Mobile State:{" "}
                      </span>
                      <code className="rounded bg-background px-2 py-1">
                        {storageState.mobile === null
                          ? "null"
                          : storageState.mobile}
                      </code>
                    </div>
                    <Button size="sm" onClick={handleClearMobile}>
                      Reset Local Storage
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
