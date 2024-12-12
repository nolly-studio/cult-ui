"use client"

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion, useWillChange } from "motion/react"

const stiffness = 400
const damping = 30
const MIN_WIDTH = 691
const MAX_HEIGHT_MOBILE_ULTRA = 400
const MAX_HEIGHT_MOBILE_MASSIVE = 700

const min = (a: number, b: number) => (a < b ? a : b)

export type SizePresets =
  | "reset"
  | "empty"
  | "default"
  | "compact"
  | "compactLong"
  | "large"
  | "long"
  | "minimalLeading"
  | "minimalTrailing"
  | "compactMedium"
  | "medium"
  | "tall"
  | "ultra"
  | "massive"

const SIZE_PRESETS = {
  RESET: "reset",
  EMPTY: "empty",
  DEFAULT: "default",
  COMPACT: "compact",
  COMPACT_LONG: "compactLong",
  LARGE: "large",
  LONG: "long",
  MINIMAL_LEADING: "minimalLeading",
  MINIMAL_TRAILING: "minimalTrailing",
  COMPACT_MEDIUM: "compactMedium",
  MEDIUM: "medium",
  TALL: "tall",
  ULTRA: "ultra",
  MASSIVE: "massive",
} as const

type Preset = {
  width: number
  height?: number
  aspectRatio: number
  borderRadius: number
}

const DynamicIslandSizePresets: Record<SizePresets, Preset> = {
  [SIZE_PRESETS.RESET]: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 20,
  },
  [SIZE_PRESETS.EMPTY]: {
    width: 0,
    aspectRatio: 0,
    borderRadius: 0,
  },
  [SIZE_PRESETS.DEFAULT]: {
    width: 150,
    aspectRatio: 44 / 150,
    borderRadius: 46,
  },
  [SIZE_PRESETS.MINIMAL_LEADING]: {
    width: 52.33,
    aspectRatio: 44 / 52.33,
    borderRadius: 22,
  },
  [SIZE_PRESETS.MINIMAL_TRAILING]: {
    width: 52.33,
    aspectRatio: 44 / 52.33,
    borderRadius: 22,
  },
  [SIZE_PRESETS.COMPACT]: {
    width: 235,
    aspectRatio: 44 / 235,
    borderRadius: 46,
  },
  [SIZE_PRESETS.COMPACT_LONG]: {
    width: 300,
    aspectRatio: 44 / 235,
    borderRadius: 46,
  },
  [SIZE_PRESETS.COMPACT_MEDIUM]: {
    width: 351,
    aspectRatio: 64 / 371,
    borderRadius: 44,
  },
  [SIZE_PRESETS.LONG]: {
    width: 371,
    aspectRatio: 84 / 371,
    borderRadius: 42,
  },
  [SIZE_PRESETS.MEDIUM]: {
    width: 371,
    aspectRatio: 210 / 371,
    borderRadius: 22,
  },
  [SIZE_PRESETS.LARGE]: {
    width: 371,
    aspectRatio: 84 / 371,
    borderRadius: 42,
  },
  [SIZE_PRESETS.TALL]: {
    width: 371,
    aspectRatio: 210 / 371,
    borderRadius: 42,
  },
  [SIZE_PRESETS.ULTRA]: {
    width: 630,
    aspectRatio: 630 / 800,
    borderRadius: 42,
  },
  [SIZE_PRESETS.MASSIVE]: {
    width: 891,
    height: 1900,
    aspectRatio: 891 / 891,
    borderRadius: 42,
  },
}

type BlobStateType = {
  size: SizePresets
  previousSize: SizePresets | undefined
  animationQueue: Array<{ size: SizePresets; delay: number }>
  isAnimating: boolean
}

type BlobAction =
  | { type: "SET_SIZE"; newSize: SizePresets }
  | { type: "INITIALIZE"; firstState: SizePresets }
  | {
      type: "SCHEDULE_ANIMATION"
      animationSteps: Array<{ size: SizePresets; delay: number }>
    }
  | { type: "ANIMATION_END" }

type BlobContextType = {
  state: BlobStateType
  dispatch: React.Dispatch<BlobAction>
  setSize: (size: SizePresets) => void
  scheduleAnimation: (
    animationSteps: Array<{ size: SizePresets; delay: number }>
  ) => void
  presets: Record<SizePresets, Preset>
}

const BlobContext = createContext<BlobContextType | undefined>(undefined)

const blobReducer = (
  state: BlobStateType,
  action: BlobAction
): BlobStateType => {
  switch (action.type) {
    case "SET_SIZE":
      return {
        ...state,
        size: action.newSize,
        previousSize: state.size,
        isAnimating: false, // Only set isAnimating to true if there are more steps
      }
    case "SCHEDULE_ANIMATION":
      return {
        ...state,
        animationQueue: action.animationSteps,
        isAnimating: action.animationSteps.length > 0,
      }
    case "INITIALIZE":
      return {
        ...state,
        size: action.firstState,
        previousSize: SIZE_PRESETS.EMPTY,
        isAnimating: false,
      }
    case "ANIMATION_END":
      return {
        ...state,
        isAnimating: false,
      }
    default:
      return state
  }
}

interface DynamicIslandProviderProps {
  children: React.ReactNode
  initialSize?: SizePresets
  initialAnimation?: Array<{ size: SizePresets; delay: number }>
}

const DynamicIslandProvider: React.FC<DynamicIslandProviderProps> = ({
  children,
  initialSize = SIZE_PRESETS.DEFAULT,
  initialAnimation = [],
}) => {
  const initialState: BlobStateType = {
    size: initialSize,
    previousSize: SIZE_PRESETS.EMPTY,
    animationQueue: initialAnimation,
    isAnimating: initialAnimation.length > 0,
  }

  const [state, dispatch] = useReducer(blobReducer, initialState)

  useEffect(() => {
    const processQueue = async () => {
      for (const step of state.animationQueue) {
        await new Promise((resolve) => setTimeout(resolve, step.delay))
        dispatch({ type: "SET_SIZE", newSize: step.size })
      }
      dispatch({ type: "ANIMATION_END" })
    }

    if (state.animationQueue.length > 0) {
      processQueue()
    }
  }, [state.animationQueue])

  const setSize = useCallback(
    (newSize: SizePresets) => {
      if (state.previousSize !== newSize && newSize !== state.size) {
        dispatch({ type: "SET_SIZE", newSize })
      }
    },
    [state.previousSize, state.size, dispatch]
  )

  const scheduleAnimation = useCallback(
    (animationSteps: Array<{ size: SizePresets; delay: number }>) => {
      dispatch({ type: "SCHEDULE_ANIMATION", animationSteps })
    },
    [dispatch]
  )

  const contextValue = {
    state,
    dispatch,
    setSize,
    scheduleAnimation,
    presets: DynamicIslandSizePresets,
  }

  return (
    <BlobContext.Provider value={contextValue}>{children}</BlobContext.Provider>
  )
}

const useDynamicIslandSize = () => {
  const context = useContext(BlobContext)
  if (!context) {
    throw new Error(
      "useDynamicIslandSize must be used within a DynamicIslandProvider"
    )
  }
  return context
}

const useScheduledAnimations = (
  animations: Array<{ size: SizePresets; delay: number }>
) => {
  const { scheduleAnimation } = useDynamicIslandSize()
  const animationsRef = useRef(animations)

  useEffect(() => {
    scheduleAnimation(animationsRef.current)
  }, [scheduleAnimation])
}

const DynamicIslandContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="z-10 flex h-full w-full items-end justify-center bg-transparent">
      {children}
    </div>
  )
}

const DynamicIsland = ({
  children,
  id,
  ...props
}: {
  children: ReactNode
  id: string
}) => {
  const willChange = useWillChange()
  const [screenSize, setScreenSize] = useState("desktop")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setScreenSize("mobile")
      } else if (window.innerWidth <= 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <DynamicIslandContainer>
      <DynamicIslandContent
        id={id}
        willChange={willChange}
        screenSize={screenSize}
        {...props}
      >
        {children}
      </DynamicIslandContent>
    </DynamicIslandContainer>
  )
}

const calculateDimensions = (
  size: SizePresets,
  screenSize: string,
  currentSize: Preset
): { width: string; height: number } => {
  const isMassiveOnMobile = size === "massive" && screenSize === "mobile"
  const isUltraOnMobile = size === "ultra" && screenSize === "mobile"

  if (isMassiveOnMobile) {
    return { width: "350px", height: MAX_HEIGHT_MOBILE_MASSIVE }
  }

  if (isUltraOnMobile) {
    return { width: "350px", height: MAX_HEIGHT_MOBILE_ULTRA }
  }

  const width = min(currentSize.width, MIN_WIDTH)
  return { width: `${width}px`, height: currentSize.aspectRatio * width }
}

const DynamicIslandContent = ({
  children,
  id,
  willChange,
  screenSize,
  ...props
}: {
  children: React.ReactNode
  id: string
  willChange: any
  screenSize: string
  [key: string]: any
}) => {
  const { state, presets } = useDynamicIslandSize()
  const currentSize = presets[state.size]

  const dimensions = calculateDimensions(state.size, screenSize, currentSize)

  return (
    <motion.div
      id={id}
      className="mx-auto h-0 w-0 items-center justify-center border border-black/10 bg-black text-center text-black transition duration-300 ease-in-out focus-within:bg-neutral-900 hover:shadow-md dark:border dark:border-white/5 dark:focus-within:bg-black"
      animate={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: currentSize.borderRadius,
        transition: {
          type: "spring",
          stiffness,
          damping,
        },
        clipPath: `none`,
        transitionEnd: {
          clipPath: `url(#squircle-${state.size})`,
        },
      }}
      style={{ willChange }}
      {...props}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </motion.div>
  )
}

type DynamicContainerProps = {
  className?: string
  children?: React.ReactNode
}

const DynamicContainer = ({ className, children }: DynamicContainerProps) => {
  const willChange = useWillChange()
  const { state } = useDynamicIslandSize()
  const { size, previousSize } = state

  const isSizeChanged = size !== previousSize

  const initialState = {
    opacity: size === previousSize ? 1 : 0,
    scale: size === previousSize ? 1 : 0.9,
    y: size === previousSize ? 0 : 5,
  }

  const animateState = {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness,
      damping,
      duration: isSizeChanged ? 0.5 : 0.8,
    },
  }

  return (
    <motion.div
      initial={initialState}
      animate={animateState}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95, y: 20 }}
      style={{ willChange }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type DynamicChildrenProps = {
  className?: string
  children?: React.ReactNode
}

const DynamicDiv = ({ className, children }: DynamicChildrenProps) => {
  const { state } = useDynamicIslandSize()
  const { size, previousSize } = state
  const willChange = useWillChange()

  return (
    <motion.div
      initial={{
        opacity: size === previousSize ? 1 : 0,
        scale: size === previousSize ? 1 : 0.9,
      }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: {
          type: "spring",
          stiffness,
          damping,
        },
      }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 0 }}
      style={{ willChange }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type MotionProps = {
  className: string
  children: React.ReactNode
}

const DynamicTitle = ({ className, children }: MotionProps) => {
  const { state } = useDynamicIslandSize()
  const { size, previousSize } = state
  const willChange = useWillChange()

  return (
    <motion.h3
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: { type: "spring", stiffness, damping },
      }}
      style={{ willChange }}
    >
      {children}
    </motion.h3>
  )
}

const DynamicDescription = ({ className, children }: MotionProps) => {
  const { state } = useDynamicIslandSize()
  const { size, previousSize } = state
  const willChange = useWillChange()

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: size === previousSize ? 0 : 1,
        scale: size === previousSize ? 0.9 : 1,
        transition: { type: "spring", stiffness, damping },
      }}
      style={{ willChange }}
    >
      {children}
    </motion.p>
  )
}

export {
  DynamicContainer,
  DynamicTitle,
  DynamicDescription,
  DynamicIsland,
  SIZE_PRESETS,
  stiffness,
  DynamicDiv,
  damping,
  DynamicIslandSizePresets,
  BlobContext,
  useDynamicIslandSize,
  useScheduledAnimations,
  DynamicIslandProvider,
}

export default DynamicIsland
