import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { YoutubeIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { NeumorphEyebrow } from "@/registry/default/ui/neumorph-eyebrow"

export function Announcement() {
  return (
    <Link
      href="https://pro.cult-ui.com/templates/cult-directory-template"
      className="hidden md:block "
      target="_blank"
      rel="noreferrer"
    >
      <NeumorphEyebrow className="space-x-2">
        <YoutubeIcon className="size-4 group-hover:rotate-6 group-hover:fill-cyan-300" />{" "}
        <Separator className="mx-2 h-4 bg-border/80" orientation="vertical" />{" "}
        <span>New! nextjs directory template</span>
        <ArrowRightIcon className="ml-1 size-4" />
      </NeumorphEyebrow>
    </Link>
  )
}
