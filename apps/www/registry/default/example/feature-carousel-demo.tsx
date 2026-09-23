"use client";

import { cn } from "@/lib/utils";

import { FeatureCarousel } from "../ui/feature-carousel";

export default function FeatureCarouselDemo() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-[34px] bg-neutral-700 p-2">
        <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
          <FeatureCarousel
            title="Interactive Feature Demo"
            description="Showcase your features with smooth animations and transitions"
            // Example classes for responsive layout
            step1img1Class={cn(
              "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
              "top-[57%] left-[25%] rounded-[24px] max-md:scale-[160%] max-md:rounded-[24px] md:top-[29%] md:left-[35px]",
              "md:group-hover:translate-y-2"
            )}
            step1img2Class={cn(
              "pointer-events-none w-[60%] overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
              "top-[53%] left-[69%] rounded-2xl max-md:scale-[160%] max-md:rounded-[24px] md:top-[21%] md:left-[calc(50%+35px+1rem)]",
              "md:group-hover:-translate-y-6"
            )}
            step2img1Class={cn(
              "pointer-events-none w-[50%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
              "top-[69%] left-[25%] max-md:scale-[160%] md:top-[30%] md:left-[35px]",
              "md:group-hover:translate-y-2"
            )}
            step2img2Class={cn(
              "pointer-events-none w-[40%] overflow-hidden rounded-2xl rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
              "top-[53%] left-[70%] max-md:scale-[140%] md:top-[25%] md:left-[calc(50%+27px+1rem)]",
              "md:group-hover:-translate-y-6"
            )}
            step3imgClass={cn(
              "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
              "top-[50%] left-[5%] md:top-[30%] md:left-[68px]"
            )}
            step4imgClass={cn(
              "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
              "top-[50%] left-[5%] md:top-[30%] md:left-[68px]"
            )}
            // Example images
            image={{
              step1light1: "/feature-1.png",
              step1light2: "/feature-2.png",
              step2light1: "/feature-3.png",
              step2light2: "/feature-4.png",
              step3light: "/feature-2.png",
              step4light: "/feature-5.png",
              alt: "Feature demonstration",
            }}
            // Card styling
            bgClass="bg-gradient-to-tr from-neutral-900/90 to-neutral-800/90"
          />
        </div>
      </div>
    </div>
  );
}

// Add metadata for the registry
// export const metadata = {
//   title: "Feature Carousel",
//   description:
//     "An animated carousel component that showcases features with smooth transitions and interactive elements.",
//   component: FeatureCarouselDemo,
//   source: "https://github.com/your-repo/components/animate/feature-card.tsx",
// }
