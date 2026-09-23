import clsx from "clsx";
import Balancer from "react-wrap-balancer";

import shiftCard from "@/assets/feature-1.png";
import family from "@/assets/feature-2.png";
import carousel from "@/assets/feature-3.png";
import textureFull from "@/assets/feature-4.png";
import buttons from "@/assets/feature-5.png";
import textureCard from "@/assets/texture-card.png";
import { GradientHeading } from "@/registry/default/ui/gradient-heading";

import { FeatureCarousel } from "../animate/feature-card";

export function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden" id="features">
      <div className="p-2">
        <div className="mb-4 pt-4 md:container">
          <div className="mx-auto">
            <div className="mt-1 w-full gap-3 pt-8 pb-12 text-center sm:px-0">
              <div className="mt-2 px-4 text-6xl font-bold tracking-tight text-white dark:text-neutral-100/90">
                <GradientHeading size="xl">
                  Tailwind + Framer + React
                </GradientHeading>
              </div>

              <p className="mt-2 text-xl leading-5 font-bold text-neutral-700 md:text-3xl md:leading-7">
                <Balancer>Everything you need to ship</Balancer>
              </p>
            </div>

            <div className="relative z-10 grid w-full gap-8"></div>

            <div className="rounded-[34px] bg-neutral-700 p-2">
              <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
                <FeatureCarousel
                  step1img1Class={clsx(
                    "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "top-[57%] left-[25%] rounded-[24px] max-md:scale-[160%] max-md:rounded-[24px] md:top-[29%] md:left-[35px]",
                    "md:group-hover:translate-y-2"
                  )}
                  step1img2Class={clsx(
                    "pointer-events-none w-[60%] overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "top-[53%] left-[69%] rounded-2xl max-md:scale-[160%] max-md:rounded-[24px] md:top-[21%] md:left-[calc(50%+35px+1rem)]",
                    "md:group-hover:-translate-y-6"
                  )}
                  step2img1Class={clsx(
                    "pointer-events-none w-[50%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "top-[69%] left-[25%] max-md:scale-[160%] md:top-[30%] md:left-[35px]",
                    "md:group-hover:translate-y-2"
                  )}
                  step2img2Class={clsx(
                    "pointer-events-none w-[40%] overflow-hidden rounded-2xl rounded-t-[24px] border border-stone-100/10 transition-all duration-500 group-hover:-translate-y-6 dark:border-stone-700",
                    "top-[53%] left-[70%] max-md:scale-[140%] md:top-[25%] md:left-[calc(50%+27px+1rem)]",
                    "md:group-hover:-translate-y-6"
                  )}
                  step3imgClass={clsx(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "top-[50%] left-[5%] md:top-[30%] md:left-1/2 md:left-[68px]"
                  )}
                  step4imgClass={clsx(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "top-[50%] left-[5%] md:top-[30%] md:left-1/2 md:left-[68px]"
                  )}
                  description="Make your app 🤌"
                  bgClass="lg:bg-gradient-to-tr"
                  image={{
                    step1light1: family,
                    step1light2: shiftCard,
                    step2light1: carousel,
                    step2light2: textureFull,
                    step3light: textureCard,
                    step4light: buttons,
                    alt: "Something",
                  }}
                  title="Components that pop"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
