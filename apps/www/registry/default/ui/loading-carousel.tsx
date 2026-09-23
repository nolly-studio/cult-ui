// npm i embla-carousel-autoplay framer-motion lucide-react
// npx shadcn@latest add carousel
"use client";

import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Tip {
  text: string;
  image: string;
  url?: string;
}

interface LoadingCarouselProps {
  tips?: Tip[];
  className?: string;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  aspectRatio?: "video" | "square" | "wide";
  textPosition?: "top" | "bottom";
  onTipChange?: (index: number) => void;
  backgroundTips?: boolean;
  backgroundGradient?: boolean;
  shuffleTips?: boolean;
}

const defaultTips: Tip[] = [
  {
    text: "Backend snippets. Shadcn style headless components.. but for your backend.",
    image: "/placeholders/cult-snips.png",
    url: "https://www.newcult.co/backend",
  },
  {
    text: "Create your first directory app today. AI batch scripts to process 100s of urls in seconds.",
    image: "/placeholders/cult-dir.png",
    url: "https://www.newcult.co/templates/cult-seo",
  },
  {
    text: "Cult landing page template. Framer motion, shadcn, and tailwind.",
    image: "/placeholders/cult-rune.png",
    url: "https://www.newcult.co/templates/cult-landing-page",
  },
  {
    text: "Vector embeddings, semantic search, and chat based vector retrieval on easy mode.",
    image: "/placeholders/cult-manifest.png",
    url: "https://www.newcult.co/templates/manifest",
  },
  {
    text: "SEO analysis app. Scraping, analysis, insights, and AI recommendations.",
    image: "/placeholders/cult-seo.png",
    url: "https://www.newcult.co/templates/cult-seo",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getTipKey(tip: Tip): string {
  return `${tip.text}-${tip.image}`;
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
};

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
}: LoadingCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips
  );

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: autoplayInterval,
        stopOnInteraction: false,
      }),
    [autoplayInterval]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current
    );

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      setDirection(api.scrollSnapList().indexOf(newIndex) - current);
      onTipChange?.(newIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current, onTipChange]);

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: "easeOut" }
      }
      className={cn(
        "bg-muted mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
        className
      )}
    >
      <div className="w-full overflow-hidden rounded-xl">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="relative w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip) => (
                <CarouselItem key={getTipKey(tip)} className="min-w-0">
                  <motion.div
                    variants={carouselVariants}
                    initial={prefersReducedMotion ? false : "enter"}
                    animate="center"
                    exit={prefersReducedMotion ? undefined : "exit"}
                    custom={direction}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.8, ease: "easeInOut" }
                    }
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <Image
                      src={tip.image}
                      alt={`Visual representation for tip: ${tip.text}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial={prefersReducedMotion ? false : "hidden"}
                        animate="visible"
                        className={`absolute ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        } right-0 left-0 min-w-0 p-4 sm:p-6 md:p-8`}
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block min-w-0 rounded-sm focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                          >
                            <p className="text-center text-base leading-relaxed font-medium tracking-tight text-pretty wrap-break-word text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                              {tip.text}
                            </p>
                          </a>
                        ) : (
                          <p className="text-center text-base leading-relaxed font-medium tracking-tight text-pretty wrap-break-word text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                            {tip.text}
                          </p>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 transition-transform active:scale-[0.96]" />
              <CarouselNext className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 transition-transform active:scale-[0.96]" />
            </>
          )}
        </Carousel>
        <div
          className={cn(
            "bg-muted p-4 sm:p-5",
            showIndicators && !backgroundTips ? "lg:px-4 lg:py-3" : ""
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:items-center",
              showIndicators && !backgroundTips
                ? "sm:flex-col sm:items-start"
                : ""
            )}
          >
            {showIndicators && (
              <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:pb-0">
                {(displayTips || []).map((tip, index) => {
                  const isActive = index === current;
                  const isComplete = index < current;

                  return (
                    <button
                      key={getTipKey(tip)}
                      type="button"
                      className="focus-visible:ring-ring focus-visible:ring-offset-muted flex h-10 min-w-8 flex-1 items-center rounded-full transition-transform focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none active:scale-[0.96] sm:min-w-0 sm:shrink"
                      onClick={() => handleSelect(index)}
                      aria-label={`Go to tip ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="bg-foreground/15 relative h-1 w-full overflow-hidden rounded-full">
                        {showProgress ? (
                          isComplete ? (
                            <span className="bg-foreground/70 absolute inset-0 rounded-full" />
                          ) : isActive ? (
                            <motion.span
                              key={current}
                              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                              animate={{ scaleX: 1 }}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: autoplayInterval / 1000,
                                      ease: "linear",
                                    }
                              }
                              className="bg-foreground/70 absolute inset-0 origin-left rounded-full"
                            />
                          ) : null
                        ) : (
                          <span
                            className={cn(
                              "bg-foreground/70 absolute inset-0 origin-left rounded-full transition-transform",
                              prefersReducedMotion
                                ? "duration-0"
                                : "duration-300 ease-out",
                              isActive ? "scale-x-100" : "scale-x-0"
                            )}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="text-primary flex min-w-0 items-center gap-2">
              {backgroundTips ? (
                <span className="text-sm font-medium whitespace-nowrap tabular-nums">
                  Tip {current + 1}/{displayTips?.length || 0}
                </span>
              ) : (
                <div className="max-w-full min-w-0">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-visible:ring-ring focus-visible:ring-offset-muted block max-w-full rounded-sm text-base leading-tight font-medium tracking-tight text-pretty wrap-break-word focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none lg:text-xl xl:font-semibold"
                    >
                      {displayTips[current]?.text}
                    </a>
                  ) : (
                    <span className="block max-w-full text-base leading-tight font-medium tracking-tight text-pretty wrap-break-word lg:text-2xl xl:font-semibold">
                      {displayTips[current]?.text}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips && (
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingCarousel;
