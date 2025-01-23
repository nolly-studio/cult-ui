"use client"

import React, { useState } from "react"
import {
  Battery,
  Bluetooth,
  Calendar,
  Clock,
  Cloud,
  Droplets,
  Fingerprint,
  MapPin,
  MessageSquare,
  Mic,
  ShoppingCart,
  Star,
  Sun,
  Users,
  Video,
  Wind,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/registry/default/ui/expandable"

// _____________________EXAMPLES______________________
function DesignSyncExample() {
  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
      initialDelay={0.2}
      onExpandStart={() => console.log("Expanding meeting card...")}
      onExpandEnd={() => console.log("Meeting card expanded!")}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 320, height: 240 }}
            expandedSize={{ width: 420, height: 480 }}
            hoverToExpand={false}
            expandDelay={200}
            collapseDelay={500}
          >
            <ExpandableCardHeader>
              <div className="flex justify-between items-start w-full">
                <div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 mb-2"
                  >
                    In 15 mins
                  </Badge>
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                    Design Sync
                  </h3>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex flex-col items-start justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>1:30PM → 2:30PM</span>
                </div>

                <ExpandableContent preset="blur-md">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Conference Room A</span>
                  </div>
                </ExpandableContent>
              </div>
              <ExpandableContent preset="blur-md" stagger staggerChildren={0.2}>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                  Weekly design sync to discuss ongoing projects, share updates,
                  and address any design-related challenges.
                </p>
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Attendees:
                  </h4>
                  <div className="flex -space-x-2 overflow-hidden">
                    {["Alice", "Bob", "Charlie", "David"].map((name, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="border-2 border-white dark:border-gray-800">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${name[0]}`}
                                alt={name}
                              />
                              <AvatarFallback>{name[0]}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                  {isExpanded && (
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Open Chat
                    </Button>
                  )}
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                  <span>Weekly</span>
                  <span>Next: Mon, 10:00 AM</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  )
}

export function ProductShowcaseCard() {
  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
      onExpandStart={() => console.log("Expanding product card...")}
      onExpandEnd={() => console.log("Product card expanded!")}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 330, height: 220 }}
            expandedSize={{ width: 500, height: 520 }}
            hoverToExpand={false}
            expandDelay={500}
            collapseDelay={700}
          >
            <ExpandableCardHeader>
              <div className="flex justify-between items-center">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  New Arrival
                </Badge>
                <Badge variant="outline" className="ml-2">
                  $129.99
                </Badge>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-start mb-4">
                <img
                  src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_rd.jpg;maxHeight=640;maxWidth=550;format=webp"
                  alt="Product"
                  className="object-cover rounded-md mr-4"
                  style={{
                    width: isExpanded ? "120px" : "80px",
                    height: isExpanded ? "120px" : "80px",
                    transition: "width 0.3s, height 0.3s",
                  }}
                />
                <div className="flex-1">
                  <h3
                    className="font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300"
                    style={{
                      fontSize: isExpanded ? "24px" : "18px",
                      fontWeight: isExpanded ? "700" : "400",
                    }}
                  >
                    Sony Headphones
                  </h3>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.span
                          key="expanded"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 text-sm text-gray-600 dark:text-gray-400 overflow-hidden whitespace-nowrap"
                        >
                          (128 reviews)
                        </motion.span>
                      ) : (
                        <motion.span
                          key="collapsed"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 text-sm text-gray-600 dark:text-gray-400 overflow-hidden whitespace-nowrap"
                        >
                          (128)
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <ExpandableContent
                preset="fade"
                keepMounted={false}
                animateIn={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
                  Experience crystal-clear audio with our latest
                  noise-cancelling technology. Perfect for work, travel, or
                  relaxation.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Battery, text: "30-hour battery life" },
                    { icon: Bluetooth, text: "Bluetooth 5.0" },
                    { icon: Fingerprint, text: "Touch controls" },
                    { icon: Mic, text: "Voice assistant compatible" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <feature.icon className="w-4 h-4 mr-2" />
                      <span>{feature.text}</span>
                    </div>
                  ))}

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 w-full">
                  <span>Free shipping</span>
                  <span>30-day return policy</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  )
}

export function WeatherForecastCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      <ExpandableTrigger>
        <ExpandableCard
          collapsedSize={{ width: 300, height: 220 }}
          expandedSize={{ width: 500, height: 420 }}
          hoverToExpand={false}
          expandDelay={100}
          collapseDelay={400}
        >
          <ExpandableCardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sun className="w-8 h-8 text-yellow-400 mr-2" />
                <ExpandableContent preset="blur-sm" keepMounted={true}>
                  <h3 className="font-medium text-lg">Today's Weather</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    72°F
                  </Badge>
                </ExpandableContent>
              </div>
            </div>
          </ExpandableCardHeader>

          <ExpandableCardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-2xl font-bold">72°F</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Feels like 75°F
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Sunny</p>
                <ExpandableContent
                  preset="blur-sm"
                  stagger
                  staggerChildren={0.1}
                  keepMounted={true}
                  animateIn={{
                    initial: { opacity: 0, y: 20, rotate: -5 },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    High 78° / Low 65°
                  </p>
                </ExpandableContent>
              </div>
            </div>
            <ExpandableContent
              preset="blur-sm"
              stagger
              staggerChildren={0.1}
              keepMounted={true}
              animateIn={{
                initial: { opacity: 0, y: 20, rotate: -5 },
                animate: { opacity: 1, y: 0, rotate: 0 },
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Humidity</span>
                  </div>
                  <span>45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Wind</span>
                  </div>
                  <span>8 mph</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-gray-400" />
                    <span>Precipitation</span>
                  </div>
                  <span>0%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">5-Day Forecast</h4>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                  <div key={day} className="flex justify-between items-center">
                    <span>{day}</span>
                    <div className="flex items-center">
                      <Sun className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>{70 + index}°F</span>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableContent>
          </ExpandableCardContent>
          <ExpandableCardFooter>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: 5 minutes ago
            </p>
          </ExpandableCardFooter>
        </ExpandableCard>
      </ExpandableTrigger>
    </Expandable>
  )
}

function ControlledExpandableCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleToggle} className="mb-4">
        {isExpanded ? "Collapse" : "Expand"}
      </Button>

      <Expandable
        expanded={isExpanded}
        onToggle={handleToggle}
        expandDirection="vertical"
        expandBehavior="push"
        onExpandStart={() => toast.info("Expanding controlled card...")}
        onExpandEnd={() => toast.info("Controlled card expanded!")}
      >
        <ExpandableCard
          collapsedSize={{ width: 300, height: 100 }}
          expandedSize={{ width: 300, height: 300 }}
        >
          <ExpandableTrigger>
            <ExpandableCardHeader>
              <h3 className="text-lg font-semibold">
                Controlled Expandable Card
              </h3>
              <Badge variant="secondary">
                {isExpanded ? "Expanded" : "Collapsed"}
              </Badge>
            </ExpandableCardHeader>
          </ExpandableTrigger>
          <ExpandableCardContent>
            <p className="mb-4">
              This card's expanded state is controlled externally.
            </p>
            <ExpandableContent preset="fade" stagger staggerChildren={0.1}>
              <p className="mb-2">This content fades in when expanded.</p>
              <p className="mb-2">
                It uses staggered animation for child elements.
              </p>
              <p>The expansion is controlled by the button above.</p>
            </ExpandableContent>
          </ExpandableCardContent>
          <ExpandableCardFooter>
            <ExpandableContent preset="slide-up">
              <p className="text-sm text-gray-500">
                Footer content slides up when expanded
              </p>
            </ExpandableContent>
          </ExpandableCardFooter>
        </ExpandableCard>
      </Expandable>
    </div>
  )
}

export default function ExpandableCardExamples() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col items-center space-y-24">
        <div className="min-h-[480px]">
          <DesignSyncExample />
        </div>
        <div className="flex gap-24 min-h-[600px]">
          <ProductShowcaseCard />
          <WeatherForecastCard />
        </div>
        {/* <div>
        </div> */}
        {/* <div>
          <h2 className="text-xl font-semibold mb-4">Controlled Expandable</h2>
          <ControlledExpandableCard />
        </div> */}
      </div>
    </div>
  )
}
