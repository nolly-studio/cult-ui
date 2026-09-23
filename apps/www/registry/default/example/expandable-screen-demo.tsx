"use client";

import Image from "next/image";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/registry/default/ui/expandable-screen";

const formFieldClassName =
  "w-full rounded-lg border-0 bg-primary-foreground px-4 text-primary shadow-none placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm";

function ExpandableScreenDemo() {
  const nameId = useId();
  const emailId = useId();
  const websiteId = useId();
  const companySizeId = useId();
  const messageId = useId();
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-6">
          <h1 className="text-foreground max-w-2xl text-4xl leading-[90%] font-normal tracking-[-0.03em] mix-blend-exclusion sm:text-5xl md:text-6xl lg:text-7xl">
            Join the waitlist
          </h1>

          <p className="text-foreground max-w-2xl px-4 text-base leading-[160%] sm:text-lg md:text-xl">
            Be among the first to experience our next-generation platform. Get
            early access to exclusive features and help shape the future of
            productivity.
          </p>

          <ExpandableScreenTrigger>
            <div className="bg-primary font-regular text-primary-foreground h-15 px-6 py-3 text-lg tracking-[-0.01em] sm:px-8 sm:text-xl">
              Get early access
            </div>
          </ExpandableScreenTrigger>
        </div>
      </div>

      <ExpandableScreenContent className="bg-primary">
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] flex-col items-center gap-8 p-6 sm:p-10 lg:flex-row lg:gap-16 lg:p-16">
          <div className="flex w-full flex-1 flex-col justify-center space-y-3">
            <h2 className="text-primary-foreground text-3xl leading-none font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Reserve your spot
            </h2>

            <div className="space-y-4 pt-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-primary-foreground/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                  <svg
                    className="text-primary-foreground h-5 w-5 sm:h-6 sm:w-6"
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
                  <p className="text-primary-foreground text-sm leading-[150%] sm:text-base">
                    Get priority access to new features and updates before
                    public release.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-primary-foreground/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                  <svg
                    className="text-primary-foreground h-5 w-5 sm:h-6 sm:w-6"
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
                  <p className="text-primary-foreground text-sm leading-[150%] sm:text-base">
                    Join a community of early adopters and help influence our
                    product roadmap.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-primary-foreground/20 mt-6 border-t pt-6 sm:mt-8 sm:pt-8">
              <p className="text-primary-foreground mb-4 text-lg leading-[150%] sm:text-xl lg:text-2xl">
                The waitlist has been a game-changer for our workflow. Highly
                recommend joining early.
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Alex Rivera"
                  width={48}
                  height={48}
                  className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                />
                <div>
                  <p className="text-primary-foreground text-base sm:text-lg lg:text-xl">
                    Alex Rivera
                  </p>
                  <p className="text-primary-foreground/70 text-sm sm:text-base">
                    Early Access Member
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <form className="space-y-4 sm:space-y-5">
              <div>
                <Label
                  htmlFor={nameId}
                  className="text-primary-foreground mb-2 block font-mono text-[10px] font-normal tracking-[0.5px] uppercase"
                >
                  FULL NAME *
                </Label>
                <Input
                  type="text"
                  id={nameId}
                  name="name"
                  className={cn(formFieldClassName, "h-10 py-2.5")}
                />
              </div>

              <div>
                <Label
                  htmlFor={emailId}
                  className="text-primary-foreground mb-2 block font-mono text-[10px] font-normal tracking-[0.5px] uppercase"
                >
                  EMAIL *
                </Label>
                <Input
                  type="email"
                  id={emailId}
                  name="email"
                  className={cn(formFieldClassName, "h-10 py-2.5")}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Label
                    htmlFor={websiteId}
                    className="text-primary-foreground mb-2 block font-mono text-[10px] font-normal tracking-[0.5px] uppercase"
                  >
                    USE CASE
                  </Label>
                  <Input
                    type="text"
                    id={websiteId}
                    name="use-case"
                    placeholder="e.g., Project management, Team collaboration"
                    className={cn(formFieldClassName, "h-10 py-2.5")}
                  />
                </div>
                <div className="w-full sm:w-32">
                  <Label
                    htmlFor={companySizeId}
                    className="text-primary-foreground mb-2 block font-mono text-[10px] font-normal tracking-[0.5px] uppercase"
                  >
                    TEAM SIZE
                  </Label>
                  <Select name="team-size">
                    <SelectTrigger
                      id={companySizeId}
                      className={cn(formFieldClassName, "h-10 py-2.5")}
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
                  className="text-primary-foreground mb-2 block font-mono text-[10px] font-normal tracking-[0.5px] uppercase"
                >
                  WHAT ARE YOU MOST EXCITED ABOUT?
                </Label>
                <Textarea
                  id={messageId}
                  name="excited-about"
                  rows={3}
                  placeholder="Tell us what features you're looking forward to..."
                  className={cn(formFieldClassName, "resize-none py-3")}
                />
              </div>

              <Button
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-10 w-full rounded-full px-8 py-2.5 font-medium tracking-[-0.03em] transition-colors"
              >
                Join waitlist
              </Button>
            </form>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}

export default ExpandableScreenDemo;
