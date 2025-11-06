"use client"

import { useId } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/registry/default/ui/expandable-screen"

function ExpandableScreenDemo() {
  const nameId = useId()
  const emailId = useId()
  const websiteId = useId()
  const companySizeId = useId()
  const messageId = useId()
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[90%] tracking-[-0.03em] text-foreground mix-blend-exclusion max-w-2xl">
            Join the waitlist
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-[160%] text-foreground max-w-2xl px-4">
            Be among the first to experience our next-generation platform. Get
            early access to exclusive features and help shape the future of
            productivity.
          </p>

          <ExpandableScreenTrigger>
            <div className="bg-primary h-15 px-6 sm:px-8 py-3 text-lg sm:text-xl font-regular text-primary-foreground tracking-[-0.01em]">
              Get early access
            </div>
          </ExpandableScreenTrigger>
        </div>
      </div>

      <ExpandableScreenContent className="bg-primary">
        <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
              Reserve your spot
            </h2>

            <div className="space-y-4 sm:space-y-6 pt-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                    Get priority access to new features and updates before
                    public release.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-primary-foreground leading-[150%]">
                    Join a community of early adopters and help influence our
                    product roadmap.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-primary-foreground/20">
              <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground leading-[150%] mb-4">
                The waitlist has been a game-changer for our workflow. Highly
                recommend joining early.
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Alex Rivera"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-primary-foreground">
                    Alex Rivera
                  </p>
                  <p className="text-sm sm:text-base text-primary-foreground/70">
                    Early Access Member
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <form className="space-y-4 sm:space-y-5">
              <div>
                <Label
                  htmlFor={nameId}
                  className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                >
                  FULL NAME *
                </Label>
                <Input
                  type="text"
                  id={nameId}
                  name="name"
                  className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                />
              </div>

              <div>
                <Label
                  htmlFor={emailId}
                  className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                >
                  EMAIL *
                </Label>
                <Input
                  type="email"
                  id={emailId}
                  name="email"
                  className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor={websiteId}
                    className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                  >
                    USE CASE
                  </Label>
                  <Input
                    type="text"
                    id={websiteId}
                    name="use-case"
                    placeholder="e.g., Project management, Team collaboration"
                    className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all resize-none text-sm h-10"
                  />
                </div>
                <div className="sm:w-32 w-full">
                  <Label
                    htmlFor={companySizeId}
                    className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                  >
                    TEAM SIZE
                  </Label>
                  <Select name="team-size">
                    <SelectTrigger
                      id={companySizeId}
                      className="w-full px-4 py-2.5 rounded-lg bg-card border-0 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all text-sm h-10"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo</SelectItem>
                      <SelectItem value="2-5">2-5</SelectItem>
                      <SelectItem value="6-20">6-20</SelectItem>
                      <SelectItem value="21-50">21-50</SelectItem>
                      <SelectItem value="50+">50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  htmlFor={messageId}
                  className="block text-[10px] font-mono font-normal text-primary-foreground mb-2 tracking-[0.5px] uppercase"
                >
                  WHAT ARE YOU MOST EXCITED ABOUT?
                </Label>
                <Textarea
                  id={messageId}
                  name="excited-about"
                  rows={3}
                  placeholder="Tell us what features you're looking forward to..."
                  className="w-full px-4 py-3 rounded-lg bg-card border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all resize-none text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full px-8 py-2.5 rounded-full bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors tracking-[-0.03em] h-10"
              >
                Join waitlist
              </Button>
            </form>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  )
}

export default ExpandableScreenDemo
