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
      href="https://pro.cult-ui.com"
      className="group inline-flex items-center rounded-lg border border-black/10 bg-transparent px-3 py-1 text-sm font-medium text-neutral-800 shadow-sm"
      // style={{ backgroundImage: "url('/cult-noise.png')" }}
      target="_blank"
      rel="noreferrer"
    >
      <Blocks className="h-4 w-4 group-hover:rotate-6 group-hover:fill-cyan-300" />{" "}
      <Separator className="mx-2 h-4 bg-neutral-900" orientation="vertical" />{" "}
      <span>New! Cult UI Pro Blocks</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
      {/* <BgNoiseWrapper> */}
      {/* </BgNoiseWrapper> */}
    </Link>
  )
}
