"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react"
import { AnimatePresence, motion } from "motion/react"

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Utility function to randomly shuffle an array
// This is used to mix up the order of logos for a more dynamic display
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
// This ensures each column has a balanced number of logos
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  // Distribute logos evenly across columns
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  // Ensure all columns have the same number of logos by filling shorter columns
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

// Props for the LogoColumn component
interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000 // Time each logo is displayed (in milliseconds)
    const columnDelay = index * 200 // Stagger the start of each column's animation
    // Calculate which logo should be displayed based on the current time
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)

    // Memoize the current logo to prevent unnecessary re-renders
    const CurrentLogo = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex]
    )

    return (
      // Framer Motion component for the column container
      <motion.div
        className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative"
        initial={{ opacity: 0, y: 50 }} // Start invisible and below final position
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and final position
        transition={{
          delay: index * 0.1, // Stagger the animation of each column
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        {/* AnimatePresence enables animation of components that are removed from the DOM */}
        <AnimatePresence mode="wait">
          {/* Framer Motion component for each logo */}
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            // Animation for when the logo enters
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            // Animation for when the logo is displayed
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            // Animation for when the logo exits
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <CurrentLogo className="w-20 h-20 md:w-32 md:h-32 max-w-[80%] max-h-[80%] object-contain" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

// Main LogoCarousel component
function LogoCarousel({ columnCount = 2 }: { columnCount?: number }) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  // Memoize the array of logos to prevent unnecessary re-renders
  const allLogos: Logo[] = useMemo(
    () => [
      { name: "Apple", id: 1, img: AppleIcon },
      { name: "CEO Supabase", id: 2, img: SupabaseIcon },
      { name: "Vercel", id: 3, img: VercelIcon },
      { name: "Lowes", id: 4, img: LowesIcon },
      { name: "Ally", id: 5, img: AllyLogo },
      { name: "Pierre", id: 6, img: PierreIcon },
      { name: "BMW", id: 7, img: BMWIcon },
      { name: "Claude", id: 8, img: ClaudeAIIcon },
      { name: "Nextjs", id: 9, img: NextjsIcon },
      { name: "Tailwind", id: 10, img: TailwindCSSIcon },
      { name: "Upstash", id: 11, img: UpstashIcon },
      { name: "Typescript", id: 12, img: TypeScriptIcon },
      { name: "Stripe", id: 13, img: StripeIcon },
      { name: "OpenAI", id: 14, img: OpenAIIconBlack },
    ],
    []
  )

  // Distribute logos across columns when the component mounts
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos])

  // Function to update the current time (used for logo cycling)
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Set up an interval to update the time every 100ms
  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Render the logo columns
  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="209"
      height="256"
      viewBox="0 0 814 1000"
      {...props}
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

function PierreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 74 20"
      width={74}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        // fill="var(--color-fg)"
        fill="black"
        d="M2 0a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V2a2 2 0 00-2-2H2zm33.134 14.398h-2.502V16h6.714v-1.602h-2.502V8.152c0-.384-.096-.666-.288-.846-.192-.192-.468-.288-.828-.288h-2.52V8.62h1.926v5.778zm-.342-9.108c.264.228.594.342.99.342s.726-.12.99-.36.396-.546.396-.918a1.11 1.11 0 00-.414-.9c-.264-.24-.594-.36-.99-.36-.384 0-.708.12-.972.36-.252.228-.378.528-.378.9 0 .384.126.696.378.936zm-12.55-1.98V16h1.926v-4.14h2.016c1.812 0 3.156-.324 4.032-.972.888-.648 1.332-1.752 1.332-3.312 0-1.044-.204-1.878-.612-2.502-.396-.636-.99-1.086-1.782-1.35-.78-.276-1.77-.414-2.97-.414h-3.942zm1.926 6.894V4.966h2.088c.732 0 1.338.072 1.818.216.492.144.87.408 1.134.792.276.372.414.906.414 1.602 0 .708-.138 1.254-.414 1.638-.264.384-.642.648-1.134.792-.48.132-1.086.198-1.818.198h-2.088zm24.622 1.674h-7.034c.031.82.258 1.486.68 1.998.456.552 1.11.828 1.962.828.708 0 1.278-.162 1.71-.486.432-.324.726-.78.882-1.368h1.836c-.204.984-.666 1.788-1.386 2.412-.708.612-1.71.918-3.006.918-.96 0-1.782-.204-2.466-.612a4.058 4.058 0 01-1.53-1.71c-.348-.72-.522-1.536-.522-2.448 0-.948.18-1.764.54-2.448a3.817 3.817 0 011.548-1.566c.672-.372 1.44-.558 2.304-.558.912 0 1.704.174 2.376.522a3.595 3.595 0 011.548 1.53c.372.66.558 1.446.558 2.358v.63zm-2.52-2.88c-.48-.48-1.128-.72-1.944-.72-.504 0-.954.108-1.35.324-.384.216-.69.534-.918.954a2.879 2.879 0 00-.31 1.116h5.232c-.05-.703-.286-1.26-.71-1.674zm4.554-1.656c-.216.216-.324.54-.324.972V16h1.854V8.62h4.716V7.018h-5.238c-.456 0-.792.108-1.008.324zm7.331.972c0-.432.108-.756.324-.972.216-.216.552-.324 1.008-.324h5.238V8.62H60.01V16h-1.854V8.314zm8.748 3.564h7.034v-.63c0-.912-.186-1.698-.558-2.358a3.595 3.595 0 00-1.548-1.53c-.672-.348-1.464-.522-2.376-.522-.864 0-1.632.186-2.304.558-.66.36-1.176.882-1.548 1.566-.36.684-.54 1.5-.54 2.448 0 .912.174 1.728.522 2.448.348.72.858 1.29 1.53 1.71.684.408 1.506.612 2.466.612 1.296 0 2.298-.306 3.006-.918.72-.624 1.182-1.428 1.386-2.412h-1.836c-.156.588-.45 1.044-.882 1.368-.432.324-1.002.486-1.71.486-.852 0-1.506-.276-1.962-.828-.423-.511-.65-1.178-.68-1.998zm5.224-1.206h-5.232c.035-.42.139-.793.31-1.116.228-.42.534-.738.918-.954a2.773 2.773 0 011.35-.324c.816 0 1.464.24 1.944.72.424.413.66.971.71 1.674z"
      />
    </svg>
  )
}

function BMWIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 498.503 498.503"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M249.251 498.503c66.577 0 129.168-25.928 176.247-73.005 47.077-47.078 73.005-109.67 73.005-176.247 0-66.576-25.928-129.168-73.005-176.246C378.42 25.927 315.828 0 249.251 0 111.813 0 0 111.813 0 249.251c0 66.577 25.927 129.169 73.005 176.247 47.078 47.077 109.67 73.005 176.246 73.005z" />
      <path
        d="M8.624 249.251c0-64.272 25.03-124.699 70.479-170.148 45.449-45.45 105.875-70.479 170.148-70.479s124.7 25.029 170.148 70.479c45.449 45.449 70.479 105.875 70.479 170.148 0 132.683-107.945 240.628-240.627 240.628-64.273 0-124.699-25.03-170.148-70.479C33.654 373.95 8.624 313.524 8.624 249.251z"
        fill="#fff"
      />
      <path d="M249.251 18.541c-127.416 0-230.71 103.294-230.71 230.71s103.294 230.711 230.71 230.711c127.416 0 230.71-103.295 230.71-230.711s-103.294-230.71-230.71-230.71z" />
      <path
        d="M249.251 396.621c-81.389 0-147.37-65.98-147.37-147.37 0-81.389 65.981-147.37 147.37-147.37 81.389 0 147.37 65.981 147.37 147.37 0 81.39-65.98 147.37-147.37 147.37z"
        fill="#fff"
      />
      <path d="M111.362 249.251h137.889V111.362c-76.153 0-137.889 61.737-137.889 137.889zm137.889 0v137.89c76.153 0 137.889-61.736 137.889-137.89H249.251z" />
      <path
        d="M140.952 108.643c-4.885-4.748-12.436-6.179-19.525-1.784 1.354-3.509.801-7.09.082-9.066-3.054-5.569-4.12-6.266-6.637-8.378-8.148-6.837-16.723-1-22.856 6.309l-29.632 35.313 46.581 39.087 31.249-37.24c7.14-8.509 8.244-16.945.738-24.241zm116.018-16.78l15.997-42.401v42.401h12.158V31.137h-18.267l-16.615 43.479h.172L233.8 31.137h-18.266v60.726h12.157V49.462l15.998 42.401h13.281zm163.46 25.264l-22.89 32.407 35.486-16.847 9.396 11.603-55.854 27.075-11.027-13.727 21.969-32.123-.13-.161-35.989 14.81-11.135-13.64 38.097-49.004 9.396 11.603-23.857 31.208 36.458-15.652 10.08 12.448z"
        fill="#fff"
      />
      <path d="M98.491 104.464c2.062-2.458 6.722-2.357 9.719.157 3.295 2.765 3.303 6.685 1.09 9.321l-17.597 20.971-11.01-9.239 17.798-21.21zm31.309 24.739l-18.553 22.11-11.634-9.762 18.703-22.29c2.112-2.517 6.821-3.25 9.997-.584 3.595 3.015 3.951 7.59 1.487 10.526z" />
    </svg>
  )
}

function LowesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={91.239998}
      height={42.970001}
      {...props}
    >
      <defs>
        <clipPath>
          <path d="M22.8 704.934h119.143V768.6H22.8v-63.666z" />
        </clipPath>
      </defs>
      <g fillOpacity={1} fillRule="nonzero" stroke="none">
        <path
          d="M155.876 378.285l-23.048 9.873h-14.376v4.027h-7.201v27.07h89.24v-27.07h-7.198v-4.027h-14.37l-23.047-9.873z"
          fill="#004990"
          transform="translate(-110.251 -377.285)"
        />
        <path
          d="M177.157 395.357v4.377l2.83.005.59-4.38-3.42-.001zM192.465 399.15c.183 0 .348-.014.348-.237 0-.175-.163-.207-.313-.207h-.295v.443h.26zm-.26.802h-.216v-1.43h.545c.336 0 .504.125.504.407 0 .257-.159.368-.369.394l.406.629h-.242l-.378-.62h-.25v.62zm.263.32c.561 0 1.004-.439 1.004-1.038 0-.587-.443-1.03-1.004-1.03-.569 0-1.011.443-1.011 1.03 0 .599.442 1.038 1.011 1.038m-1.261-1.038c0-.712.577-1.237 1.261-1.237.676 0 1.255.525 1.255 1.237 0 .718-.579 1.245-1.255 1.245-.684 0-1.261-.527-1.261-1.245M125.486 410.27v-14.913h-4.079v18.465h10.39v-3.551h-6.31zM166.547 413.822h9.709v-3.556h-5.61v-2.317h5.61v-3.424h-5.61v-2.33h5.61v-3.571h-9.71V413.822zM141.12 402.195h-3.588v8.057h3.588v-8.057zm4.086 9.687a1.942 1.942 0 01-1.941 1.94h-7.879c-1.071 0-1.94-.87-1.94-1.94v-11.317a1.94 1.94 0 011.94-1.941h7.879a1.94 1.94 0 011.941 1.941v11.317zM160.128 398.624v11.647h-2.463v-11.647h-3.587v11.647h-2.463v-11.647h-4.086v13.257c0 1.072.869 1.942 1.941 1.942h4.83c.814 0 1.572-.562 1.572-1.376 0 .814.757 1.376 1.571 1.376h4.831c1.071 0 1.94-.87 1.94-1.942v-13.257h-4.086zM190.578 408.08h.001l-.025-.052-.048-.097-.025-.05c-.647-1.296-2.094-2.378-4.424-3.31l-.083-.032c-.46-.181-1.865-.73-2.02-1.623-.043-.25.058-.642.337-.88.293-.3.743-.453 1.337-.453.95 0 2.03.388 2.59.62 1.179.488 2.213.925 2.223.93l.102.043v-3.317l-.034-.021c-.022-.015-2.25-1.42-4.502-1.743a8.82 8.82 0 00-.761-.032c-2.073 0-3.643.752-4.665 2.237-.86 1.22-.954 3.151-.224 4.593.939 1.628 2.444 2.308 3.9 2.967.6.27 1.221.553 1.802.898l.006.004c.658.395.993.998.854 1.535-.144.556-.78.93-1.584.93-.11 0-.22-.006-.33-.022l-.038-.005c-1.547-.215-4.682-1.382-4.713-1.395l-.1-.037v3.637l.051.018c.03.01 3.064 1.015 5.758 1.015 1.47 0 2.58-.296 3.298-.879.018-.012 1.664-1.336 1.737-3.587.02-.623-.122-1.26-.42-1.893"
          fill="#fff"
          transform="translate(-110.251 -377.285)"
        />
      </g>
    </svg>
  )
}

function AllyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 556.10669 317.57333"
      height={317.57333}
      width={556.10669}
      xmlSpace="preserve"
      {...props}
    >
      <g fill="#231f20" fillOpacity={1} fillRule="nonzero" stroke="none">
        <path
          d="M548.344 1859.51c-384.121-81.02-686.297-521.93-483.106-981.428C187.582 619.078 442.133 491.941 622.191 482.43c71.602 77.968 295.704 316.23 370.196 396.949-300.801 0-363.321-7.598-428.965 28.211-230.047 125.42-233.309 455.81 42.637 555.5 159.511 49.79 388.398-48.7 388.398-308.76 0-94.52 2.363 1.73-1.484-274.951v-369.82h402.417v677.571c0 379.6-351.94 762.81-847.046 672.38M2201.24 509.27h417.51v1872.51h-417.51V509.27M1581.44 509.27h417.73v1872.51h-417.73V509.27M3734.44 1856.48l-272.31-824.55-285.58 824.55h-436.43L3249.3 509.27 3039.13 0h433.84l697.87 1856.48h-436.4M4023.77 533.082c-67.59 0-119.23 53.348-119.23 123.859 0 69.161 51.64 122.34 119.23 122.34 66.78 0 118.48-53.179 118.48-122.34 0-70.511-51.7-123.859-118.48-123.859zm0 267.387c-79.1 0-145.46-62.098-145.46-143.528 0-82.863 66.36-145.05 145.46-145.05 78.75 0 144.71 62.187 144.71 145.05 0 81.43-65.96 143.528-144.71 143.528"
          transform="matrix(1.33333 0 0 -1.33333 0 317.573) scale(.1)"
        />
        <path
          d="M4021.12 665.809h-27.4v53.55h34.68c17.76 0 37.09-3.32 37.09-25.738 0-26.551-21.29-27.812-44.37-27.812zm70.6 26.613c0 32.34-18.9 48.168-59.08 48.168h-65.27V572.031h26.35v72.617h27.77l45.98-72.617h28.12l-48.26 74.559c25.02 2.691 44.39 15.34 44.39 45.832"
          transform="matrix(1.33333 0 0 -1.33333 0 317.573) scale(.1)"
        />
      </g>
    </svg>
  )
}

function VercelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 222"
      width="256"
      height="222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path fill="#000" d="m128 0 128 221.705H0z" />
    </svg>
  )
}

const StripeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={214}
    viewBox="0 0 512 214"
    {...props}
  >
    <path
      fill="#FFC957"
      d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"
    />
  </svg>
)

const TypeScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    width={256}
    height={256}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="#3178C6"
    />
    <path
      d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      fill="#FFF"
    />
  </svg>
)

const ClaudeAIIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 512 512"
    width={512}
    height={512}
    {...props}
  >
    <rect fill="#CC9B7A" width={512} height={512} rx={104.187} ry={105.042} />
    <path
      fill="#1F1F1E"
      fillRule="nonzero"
      d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
    />
  </svg>
)

function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 113"
      width="109"
      height="113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#a)"
      />
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#b)"
        fillOpacity=".2"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="a"
          x1="53.974"
          y1="54.974"
          x2="94.163"
          y2="71.829"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="36.156"
          y1="30.578"
          x2="54.484"
          y2="65.081"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function OpenAIIconBlack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="260"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 260"
      {...props}
    >
      <path
        className="fill-black"
        d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
      />
    </svg>
  )
}

function UpstashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 256 341"
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="341"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="#00C98D"
        d="M0 298.417c56.554 56.553 148.247 56.553 204.801 0 56.554-56.554 56.554-148.247 0-204.801l-25.6 25.6c42.415 42.416 42.415 111.185 0 153.6-42.416 42.416-111.185 42.416-153.601 0L0 298.416Z"
      />
      <path
        fill="#00C98D"
        d="M51.2 247.216c28.277 28.277 74.123 28.277 102.4 0 28.277-28.276 28.277-74.123 0-102.4l-25.6 25.6c14.14 14.138 14.14 37.061 0 51.2-14.138 14.139-37.061 14.139-51.2 0l-25.6 25.6ZM256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
      />
      <path
        fill="#00C98D"
        d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
      />
      <path
        fill="#FFF"
        fillOpacity=".4"
        d="M256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
      />
      <path
        fill="#FFF"
        fillOpacity=".4"
        d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
      />
    </svg>
  )
}

const TailwindCSSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 54 33"
    {...props}
  >
    <g clipPath="url(#prefix__clip0)">
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h54v32.4H0z" />
      </clipPath>
    </defs>
  </svg>
)

const NextjsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={180}
    height={180}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_408_139"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={180}
      height={180}
    >
      <circle cx={90} cy={90} r={90} fill="black" />
    </mask>
    <g mask="url(#mask0_408_139)">
      <circle
        cx={90}
        cy={90}
        r={87}
        fill="black"
        stroke="white"
        strokeWidth={6}
      />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_408_139)"
      />
      <rect
        x={115}
        y={54}
        width={12}
        height={72}
        fill="url(#paint1_linear_408_139)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_408_139"
        x1={109}
        y1={116.5}
        x2={144.5}
        y2={160.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_408_139"
        x1={121}
        y1={54}
        x2={120.799}
        y2={106.875}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)

export { LogoCarousel }
export default LogoCarousel
