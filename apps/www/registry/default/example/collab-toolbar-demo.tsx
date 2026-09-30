"use client"

import { CollabToolbar } from "@/registry/default/ui/collab-toolbar"

const avatars = [
  { name: "Jane Doe", imageUrl: "https://i.pravatar.cc/100?img=12" },
  { name: "Alex Kim", imageUrl: "https://i.pravatar.cc/100?img=32" },
  { name: "Sam Taylor", imageUrl: "https://i.pravatar.cc/100?img=68" },
]

function CollabToolbarDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <CollabToolbar
        groups={[["phone", "desktop", "chat"], "avatars", ["upload", "menu"]]}
        avatars={avatars}
      />
    </div>
  )
}

export default CollabToolbarDemo
