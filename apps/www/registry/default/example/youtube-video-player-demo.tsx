"use client";

import { YouTubePlayer } from "@/registry/default/ui/youtube-video-player";

export default function YouTubeVideoPlayerDemo() {
  return (
    <div className="space-y-12 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">YouTube Video Player Examples</h1>
        <p className="text-muted-foreground">
          A collection of YouTube video player examples showcasing different
          configurations and styling options.
        </p>
      </div>

      {/* Custom Thumbnail */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Custom Thumbnail</h2>
          <p className="text-muted-foreground">
            Player with a custom thumbnail image instead of the default YouTube
            thumbnail.
          </p>
        </div>
        <div className="max-w-2xl">
          <YouTubePlayer
            videoId="jNQXAC9IVRw"
            title="Me at the zoo - First YouTube Video"
            customThumbnail="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&crop=center"
          />
        </div>
      </section>

      {/* Custom Styling */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Custom Styling</h2>
          <p className="text-muted-foreground">
            Player with custom styling classes for different elements.
          </p>
        </div>
        <div className="max-w-2xl">
          <YouTubePlayer
            videoId="kJQP7kiw5Fk"
            title="Despacito - Luis Fonsi ft. Daddy Yankee"
            containerClassName="border-2 border-primary rounded-2xl shadow-2xl"
            thumbnailImageClassName="opacity-90 saturate-150"
            playButtonClassName="bg-primary/20 border-border/20 hover:bg-primary/30"
            playIconClassName="text-secondary fill-secondary"
            titleClassName="text-secondary font-bold"
            controlsClassName="right-4 top-4"
            expandButtonClassName="bg-secondary/20 hover:bg-secondary/30 border-secondary text-secondary"
          />
        </div>
      </section>

      {/* Multiple Players Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Multiple Players</h2>
          <p className="text-muted-foreground">
            A grid of multiple video players with different content.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <YouTubePlayer
            videoId="9bZkp7q19f0"
            title="PSY - GANGNAM STYLE"
            className="w-full"
          />
          <YouTubePlayer
            videoId="fJ9rUzIMcZQ"
            title="Queen – Bohemian Rhapsody"
            className="w-full"
          />
          <YouTubePlayer
            videoId="L_jWHffIx5E"
            title="Smash Mouth - All Star"
            className="w-full"
          />
          <YouTubePlayer
            videoId="hTWKbfoikeg"
            title="Nirvana - Smells Like Teen Spirit"
            className="w-full"
          />
          <YouTubePlayer
            videoId="djV11Xbc914"
            title="a-ha - Take On Me"
            className="w-full"
          />
          <YouTubePlayer
            videoId="ZbZSe6N_BXs"
            title="Happy - Pharrell Williams"
            className="w-full"
          />
        </div>
      </section>

      {/* Different Aspect Ratios */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Different Sizes</h2>
          <p className="text-muted-foreground">
            Players in different container sizes to show responsive behavior.
          </p>
        </div>
        <div className="space-y-8">
          {/* Small */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Small (300px)</h3>
            <div className="w-[300px]">
              <YouTubePlayer
                videoId="2yJgwwDcgV8"
                title="Nyan Cat [original]"
              />
            </div>
          </div>

          {/* Medium */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Medium (500px)</h3>
            <div className="w-[500px]">
              <YouTubePlayer videoId="oHg5SJYRHA0" title="RickRoll'D" />
            </div>
          </div>

          {/* Large */}
          <div>
            <h3 className="mb-3 text-lg font-medium">Large (800px)</h3>
            <div className="w-[800px]">
              <YouTubePlayer videoId="y6120QOlsfU" title="Darude - Sandstorm" />
            </div>
          </div>
        </div>
      </section>

      {/* URL Formats */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Different URL Formats</h2>
          <p className="text-muted-foreground">
            The player can handle different YouTube URL formats automatically.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Regular video ID */}
          <div>
            <h3 className="mb-2 text-sm font-medium">
              Video ID: "dQw4w9WgXcQ"
            </h3>
            <YouTubePlayer videoId="dQw4w9WgXcQ" title="Using Video ID" />
          </div>

          {/* Full YouTube URL */}
          <div>
            <h3 className="mb-2 text-sm font-medium">
              Full URL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            </h3>
            <YouTubePlayer
              videoId="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              title="Using Full YouTube URL"
            />
          </div>

          {/* Short URL */}
          <div>
            <h3 className="mb-2 text-sm font-medium">
              Short URL: "https://youtu.be/dQw4w9WgXcQ"
            </h3>
            <YouTubePlayer
              videoId="https://youtu.be/dQw4w9WgXcQ"
              title="Using Short YouTube URL"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-semibold">Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">✨ Key Features</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Expandable full-screen mode</li>
                <li>• Custom thumbnails support</li>
                <li>• Smooth animations with Framer Motion</li>
                <li>• Keyboard shortcuts (ESC to close)</li>
                <li>• Responsive design</li>
                <li>• Accessible controls</li>
                <li>• Multiple URL format support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">🎨 Customization</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Fully customizable styling</li>
                <li>• Custom play button designs</li>
                <li>• Thumbnail overlay effects</li>
                <li>• Control button positioning</li>
                <li>• Container and backdrop styling</li>
                <li>• Title and text customization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
