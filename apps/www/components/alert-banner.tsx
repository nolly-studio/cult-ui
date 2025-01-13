import { AlertCircle, Shapes } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

import { Separator } from "./ui/separator"

export function AlertBanner() {
  return (
    <Alert
      variant="default"
      className="rounded-none border-x-0 border-t-0 bg-[#EC06FF] px-6"
    >
      <a
        href="https://pro.cult-ui.com"
        target="_blank"
        rel="noreferrer"
        className="font-medium "
      >
        <div className="mx-auto flex max-w-screen-lg items-center space-x-1 justify-center text-white">
          <Shapes className="size-4 fill-black stroke-black" />
          <AlertDescription className="flex items-center gap-1 ml-2">
            <p>
              Introducing <span className="font-black">cult ui pro</span>
            </p>
            {/* <Separator orientation="vertical" className="bg-black w-2" /> */}
            <div className="h-1 w-1 bg-black rounded-full"></div>
            {/* <span className="font-semibold"> cult ui pro </span> */}
            {/* <div className="h-1 w-1 bg-black rounded-full"></div> */}
            full stack blocks, ai agents and more .
          </AlertDescription>
        </div>
      </a>
    </Alert>
  )
}
