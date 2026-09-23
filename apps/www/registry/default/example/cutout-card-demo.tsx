"use client";

import { motion } from "motion/react";

import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  cutoutCardSurfaceClassName,
  CutoutCorner,
  useCutoutContentStaggerVariants,
} from "@/registry/default/ui/cutout-card";

// ============================================================================
// Demo — full-page showcase matching the original single-component layout
// ============================================================================

function CutoutCardDemo() {
  const stagger = useCutoutContentStaggerVariants();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative w-full max-w-md">
        <CutoutCard className={cutoutCardSurfaceClassName}>
          <CutoutCardMedia className="h-72">
            <CutoutCardImage
              alt="Mountain landscape"
              sizes="(max-width: 768px) 100vw, 448px"
              src="/placeholders/apple-wallpaper.jpg"
            />
            <CutoutCardOverlay />
            <CutoutCardInsetLabel className="bg-card bottom-0 left-0 rounded-tr-[20px] px-5 py-3">
              <span className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
                Featured
              </span>
              <CutoutCorner className="text-card absolute -right-[31px] -bottom-px rotate-90" />
              <CutoutCorner className="text-card absolute -top-[31px] -left-px rotate-90" />
            </CutoutCardInsetLabel>
            <CutoutCardPin className="bg-primary text-primary-foreground shadow-foreground/10 ring-border/30 top-0 right-0 rounded-bl-[16px] px-4 py-2 text-sm font-semibold shadow-md ring-1">
              New
              <CutoutCorner
                className="text-primary absolute top-0 -left-[23px] -rotate-90"
                size={24}
              />
              <CutoutCorner
                className="text-primary absolute right-0 -bottom-[23px] -rotate-90"
                size={24}
              />
            </CutoutCardPin>
          </CutoutCardMedia>
          <CutoutCardContent>
            <motion.div
              animate="show"
              className="contents"
              initial="hidden"
              variants={stagger.container}
            >
              <motion.h2
                className="text-card-foreground mb-2 text-xl leading-snug font-semibold text-balance"
                variants={stagger.item}
              >
                Alpine Adventures
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty"
                variants={stagger.item}
              >
                Discover breathtaking mountain landscapes and experience the
                serenity of nature at its finest.
              </motion.p>
              <motion.div variants={stagger.item}>
                <CutoutCardFooter className="border-border/80 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="from-chart-4 to-chart-5 ring-card h-8 w-8 rounded-full bg-linear-to-br shadow-sm ring-2" />
                    <span className="text-card-foreground text-sm font-medium">
                      Sarah Chen
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    5 min read
                  </span>
                </CutoutCardFooter>
              </motion.div>
            </motion.div>
          </CutoutCardContent>
          <CutoutCardAction className="right-5 bottom-5">
            <button
              className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium shadow-md transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              type="button"
            >
              Read More
            </button>
          </CutoutCardAction>
        </CutoutCard>
      </div>
    </div>
  );
}

export default CutoutCardDemo;
