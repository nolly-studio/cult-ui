"use client"

import { CollabAvatar } from "@/registry/default/ui/collab-avatar"

const avatars = [
  { name: "Jordan Gilliam", color: "#0070F3" },
  { name: "Alex Kim", color: "#7928CA" },
  { name: "Sam Taylor", color: "#EB3672" },
  { name: "Jo", color: "#00C2A8" },
]

function CollabAvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="flex items-center gap-3">
        {avatars.map(({ name, color }) => (
          <CollabAvatar key={name} name={name} color={color} size={32} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <CollabAvatar name="Small" color="#0070F3" size={24} />
        <CollabAvatar name="Medium" color="#7928CA" size={40} />
        <CollabAvatar name="Large" color="#EB3672" size={56} />
      </div>
    </div>
  )
}

export default CollabAvatarDemo
