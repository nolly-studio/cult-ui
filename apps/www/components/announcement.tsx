import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Blocks } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import BgNoiseWrapper from "./texture-wrapper"

// <div className="relative">
// <div
//   className="fixed inset-0 mix-blend-hard-light pointer-events-none"
//   style={{ backgroundImage: "url('/cult-noise.png')" }}
// ></div>
//       <div className="relative">{children}</div>
//     </div>

export function Announcement() {
  return (
    <Link
      href="/docs/changelog"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
      // style={{ backgroundImage: "url('/cult-noise.png')" }}
    >
      <div
        className="fixed inset-0 mix-blend-hard-light pointer-events-none"
        style={{ backgroundImage: "url('/cult-noise.png')" }}
      ></div>
      <Blocks className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span>Introducing Cult Components</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
      {/* <BgNoiseWrapper> */}
      {/* </BgNoiseWrapper> */}
    </Link>
  )
}
