"use client"

import { SpeechBubble } from "@/registry/default/ui/speech-bubble"

function SpeechBubbleDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <SpeechBubble>Hello, how are you?</SpeechBubble>
      <SpeechBubble showCursor={false}>No cursor variant</SpeechBubble>
    </div>
  )
}

export default SpeechBubbleDemo
