"use client"

import React, {
  MouseEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const TimelineContext = createContext(null)

const useTimeline = () => {
  const context = useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimeline must be used within a TimelineProvider")
  }
  return context
}

const TimelineProvider = ({ children, events }) => {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const controls = useAnimation()
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.1, once: false })

  useEffect(() => {
    controls.start({
      opacity: inView ? 1 : 0,
      x: inView ? 0 : -100,
      scale: inView ? 1 : 0.8,
      rotate: inView ? 0 : -10,
      filter: inView ? "blur(0px)" : "blur(2px)",
    })
  }, [controls, inView])

  return (
    <TimelineContext.Provider
      value={{
        expandedIndex,
        setExpandedIndex,
        controls,
        isMobile,
        inView,
        ref,
      }}
    >
      {children}
    </TimelineContext.Provider>
  )
}

const TimelineEvent = ({
  index,
  label,
  position,
  status,
  isAbove,
  timelineEvent,
}) => {
  const { expandedIndex, setExpandedIndex, controls, isMobile, inView } =
    useTimeline()
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-100, 100], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  })
  const translateX = useSpring(useTransform(x, [-100, 100], [-1, 1]), {
    stiffness: 300,
    damping: 30,
  })
  const swing = useSpring(0, { stiffness: 80, damping: 4 })
  const initialSwing = useSpring(0, { stiffness: 80, damping: 4 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const halfWidth = event.currentTarget.offsetWidth / 2
      const offset = event.nativeEvent.offsetX - halfWidth + 10
      x.set(offset)
      swing.set(offset * 0.05)
    }
  }

  const handleClick = () => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const getOffsetStyle = () => {
    let offset = 0
    if (isMobile) {
      offset = 100
      return isAbove ? { top: `${offset}px` } : { bottom: `${offset}px` }
    }
    if (timelineEvent.gif || timelineEvent.image) {
      offset = 120 - label.length * 1.5
    }
    return isAbove ? { top: `${offset}px` } : { bottom: `${offset}px` }
  }

  const offsetStyle = getOffsetStyle()
  const hangingTransform = { translateX, x: swing }

  useEffect(() => {
    if (inView) {
      const initialAngle = 12
      initialSwing.set(initialAngle)
      const initialSwingTimeout = setTimeout(() => {
        initialSwing.set(-initialAngle / 2)
        swing.set(-20)
      }, 500)
      return () => clearTimeout(initialSwingTimeout)
    }
  }, [inView, swing, index])

  return (
    <>
      <motion.div
        className="flex items-center relative py-16"
        custom={index}
        initial={{
          opacity: 0,
          x: -100,
          scale: 0.8,
          rotate: isAbove ? -10 : 10,
          filter: "blur(2px)",
        }}
        animate={controls}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        onAnimationComplete={() => initialSwing.set(0)}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ ...offsetStyle, ...hangingTransform, translateX, rotate }}
          className="absolute flex justify-center -ml-6 md:-ml-9 w-24 md:w-36 cursor-pointer"
        >
          <motion.div
            style={{ rotate: initialSwing }}
            className="dark"
            layoutId={`${label}-${status}`}
          >
            <TimelineLabel {...timelineEvent} />
          </motion.div>
        </motion.div>
        <CheckIcon
          className={cn(
            "text-white rounded-full p-1.5 transition-transform duration-300",
            status === "active"
              ? "bg-black/90 transform scale-125 stroke-cyan-400"
              : "bg-gray-300",
            status === "current" ? "bg-cyan-400 stroke-black" : ""
          )}
        />
        {position !== "last" && (
          <div
            className={cn(
              "h-0.5 w-12 sm:hidden md:block md:w-24 lg:w-28 xl:w-36 -mr-1 transition-colors duration-300",
              status === "active" ? "bg-black/90" : "bg-gray-300"
            )}
          />
        )}
      </motion.div>
      <AnimatePresence>
        {expandedIndex === index &&
          (timelineEvent.image || timelineEvent.gif) && (
            <motion.div
              layout
              key={`${label}-${status}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
              onClick={() => setExpandedIndex(null)}
            >
              <motion.img
                layoutId={`${label}-${status}`}
                className="max-w-[800px] rounded-md"
                src={timelineEvent.image || timelineEvent.gif}
                alt={label}
              />
            </motion.div>
          )}
      </AnimatePresence>
    </>
  )
}

const Timeline = ({ events }) => {
  return (
    <TimelineProvider events={events}>
      <div
        className="flex flex-col items-center justify-center py-12"
        ref={useTimeline().ref}
      >
        <div className="flex items-center space-x-1">
          {events.map((timelineEvent, index) => (
            <TimelineEvent
              key={`${timelineEvent.label}-${index}`}
              index={index}
              label={timelineEvent.label}
              position={
                index === 0
                  ? "first"
                  : index === events.length - 1
                  ? "last"
                  : "middle"
              }
              status={timelineEvent.status}
              isAbove={timelineEvent.isAbove}
              timelineEvent={timelineEvent}
            />
          ))}
        </div>
      </div>
    </TimelineProvider>
  )
}

const TimelineLabel = ({ label, gif, image, price, status, date }) => {
  const isCurrent = status === "current"

  return (
    <Card className="p-0 shadow-xl rounded-[8px] dark:bg-neutral-800 bg-white no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/80">
      <CardHeader className="tracking-tight p-0 space-y-0">
        <CardTitle className="px-2 pt-1 pb-0 leading-4 text-white">
          {label}
        </CardTitle>
        <div className="px-2 text-semibold text-white flex justify-between items-start w-full">
          <CardDescription
            className={cn(
              status === "active" ? "line-through" : "",
              "text-semibold text-white"
            )}
          >
            {isCurrent ? <span className="text-cyan-400">{price}</span> : price}
          </CardDescription>
          <CardDescription>{date}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {(gif || image) && (
          <img
            src={image || gif}
            className="hidden md:block h-24 rounded-b-[8px]"
          />
        )}
      </CardContent>
    </Card>
  )
}

export { Timeline, TimelineEvent, TimelineLabel }
export default Timeline

// "use client"

// import React, { MouseEvent, useEffect, useState } from "react"
// import {
//   AnimatePresence,
//   AnimationControls,
//   motion,
//   useAnimation,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "framer-motion"
// import { CheckIcon } from "lucide-react"

// // import { useInView } from "react-intersection-observer"

// import { cn } from "@/lib/utils"
// // import { useIsMobile } from "@/hooks/use-is-mobile"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { GradientHeading } from "./gradient-heading"

// const easing = [0.6, -0.05, 0.01, 0.99]
// const springConfig = { stiffness: 300, damping: 30 }
// const swingConfig = { stiffness: 80, damping: 4 }

// type TimelineEventProps = {
//   label: string
//   position: "first" | "middle" | "last"
//   status: "active" | "current" | "inactive"
//   animate: AnimationControls
//   isAbove: boolean
//   index: number
//   expandedIndex: number | null
//   isMobile: boolean
//   setExpandedIndex: (index: number | null) => void
//   timelineEvent: {
//     label: string
//     status: "active" | "current" | "inactive"
//     date?: string
//     isAbove: boolean
//     gif?: string
//     image?: string
//     price: string
//   }
//   inView: boolean
// }

// const TimelineEvent: React.FC<TimelineEventProps> = ({
//   label,
//   position,
//   status,
//   animate,
//   isAbove,
//   index,
//   expandedIndex,
//   isMobile,
//   setExpandedIndex,
//   timelineEvent,
//   inView,
// }) => {
//   console.log(
//     `Rendering TimelineEvent: ${label}, isMobile: ${isMobile}, inView: ${inView}`
//   )

//   const x = useMotionValue(0)
//   const rotate = useSpring(
//     useTransform(x, [-100, 100], [-12, 12]),
//     springConfig
//   )
//   const translateX = useSpring(
//     useTransform(x, [-100, 100], [-1, 1]),
//     springConfig
//   )
//   const swing = useSpring(0, swingConfig)
//   const initialSwing = useSpring(0, swingConfig)

//   const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
//     if (!isMobile) {
//       const halfWidth = event.currentTarget.offsetWidth / 2
//       const offset = event.nativeEvent.offsetX - halfWidth + 10
//       console.log(`Mouse move offset: ${offset}`)
//       x.set(offset)
//       swing.set(offset * 0.05)
//     }
//   }

//   const handleClick = () => {
//     console.log(`Clicked: ${label}`)
//     setExpandedIndex(expandedIndex === index ? null : index)
//   }

//   const getOffsetStyle = () => {
//     let offset = 0
//     if (isMobile) {
//       offset = 100
//       const result = isAbove
//         ? { top: `${offset}px` }
//         : { bottom: `${offset}px` }
//       console.log(`Offset style (mobile):`, result)
//       return result
//     }

//     if (timelineEvent.gif || timelineEvent.image) {
//       offset = 120 - label.length * 1.5
//     }

//     const result = isAbove ? { top: `${offset}px` } : { bottom: `${offset}px` }
//     console.log(`Offset style:`, result)
//     return result
//   }

//   const offsetStyle = getOffsetStyle()
//   const hangingTransform = { translateX, x: swing }

//   useEffect(() => {
//     if (inView) {
//       const initialAngle = 12
//       initialSwing.set(initialAngle)

//       const initialSwingTimeout = setTimeout(() => {
//         initialSwing.set(-initialAngle / 2)
//         swing.set(-20)
//       }, 500)

//       return () => clearTimeout(initialSwingTimeout)
//     }
//   }, [inView, swing, index])

//   return (
//     <>
//       <motion.div
//         className="flex items-center relative py-16"
//         custom={index}
//         initial={{
//           opacity: 0,
//           x: -100,
//           scale: 0.8,
//           rotate: isAbove ? -10 : 10,
//           filter: "blur(2px)",
//         }}
//         animate={animate}
//         transition={{ duration: 0.8, delay: index * 0.2, ease: easing }}
//         onAnimationComplete={() => {
//           initialSwing.set(0)
//           console.log(`Animation complete for: ${label}`)
//         }}
//       >
//         <motion.div
//           onMouseMove={handleMouseMove}
//           onClick={handleClick}
//           style={{ ...offsetStyle, ...hangingTransform, translateX, rotate }}
//           className="absolute flex justify-center -ml-6 md:-ml-9 w-24 md:w-36 cursor-pointer"
//         >
//           <motion.div
//             style={{ rotate: initialSwing }}
//             className="dark"
//             layoutId={`${label}-${status}`}
//           >
//             <TimelineLabel
//               status={status}
//               label={timelineEvent.label}
//               gif={timelineEvent.gif}
//               image={timelineEvent.image}
//               price={timelineEvent.price}
//               date={timelineEvent.date}
//             />
//           </motion.div>
//         </motion.div>
//         <CheckIcon
//           className={cn(
//             "text-white rounded-full p-1.5 transition-transform duration-300",
//             status === "active"
//               ? "bg-black/90 transform scale-125 stroke-cyan-400"
//               : "bg-gray-300",
//             status === "current" ? "bg-cyan-400 stroke-black" : ""
//           )}
//         />
//         {position !== "last" && (
//           <div
//             className={cn(
//               "h-0.5 w-12 sm:hidden md:block md:w-24 lg:w-28 xl:w-36 -mr-1 transition-colors duration-300",
//               status === "active" ? "bg-black/90" : "bg-gray-300"
//             )}
//           />
//         )}
//       </motion.div>
//       <AnimatePresence>
//         {expandedIndex === index &&
//         (timelineEvent.image || timelineEvent.gif) ? (
//           <motion.div
//             layout
//             key={`${label}-${status}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50"
//             onClick={() => setExpandedIndex(null)}
//           >
//             <motion.img
//               layoutId={`${label}-${status}`}
//               className=" max-w-[800px] rounded-md"
//               src={timelineEvent.image || timelineEvent.gif}
//               alt={label}
//             />
//           </motion.div>
//         ) : null}
//       </AnimatePresence>
//     </>
//   )
// }

// type TimelineProps = {
//   events: TimelineEventProps["timelineEvent"][]
//   isMobile: boolean
// }

// const Timeline: React.FC<TimelineProps> = ({ events, isMobile }) => {
//   const controls = useAnimation()
//   const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false })
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

//   useEffect(() => {
//     controls.start({
//       opacity: inView ? 1 : 0,
//       x: inView ? 0 : -100,
//       scale: inView ? 1 : 0.8,
//       rotate: inView ? 0 : -10,
//       filter: inView ? "blur(0px)" : "blur(2px)",
//     })
//   }, [controls, inView])

//   return (
//     <div className="flex flex-col items-center justify-center py-12" ref={ref}>
//       <div className="flex items-center space-x-1">
//         {events.map((timelineEvent, index) => (
//           <TimelineEvent
//             inView={inView}
//             key={`${timelineEvent.label}-${index}`}
//             label={timelineEvent.label}
//             timelineEvent={timelineEvent}
//             position={
//               index === 0
//                 ? "first"
//                 : index === events.length - 1
//                 ? "last"
//                 : "middle"
//             }
//             status={timelineEvent.status}
//             index={index}
//             animate={controls}
//             isAbove={timelineEvent.isAbove}
//             expandedIndex={expandedIndex}
//             setExpandedIndex={setExpandedIndex}
//             isMobile={isMobile}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// const events = [
//   {
//     label: "Manifest",
//     status: "active",
//     date: "Feb, 24",
//     isAbove: false,
//     gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWVwNXVkdXM3aWM4NXM2a2s2czFhd283NHdrbWFsdm43bGdsMXp4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SM08k77xWhQtQDDluI/giphy.gif",
//     price: "$75",
//   },
//   {
//     label: "Landing Page",
//     status: "active",
//     date: "March, 24",
//     isAbove: true,
//     gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGV2MWMzY2I4eW45NThuMWJ0enpsY2tyenZkNTJtNjk4am5hb2FmMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lmXonZXi4HBJldN0rt/giphy-downsized-large.gif",
//     price: "$45",
//   },
//   {
//     label: "Cult SEO",
//     status: "active",
//     date: "May, 24",
//     isAbove: false,
//     price: "$105",
//     gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmthd283MHdqYTAzNjFzZXptbGg2MGIzY3RudzBsdDdveGsxdG9haCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w1LYqDDIpDaLKj6N5t/giphy.gif",
//   },

//   {
//     label: "Travel Stash",
//     status: "active",
//     date: "May, 24",
//     isAbove: true,
//     image: "/travel-stash1.png",
//     price: "$95",
//   },
//   {
//     label: "Cult Directory",
//     status: "current",
//     date: "June, 24",
//     isAbove: false,
//     price: "$119",
//     gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam4xMmVqZGVuaG05cDhxaWM2bDlwaWJ2OXVrN3E2aG54bDdjam1hZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7bzrBMHEsgPb20T3C5/giphy.gif",
//   },
//   {
//     label: "Coming Soon",
//     status: "inactive",
//     isAbove: true,
//     price: "$179",
//   },
//   {
//     label: "Next Month",
//     status: "inactive",
//     isAbove: false,
//     price: "$229",
//   },
// ]

// const PricingTimeline: React.FC = () => {
//   const isMobile = useIsMobile()
//   const usedEvents = isMobile
//     ? events.slice(events.length - 5, events.length - 1)
//     : events

//   return (
//     <div className="py-8 pt-24 flex flex-col items-center justify-center overflow-hidden">
//       <GradientHeading>Previous Releases</GradientHeading>
//       <div className="md:flex flex-col items-center justify-center md:py-8 pt-20 w-full">
//         <div className="md:py-8">
//           <div className="h-full md:flex flex-col items-start justify-center w-full">
//             <Timeline events={usedEvents} isMobile={isMobile} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// type TimelineLabelProps = {
//   label: string
//   gif?: string
//   image?: string
//   price: string
//   status: "active" | "current" | "inactive"
//   date?: string
// }

// const TimelineLabel: React.FC<TimelineLabelProps> = ({
//   label,
//   gif,
//   image,
//   price,
//   status,
//   date,
// }) => {
//   const isCurrent = status === "current"

//   return (
//     <Card
//       className={cn(
//         "p-0 shadow-xl rounded-[8px] dark:bg-neutral-800 bg-white no-underline  transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
//       )}
//     >
//       <CardHeader className="tracking-tight p-0 space-y-0">
//         <CardTitle className="px-2 pt-1 pb-0 leading-4 text-white">
//           {label}
//         </CardTitle>
//         <div className=" px-2 text-semibold text-white flex justify-between items-start w-full">
//           <CardDescription
//             className={cn(
//               status === "active" ? "line-through" : "",
//               "text-semibold text-white "
//             )}
//           >
//             {isCurrent ? <span className="text-cyan-400">{price}</span> : price}
//           </CardDescription>
//           <CardDescription>{date}</CardDescription>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">
//         {gif || image ? (
//           <img
//             src={image || gif}
//             className="hidden md:block h-24 rounded-b-[8px]"
//           />
//         ) : null}
//       </CardContent>
//     </Card>
//   )
// }

// export default PricingTimeline
