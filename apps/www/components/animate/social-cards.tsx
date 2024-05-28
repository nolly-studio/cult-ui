"use client"

import { ReactNode } from "react"
import Image from "next/image"

import { TextAnimation } from "./type-animate"

interface OGAttr {
  img: string
  title?: string
  desc?: string
  url: string
}

export function FacebookOGCard({ img, title, desc, url }: OGAttr) {
  return (
    <div className="max-w-full cursor-pointer overflow-hidden rounded-md bg-white font-[Helvetica] shadow-lg">
      <div className="relative h-56 w-full md:h-72">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          alt={title || ""}
        />
      </div>
      <div className="p-4">
        <p className="truncate text-xs text-gray-500 md:text-sm">{url}</p>
        <h4 className="mt-1 truncate text-lg font-semibold text-gray-900 md:text-xl">
          {title}
        </h4>
        <p className="mt-1 line-clamp-2 text-sm text-gray-700 md:text-neutral-500">
          {desc}
        </p>
      </div>
    </div>
  )
}

export function TwitterOGCard({ img, title, url }: OGAttr) {
  return (
    <div className="relative max-w-full overflow-hidden rounded-lg bg-black shadow-lg">
      <div className="relative h-56 w-full md:h-72">
        <Image src={img} layout="fill" objectFit="cover" alt={title || ""} />
      </div>
      <div className="absolute bottom-2 left-2 rounded px-1 py-0.5 text-xs text-white md:text-sm">
        {url}
      </div>
    </div>
  )
}

export function LinkedInOGCard({ img, title, url }: OGAttr) {
  return (
    <div className="max-w-full overflow-hidden rounded-sm bg-white shadow-lg">
      <div className="relative h-56 w-full md:h-72">
        <Image src={img} layout="fill" objectFit="cover" alt={title || ""} />
      </div>
      <div className="p-4">
        <h4 className="truncate text-lg font-semibold text-gray-900 md:text-xl">
          {title}
        </h4>
        <p className="truncate text-xs text-gray-500 md:text-sm">{url}</p>
      </div>
    </div>
  )
}

export function SMSOgCard({ title, url, img }: OGAttr) {
  return (
    <div className="flex max-w-full flex-col  overflow-hidden rounded-3xl border shadow-lg">
      <div className="relative h-56 w-full md:h-56">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          alt="Article Thumbnail"
          className="rounded-t-3xl"
        />
      </div>
      <div className="flex items-center space-x-4 bg-white p-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-neutral-500-900 truncate text-sm font-semibold md:text-neutral-500">
            {title}
          </p>
          <p className="truncate text-xs text-neutral-500 md:text-sm">{url}</p>
        </div>
      </div>
    </div>
  )
}

export function IosOgShellCard({ children }: { children: ReactNode }) {
  return (
    <div className="shadow-inner-shadow mx-auto flex max-w-xs flex-col rounded-lg bg-neutral-900 px-px pb-px md:max-w-md">
      <div className="flex flex-col p-4 md:px-5">
        <div className="mb-2 text-sm text-neutral-500 md:text-neutral-500">
          iMessage
        </div>
        <div className="mb-3 text-xs text-neutral-500 md:text-sm">
          Today 11:29
        </div>
        <div className="mb-3 ml-auto rounded-2xl bg-blue-500 px-4 py-2 text-white">
          <span>Check out this new product!</span>
        </div>
        {children}
        <div className="mt-3 text-xs text-neutral-500 md:text-sm">
          Delivered
        </div>
      </div>
    </div>
  )
}
