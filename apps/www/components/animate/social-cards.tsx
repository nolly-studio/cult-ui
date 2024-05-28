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
    <div className="cursor-pointer font-[Helvetica] rounded-md overflow-hidden shadow-lg max-w-full bg-white">
      <div className="relative w-full h-56 md:h-72">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          alt={title || ""}
        />
      </div>
      <div className="p-4">
        <p className="text-xs md:text-sm text-gray-500 truncate">{url}</p>
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 mt-1 truncate">
          {title}
        </h4>
        <p className="text-sm md:text-neutral-500 text-gray-700 mt-1 line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  )
}

export function TwitterOGCard({ img, title, url }: OGAttr) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg max-w-full bg-black">
      <div className="relative w-full h-56 md:h-72">
        <Image src={img} layout="fill" objectFit="cover" alt={title || ""} />
      </div>
      <div className="absolute bottom-2 left-2 text-xs md:text-sm text-white px-1 py-0.5 rounded">
        {url}
      </div>
    </div>
  )
}

export function LinkedInOGCard({ img, title, url }: OGAttr) {
  return (
    <div className="rounded-sm overflow-hidden shadow-lg max-w-full bg-white">
      <div className="relative w-full h-56 md:h-72">
        <Image src={img} layout="fill" objectFit="cover" alt={title || ""} />
      </div>
      <div className="p-4">
        <h4 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-gray-500 truncate">{url}</p>
      </div>
    </div>
  )
}

export function SMSOgCard({ title, url, img }: OGAttr) {
  return (
    <div className="flex flex-col border  rounded-3xl overflow-hidden shadow-lg max-w-full">
      <div className="relative w-full h-56 md:h-56">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          alt="Article Thumbnail"
          className="rounded-t-3xl"
        />
      </div>
      <div className="flex p-4 items-center space-x-4 bg-white">
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-sm md:text-neutral-500 font-semibold text-neutral-500-900 truncate">
            {title}
          </p>
          <p className="text-xs md:text-sm text-neutral-500 truncate">{url}</p>
        </div>
      </div>
    </div>
  )
}

export function IosOgShellCard({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-xs md:max-w-md mx-auto flex flex-col rounded-lg bg-neutral-900 px-px pb-px shadow-inner-shadow">
      <div className="p-4 flex flex-col md:px-5">
        <div className="mb-2 text-sm md:text-neutral-500 text-neutral-500">
          iMessage
        </div>
        <div className="mb-3 text-xs md:text-sm text-neutral-500">
          Today 11:29
        </div>
        <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
          <span>Check out this new product!</span>
        </div>
        {children}
        <div className="mt-3 text-xs md:text-sm text-neutral-500">
          Delivered
        </div>
      </div>
    </div>
  )
}
