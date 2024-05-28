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
import { AnimatePresence, motion, useWillChange } from "framer-motion"

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

// "use client"

// import React, {
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef,
//   useState,
// } from "react"
// import { AnimatePresence, motion, useWillChange } from "framer-motion"

// const stiffness = 400
// const damping = 30
// const MIN_WIDTH = 691
// const MAX_HEIGHT_MOBILE_ULTRA = 400
// const MAX_HEIGHT_MOBILE_MASSIVE = 700
// // Helper function for minimum value
// const min = (a: number, b: number) => (a < b ? a : b)

// export type SizePresets =
//   | "reset"
//   | "empty"
//   | "default"
//   | "compact"
//   | "compactLong"
//   | "large"
//   | "long"
//   | "minimalLeading"
//   | "minimalTrailing"
//   | "compactMedium"
//   | "medium"
//   | "tall"
//   | "ultra"
//   | "massive"

// const SIZE_PRESETS = {
//   RESET: "reset",
//   EMPTY: "empty",
//   DEFAULT: "default",
//   COMPACT: "compact",
//   COMPACT_LONG: "compactLong",
//   LARGE: "large",
//   LONG: "long",
//   MINIMAL_LEADING: "minimalLeading",
//   MINIMAL_TRAILING: "minimalTrailing",
//   COMPACT_MEDIUM: "compactMedium",
//   MEDIUM: "medium",
//   TALL: "tall",
//   ULTRA: "ultra",
//   MASSIVE: "massive",
// } as const

// type Preset = {
//   width: number
//   height?: number
//   aspectRatio: number
//   borderRadius: number
// }

// const DynamicIslandSizePresets: Record<SizePresets, Preset> = {
//   [SIZE_PRESETS.RESET]: {
//     width: 150,
//     aspectRatio: 1,
//     borderRadius: 20,
//   },
//   [SIZE_PRESETS.EMPTY]: {
//     width: 0,
//     aspectRatio: 0,
//     borderRadius: 0,
//   },

//   [SIZE_PRESETS.DEFAULT]: {
//     width: 150,
//     aspectRatio: 44 / 150,
//     borderRadius: 46,
//   },

//   [SIZE_PRESETS.MINIMAL_LEADING]: {
//     width: 52.33,
//     aspectRatio: 44 / 52.33,
//     borderRadius: 22,
//   },
//   [SIZE_PRESETS.MINIMAL_TRAILING]: {
//     width: 52.33,
//     aspectRatio: 44 / 52.33,
//     borderRadius: 22,
//   },
//   [SIZE_PRESETS.COMPACT]: {
//     width: 235,
//     aspectRatio: 44 / 235,
//     borderRadius: 46,
//   },
//   [SIZE_PRESETS.COMPACT_LONG]: {
//     width: 300,
//     aspectRatio: 44 / 235,
//     borderRadius: 46,
//   },
//   [SIZE_PRESETS.COMPACT_MEDIUM]: {
//     width: 351,
//     aspectRatio: 64 / 371,
//     borderRadius: 44,
//   },
//   [SIZE_PRESETS.LONG]: {
//     width: 371,
//     aspectRatio: 84 / 371,
//     borderRadius: 42,
//   },
//   [SIZE_PRESETS.MEDIUM]: {
//     width: 371,
//     aspectRatio: 210 / 371,
//     borderRadius: 22,
//   },
//   [SIZE_PRESETS.LARGE]: {
//     width: 371,
//     aspectRatio: 84 / 371,
//     borderRadius: 42,
//   },
//   [SIZE_PRESETS.TALL]: {
//     width: 371,
//     aspectRatio: 210 / 371,
//     borderRadius: 42,
//   },
//   [SIZE_PRESETS.ULTRA]: {
//     width: 630,
//     aspectRatio: 630 / 800,
//     borderRadius: 42,
//   },
//   [SIZE_PRESETS.MASSIVE]: {
//     width: 891,
//     height: 1900,
//     aspectRatio: 891 / 891,
//     borderRadius: 42,
//   },
// }

// type BlobContextType = {
//   state: BlobStateType
//   dispatch: React.Dispatch<BlobAction>
//   setSize: (size: SizePresets) => void
//   scheduleAnimation: (
//     animationSteps: Array<{ size: SizePresets; delay: number }>
//   ) => void
//   presets: Record<SizePresets, Preset>
// }

// const BlobContext = createContext<BlobContextType>({
//   state: {
//     size: SIZE_PRESETS.EMPTY, // Initial size state
//     previousSize: undefined, // Initial previous size state
//     animationQueue: [],
//     isAnimating: false,
//   },
//   scheduleAnimation: () => {},
//   dispatch: () => {}, // Placeholder function for dispatch
//   setSize: () => {}, // Placeholder function for setSize
//   presets: DynamicIslandSizePresets, // Your defined presets
// })

// type BlobStateType = {
//   size: SizePresets
//   previousSize: SizePresets | undefined
//   animationQueue: Array<{ size: SizePresets; delay: number }>
//   isAnimating: boolean // New state to track if animations are active
// }

// type BlobAction =
//   | { type: "SET_SIZE"; newSize: SizePresets }
//   | { type: "INITIALIZE"; firstState: SizePresets }
//   | {
//       type: "SCHEDULE_ANIMATION"
//       animationSteps: Array<{ size: SizePresets; delay: number }>
//     }
//   | { type: "ANIMATION_END" }

// // Provider props
// interface DynamicIslandProviderProps {
//   children: React.ReactNode
//   initialSize?: SizePresets | undefined
//   initialAnimation?: Array<{ size: SizePresets; delay: number }>
// }

// const blobReducer = (
//   state: BlobStateType,
//   action: BlobAction
// ): BlobStateType => {
//   console.log("Reducer action:", action) // Debugging
//   switch (action.type) {
//     case "SET_SIZE":
//       return {
//         ...state,
//         size: action.newSize,
//         previousSize: state.size,
//         isAnimating: state.animationQueue.length > 1, // Only set isAnimating to true if there are more steps
//       }
//     case "SCHEDULE_ANIMATION":
//       return {
//         ...state,
//         animationQueue: action.animationSteps,
//         isAnimating: action.animationSteps.length > 0, // Start animation if queue is not empty
//       }
//     case "INITIALIZE":
//       return {
//         ...state,
//         size: action.firstState,
//         previousSize: SIZE_PRESETS.EMPTY,
//         isAnimating: false, // No animation initially
//       }
//     case "ANIMATION_END":
//       return {
//         ...state,
//         isAnimating: false, // End of animation
//       }
//     default:
//       return state
//   }
// }

// interface DynamicIslandProviderProps {
//   children: React.ReactNode
//   initialSize?: SizePresets | undefined
//   initialAnimation?: Array<{ size: SizePresets; delay: number }>
// }

// const DynamicIslandProvider: React.FC<DynamicIslandProviderProps> = ({
//   children,
//   initialSize = SIZE_PRESETS.DEFAULT,
//   initialAnimation = [],
// }) => {
//   const initialState: BlobStateType = {
//     size: initialSize,
//     previousSize: SIZE_PRESETS.EMPTY,
//     animationQueue: initialAnimation,
//     isAnimating: initialAnimation.length > 0,
//   }

//   const [state, dispatch] = useReducer(blobReducer, initialState)

//   useEffect(() => {
//     // Function to process the animation queue
//     const processQueue = async () => {
//       for (const step of state.animationQueue) {
//         await new Promise((resolve) => setTimeout(resolve, step.delay))
//         dispatch({ type: "SET_SIZE", newSize: step.size })
//       }
//       // Signal the end of all animations after processing the queue
//       dispatch({ type: "ANIMATION_END" })
//     }

//     // Trigger the animation process if there are items in the queue
//     if (state.animationQueue.length > 0) {
//       processQueue()
//     }
//   }, [state.animationQueue])

//   const setSize = useCallback(
//     (newSize: SizePresets) => {
//       // Check if there's a need to update the size and if it's different from the current size
//       if (state.previousSize !== newSize && newSize !== state.size) {
//         dispatch({ type: "SET_SIZE", newSize })
//       }
//     },
//     [state, dispatch]
//   )

//   const scheduleAnimation = useCallback(
//     (animationSteps: Array<{ size: SizePresets; delay: number }>) => {
//       dispatch({ type: "SCHEDULE_ANIMATION", animationSteps })
//     },
//     [dispatch]
//   ) // Depend only on stable and expected to change infrequently variables

//   const contextValue = {
//     state, // Contains size, previousSize, and animation status
//     dispatch, // Dispatch actions to update state
//     setSize, // Update size directly, with debounce logic handled internally
//     scheduleAnimation: scheduleAnimation,
//     presets: DynamicIslandSizePresets, // Preset dimensions and styles
//   }

//   return (
//     <BlobContext.Provider value={contextValue}>{children}</BlobContext.Provider>
//   )
// }

// const useScheduledAnimations = (
//   animations: Array<{ size: SizePresets; delay: number }>
// ) => {
//   const { scheduleAnimation } = useDynamicIslandSize()
//   const animationsRef = useRef(animations)

//   useEffect(() => {
//     scheduleAnimation(animationsRef.current)
//   }, [scheduleAnimation])
// }

// // Custom hook to access the context
// const useDynamicIslandSize = () => {
//   const context = useContext(BlobContext)
//   if (!context) {
//     throw new Error(
//       "useDynamicIslandSize must be used within a DynamicIslandProvider"
//     )
//   }
//   return context
// }

// const DynamicIslandContainer = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="z-10 flex h-full w-full items-end justify-center bg-transparent">
//       {children}
//     </div>
//   )
// }

// const DynamicIsland = ({
//   children,
//   id,
//   ...props
// }: {
//   children: ReactNode
//   id: string
// }) => {
//   const willChange = useWillChange()
//   const [screenSize, setScreenSize] = useState("desktop")

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth <= 640) {
//         setScreenSize("mobile")
//       } else if (window.innerWidth <= 1024) {
//         setScreenSize("tablet")
//       } else {
//         setScreenSize("desktop")
//       }
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   return (
//     <DynamicIslandContainer>
//       <DynamicIslandContent
//         id={id}
//         willChange={willChange}
//         screenSize={screenSize}
//         {...props}
//       >
//         {children}
//       </DynamicIslandContent>
//     </DynamicIslandContainer>
//   )
// }

// // Helper function to calculate dimensions
// const calculateDimensions = (
//   size: SizePresets, // This should also ideally be of type SizePresets if it's expecting specific size keys
//   screenSize: string,
//   currentSize: Preset // Correct type here instead of string
// ): { width: string; height: number } => {
//   const isMassiveOnMobile = size === "massive" && screenSize === "mobile"
//   const isUltraOnMobile = size === "ultra" && screenSize === "mobile"

//   if (isMassiveOnMobile) {
//     return { width: "350px", height: MAX_HEIGHT_MOBILE_MASSIVE }
//   }

//   if (isUltraOnMobile) {
//     return { width: "350px", height: MAX_HEIGHT_MOBILE_ULTRA }
//   }

//   const width = min(currentSize.width, MIN_WIDTH)
//   return { width: `${width}px`, height: currentSize.aspectRatio * width }
// }

// const DynamicIslandContent = ({
//   children,
//   id,
//   willChange,
//   screenSize,
//   ...props
// }: {
//   children: React.ReactNode
//   id: string
//   willChange: any // Specify the correct type for willChange if available
//   screenSize: string
//   [key: string]: any // For the rest of the props
// }) => {
//   const { state, presets } = useDynamicIslandSize() // Destructure state from the context
//   const currentSize = presets[state.size] // Use size from the state

//   const dimensions = calculateDimensions(state.size, screenSize, currentSize)

//   return (
//     <motion.div
//       id={id}
//       className="mx-auto h-0 w-0 items-center justify-center border border-black/10 bg-black text-center text-black transition duration-300 ease-in-out focus-within:bg-neutral-900 hover:shadow-md dark:border dark:border-white/5 dark:focus-within:bg-black"
//       animate={{
//         width: dimensions.width,
//         height: dimensions.height,
//         borderRadius: currentSize.borderRadius,
//         transition: {
//           type: "spring",
//           stiffness, // Stiffness and damping values
//           damping,
//         },
//         clipPath: `none`,
//         transitionEnd: {
//           clipPath: `url(#squircle-${state.size})`, // Use size from the state
//         },
//       }}
//       style={{ willChange }}
//       {...props}
//     >
//       <AnimatePresence>{children}</AnimatePresence>
//     </motion.div>
//   )
// }

// /**
//  * Creates an animation step for the DynamicIsland.
//  * @param {string} size - The target size for the blob.
//  * @param {number} delay - The delay in milliseconds before transitioning to the size.
//  * @returns {Object} An object representing an animation step.
//  */

// type DynamicContainerProps = {
//   // id?: string
//   className?: string
//   // size: DynamicIslandSizePresetsType | string
//   children?: React.ReactNode
// }

// const DynamicContainer = ({ className, children }: DynamicContainerProps) => {
//   const willChange = useWillChange()

//   const { state } = useDynamicIslandSize() // Destructure state from the context
//   const { size, previousSize } = state

//   // const previousSize = usePrevious(size);

//   const isSizeChanged = size !== previousSize

//   const initialState = {
//     // Determines the visibility of the component.
//     // If size hasn't changed, component remains fully visible (opacity: 1).
//     // If size has changed, component starts as invisible (opacity: 0).
//     opacity: size === previousSize ? 1 : 0,

//     // Controls the size of the component.
//     // If size hasn't changed, component stays at its normal size (scale: 1).
//     // If size has changed, component starts slightly smaller (scale: 0.9), adding a zoom-in effect.
//     scale: size === previousSize ? 1 : 0.9,

//     // Adjusts the vertical position of the component.
//     // If size hasn't changed, component stays in its original position (y: 0).
//     // If size has changed, component starts 5 pixels down (y: 5), creating a slide-up effect.
//     y: size === previousSize ? 0 : 5,
//   }

//   // Determine the final state for animation.
//   const animateState = {
//     // Component should always animate to being fully visible (opacity: 1).
//     opacity: 1,

//     // Component should animate to its full size (scale: 1), whether it started smaller or not.
//     scale: 1,

//     // Component should animate to its final vertical position (y: 0).
//     y: 0,

//     // Transition settings for the animation.
//     transition: {
//       type: "spring",
//       stiffness: stiffness,
//       damping: damping,

//       // Adjust the duration of the animation based on the size.
//       // If size hasn't changed, use a shorter duration (0.5).
//       // If size has changed, use a longer duration (0.8) for the transition.
//       duration: isSizeChanged ? 0.5 : 0.8,
//     },
//   }

//   return (
//     <motion.div
//       initial={initialState}
//       animate={animateState}
//       exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95, y: 20 }}
//       style={{ willChange }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   )
// }

// type DynamicChildrenProps = {
//   className?: string
//   children?: ReactNode
// }

// const DynamicDiv = ({ className, children }: DynamicChildrenProps) => {
//   const { state } = useDynamicIslandSize()
//   const { size, previousSize } = state
//   const willChange = useWillChange()

//   return (
//     <motion.div
//       initial={{
//         opacity: size === previousSize ? 1 : 0,
//         scale: size === previousSize ? 1 : 0.9,
//       }}
//       animate={{
//         opacity: size === previousSize ? 0 : 1,
//         scale: size === previousSize ? 0.9 : 1,
//         transition: {
//           type: "spring",
//           stiffness: stiffness,
//           damping: damping,
//         },
//       }}
//       exit={{ opacity: 0, filter: "blur(10px)", scale: 0 }}
//       style={{ willChange }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   )
// }

// type MotionProps = {
//   className: string
//   children: ReactNode
// }

// const DynamicTitle = ({ className, children }: MotionProps) => {
//   const { state } = useDynamicIslandSize()
//   const { size, previousSize } = state
//   const willChange = useWillChange()

//   return (
//     <motion.h3
//       className={className}
//       initial={{ opacity: 0, scale: 0 }}
//       animate={{
//         opacity: size === previousSize ? 0 : 1,
//         scale: size === previousSize ? 0.9 : 1,
//         transition: { type: "spring", stiffness: stiffness, damping: damping },
//       }}
//       style={{ willChange }}
//     >
//       {children}
//     </motion.h3>
//   )
// }

// const DynamicDescription = ({ className, children }: MotionProps) => {
//   const { state } = useDynamicIslandSize()
//   const { size, previousSize } = state
//   const willChange = useWillChange()

//   return (
//     <motion.p
//       className={className}
//       initial={{ opacity: 0, scale: 0 }}
//       animate={{
//         opacity: size === previousSize ? 0 : 1,
//         scale: size === previousSize ? 0.9 : 1,
//         transition: { type: "spring", stiffness: stiffness, damping: damping },
//       }}
//       style={{ willChange }}
//     >
//       {children}
//     </motion.p>
//   )
// }

// export {
//   DynamicContainer,
//   DynamicTitle,
//   DynamicDescription,
//   DynamicIsland,
//   SIZE_PRESETS,
//   stiffness,
//   DynamicDiv,
//   damping,
//   DynamicIslandSizePresets,
//   BlobContext,
//   useDynamicIslandSize,
//   useScheduledAnimations,
//   DynamicIslandProvider,
// }

// export default DynamicIsland
