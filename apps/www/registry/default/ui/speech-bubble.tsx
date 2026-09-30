"use client"

import { cn } from "@/lib/utils"

interface SpeechBubbleProps {
  children: React.ReactNode
  className?: string
  showCursor?: boolean
}

function SpeechBubbleRoot({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="speech-bubble"
      className={cn("mr-12", className)}
      {...props}
    />
  )
}

function SpeechBubbleBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="speech-bubble-body"
      className={cn(
        "relative flex w-fit items-center rounded-full bg-foreground px-6 py-6 text-background transition-colors lg:px-10 lg:py-5",
        className
      )}
      {...props}
    />
  )
}

function SpeechBubbleTail({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="speech-bubble-tail"
      aria-hidden="true"
      className={cn(
        "absolute right-[-17px] bottom-0 h-6 -rotate-5 transition-colors md:right-[-7px] md:h-auto lg:right-[-9px]",
        className
      )}
      fill="none"
      focusable="false"
      height="45"
      viewBox="0 0 53 45"
      width="53"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-foreground transition-colors"
        d="M44 0H0V0C0 24.8528 20.1472 45 45 45H53V45C47.1396 36.535 44 26.4842 44 16.1886V0Z"
      />
    </svg>
  )
}

function SpeechBubbleText({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="speech-bubble-text"
      className={cn(
        "relative text-balance font-semibold text-background text-base leading-[0.9] tracking-[-0.06em] md:text-2xl lg:text-[2rem]",
        className
      )}
      {...props}
    />
  )
}

function SpeechBubbleCursor({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="speech-bubble-cursor"
      className={cn(
        "relative ml-2 hidden h-6 w-4 animate-pulse bg-muted-foreground md:block",
        className
      )}
      {...props}
    />
  )
}

function SpeechBubble({
  children,
  className,
  showCursor = true,
}: SpeechBubbleProps) {
  return (
    <SpeechBubbleRoot className={className}>
      <SpeechBubbleBody>
        <SpeechBubbleTail />
        <SpeechBubbleText>{children}</SpeechBubbleText>
        {showCursor ? <SpeechBubbleCursor /> : null}
      </SpeechBubbleBody>
    </SpeechBubbleRoot>
  )
}

export {
  SpeechBubble,
  SpeechBubbleRoot,
  SpeechBubbleBody,
  SpeechBubbleTail,
  SpeechBubbleText,
  SpeechBubbleCursor,
}
