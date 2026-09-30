"use client"

interface MacScreenProps {
  gifUrl?: string
  alt?: string
}

export function MacScreen({
  gifUrl = "https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif",
  alt = "Screen content",
}: MacScreenProps) {
  return (
    <div className="relative inline-block">
      {/* Mac Computer Image */}
      <img
        alt="Classic Macintosh Computer"
        className="w-full max-w-lg"
        src="/component-frames/apple-computer-img.png"
      />

      {/* GIF overlay — all % so it tracks the responsive frame image (fixed rem width broke in previews) */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: "22.27%",
          left: "35.6%",
          width: "28.79%",
          height: "37.89%",
          borderRadius: "2.5%",
        }}
      >
        <img alt={alt} className="h-full w-full object-cover" src={gifUrl} />
      </div>
    </div>
  )
}
