"use client"

import React, {
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import ReactPlayer from "react-player/lazy"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { SidePanel } from "../ui/side-panel"

// Theme Context for Styling
type ThemeContextType = {
  panelClass?: string
}

// Create the context with the type
const ThemeContext = createContext<ThemeContextType>({})

// Custom Hook for Measuring and Animations
const useCustomMeasure = () => {
  const [ref, bounds] = useMeasure()
  const animateProps = {
    animate: { height: bounds.height > 0 ? bounds.height : 0.1 },
    transition: { type: "spring", bounce: 0.02, duration: 0.65 },
  }
  return { ref, animateProps }
}

// ResizablePanel Component
type ResizablePanelProps = {
  children: ReactNode
  className?: string
}

// ResizablePanel Component
const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ children, className, ...props }, ref) => {
    const transition = { type: "ease", ease: "easeInOut", duration: 0.4 }

    return (
      <MotionConfig transition={transition}>
        <div
          ref={ref}
          className={cn("flex w-full flex-col items-start", className)}
          {...props}
        >
          <div className="mx-auto w-full">
            <div
              className={cn(
                children ? "rounded-r-none" : "rounded-sm",
                "relative overflow-hidden"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </MotionConfig>
    )
  }
)

ResizablePanel.displayName = "ResizablePanel"

// VideoPowerButton Component
type VideoPowerButtonProps = {
  handleVideoOpen: () => void
}

// VideoPowerButton Component
const VideoPowerButton = forwardRef<HTMLInputElement, VideoPowerButtonProps>(
  ({ handleVideoOpen }, ref) => {
    return (
      <div className="flex flex-col items-center py-2 mx-3">
        <input
          ref={ref}
          className="pb-4"
          id="checkbox"
          type="checkbox"
          onChange={handleVideoOpen}
        />
        <label className="switch" htmlFor="checkbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="slider"
          >
            {/* SVG path here */}
          </svg>
        </label>
      </div>
    )
  }
)

VideoPowerButton.displayName = "VideoPowerButton"

type YoutubeVideoProps = {
  videoOpen: boolean
  url: string
}

const YoutubeVideo = forwardRef<HTMLDivElement, YoutubeVideoProps>(
  ({ videoOpen, url }, ref) => {
    return (
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            ref={ref}
            className="md:flex md:justify-center py-1 px-1 md:py-8 md:px-8 w-full h-[300px] md:h-[800px] md:aspect-video rounded-2xl bg-black"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ReactPlayer
              width="100%"
              height="100%"
              controls={false}
              color="white"
              url={url}
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

YoutubeVideo.displayName = "YoutubeVideo"

type VideoContentProps = {
  url: string
  videoOpen: boolean
}

// Define the VideoContent component
const VideoContent: React.FC<VideoContentProps> = ({ url, videoOpen }) => {
  // Define the animation variants
  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  }

  // Define transition properties
  const transition = {
    duration: 0.2,
    ease: [0.04, 0.62, 0.23, 0.98], // Custom cubic-bezier easing
    delay: 0.3,
  }

  return (
    <AnimatePresence>
      {videoOpen && (
        <motion.div
          className="md:flex md:justify-center py-1 px-1 md:py-8 md:px-8 w-full h-[300px] md:h-[800px] md:aspect-video rounded-2xl bg-black"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={videoVariants}
          transition={transition}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            controls={false}
            color="white"
            url={url}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Define the main VideoSection component
type VideoSectionProps = {
  videoOpen: boolean
  handleVideoOpen: () => void
  className?: string
  videoUrl: string
  children?: ReactNode // Add this line
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoOpen,
  handleVideoOpen,
  className,
  videoUrl,
  children,
}) => {
  const theme = useContext(ThemeContext)

  return (
    <ResizablePanel className={cn(className, theme.panelClass)}>
      {children ? (
        children
      ) : (
        <>
          <VideoPowerButton handleVideoOpen={handleVideoOpen} />
          <VideoContent url={videoUrl} videoOpen={videoOpen} />
        </>
      )}
    </ResizablePanel>
  )
}

export {
  VideoContent,
  VideoSection,
  YoutubeVideo,
  VideoPowerButton,
  ResizablePanel,
  useCustomMeasure,
}

export default function VideoSectionDemo() {
  const [videoOpen, setVideoOpen] = useState(false)

  const handleVideoOpen = () => {
    setVideoOpen(!videoOpen)
  }

  const renderVideoButton = (handleToggle: () => void) => (
    <div
      className={cn(
        "flex items-center w-full justify-start pr-4 md:pl-4 py-1 md:py-1",
        videoOpen ? "pr-3" : ""
      )}
    >
      <p className="text-xl font-black tracking-tight text-gray-900 sm:text-3xl">
        <span className="bg-gradient-to-t from-neutral-200 to-stone-300 bg-clip-text font-brand text-xl font-bold text-transparent sm:text-6xl">
          video
        </span>
      </p>
      <Button
        className="rounded-r-[33px] py-8 ml-2 "
        onClick={handleVideoOpen}
        variant="secondary"
      >
        {videoOpen ? "close" : "open"}
      </Button>
    </div>
  )

  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px]  flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <SidePanel
          panelOpen={videoOpen}
          handlePanelOpen={handleVideoOpen}
          renderButton={renderVideoButton}
        >
          <YoutubeVideo
            videoOpen={videoOpen}
            url={"https://youtu.be/ta6m_l3lZvQ?si=1CPubGeqxLVG0i2L"}
          />
        </SidePanel>
      </div>
    </div>
  )
}
