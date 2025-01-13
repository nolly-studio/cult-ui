import { Shapes } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

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
        <div className="mx-auto flex max-w-screen-lg items-center justify-center space-x-1 text-white">
          <Shapes className="size-4 fill-black stroke-black" />
          <AlertDescription className="ml-2 flex items-center gap-1">
            <p>
              Introducing <span className="font-black">cult ui pro</span>
            </p>

            <div className="h-1 w-1 rounded-full bg-black"></div>

            <span className="hidden md:block">
              full stack blocks, ai agents and more .
            </span>
          </AlertDescription>
        </div>
      </a>
    </Alert>
  )
}
