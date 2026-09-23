"use client";

import {
  ArrowUpLeftSquareIcon,
  Loader,
  Mail,
  MessageCircle,
  MousePointerClickIcon,
  User,
  Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  SizePresets,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/registry/default/ui/dynamic-island";

const DynamicAction = () => {
  const { state: blobState, setSize } = useDynamicIslandSize();

  const blobStates: SizePresets[] = [
    "compact",
    "large",
    "tall",
    "long",
    "medium",
  ];

  const cycleBlobStates = () => {
    const currentIndex = blobStates.indexOf(blobState.size);
    const nextIndex = (currentIndex + 1) % blobStates.length;
    setSize(blobStates[nextIndex]);
  };

  useScheduledAnimations([
    { size: "compact", delay: 1000 },
    { size: "large", delay: 1200 },
    { size: "tall", delay: 1600 },
    { size: "long", delay: 1800 },
    { size: "medium", delay: 2200 },
  ]);

  // Provide dynamic detail in such a beautiful small place :)
  const renderCompactState = () => (
    <DynamicContainer className="flex h-full w-full items-center justify-center">
      <div className="relative flex w-full items-center">
        <DynamicDescription className="absolute left-4 my-auto text-lg font-medium tracking-tighter text-white">
          <MessageCircle className="h-5 w-5 fill-cyan-400 text-cyan-400" />
        </DynamicDescription>

        <DynamicDescription className="absolute right-4 my-auto text-lg font-bold tracking-tighter text-white">
          newcult.co
        </DynamicDescription>
      </div>
    </DynamicContainer>
  );

  // Great for call to action, popping up in users face :)
  const renderLargeState = () => (
    <DynamicContainer className="flex h-full w-full items-center justify-center">
      <div className="relative flex w-full items-center justify-between gap-6 px-4">
        <Loader className="h-12 w-12 animate-spin text-yellow-300" />

        <DynamicTitle className="my-auto text-2xl font-black tracking-tighter text-white">
          loading
        </DynamicTitle>
      </div>
    </DynamicContainer>
  );

  // Great for user onboarding, forms, etc
  const renderTallState = () => (
    <DynamicContainer className="mt-6 flex w-full flex-col items-start gap-1 px-8 font-semibold">
      <DynamicDescription className="rounded-2xl bg-cyan-300 p-2 leading-5 tracking-tight">
        The Cult of Pythagoras
      </DynamicDescription>
      <DynamicDescription className="rounded-2xl bg-cyan-300 p-2 text-left leading-5 tracking-tight">
        Music of the Spheres, an idea that celestial bodies produce a form of
        music through their movements
      </DynamicDescription>

      <DynamicTitle className="text-4xl font-black tracking-tighter text-cyan-100">
        any cool cults?
      </DynamicTitle>
    </DynamicContainer>
  );

  const renderLongState = () => (
    <DynamicContainer className="flex h-full w-full items-center justify-center">
      <DynamicDiv className="relative flex w-full items-center justify-between gap-6 px-4">
        <div>
          <Waves className="h-8 w-8 text-cyan-400" />
        </div>

        <DynamicTitle className="my-auto text-xl font-black tracking-tighter text-white">
          Supercalifragilisticexpialid
        </DynamicTitle>
      </DynamicDiv>
    </DynamicContainer>
  );

  const renderMediumState = () => (
    <DynamicContainer className="flex h-full flex-col justify-between px-2 pt-4 text-left text-white">
      <DynamicTitle className="pl-3 text-2xl font-black tracking-tighter">
        Reincarnation, welcome back
      </DynamicTitle>
      <DynamicDescription className="pl-3 leading-5 text-neutral-500">
        Good for small tasks or call outs
      </DynamicDescription>

      <DynamicDiv className="mt-auto mb-2 flex flex-col space-y-1 rounded-b-2xl bg-neutral-700 p-2">
        <Button>
          <Mail className="mr-2 h-4 w-4 fill-cyan-400 text-neutral-900" /> Login
          with email
        </Button>

        <Button className="mt-1">
          <User className="mr-2 h-4 w-4 fill-cyan-400 text-cyan-400" /> Join the
          cult now
        </Button>
      </DynamicDiv>
    </DynamicContainer>
  );

  // Render function for other states
  const renderOtherStates = () => (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <ArrowUpLeftSquareIcon className="text-white" />
      </div>
      <p className="text-white">cycle states</p>
    </div>
  );

  // Main render logic based on size
  function renderState() {
    switch (blobState.size) {
      case "compact":
        return renderCompactState();
      case "large":
        return renderLargeState();
      case "tall":
        return renderTallState();
      case "medium":
        return renderMediumState();
      case "long":
        return renderLongState();
      // Optionally add cases for other states as necessary
      default:
        return renderOtherStates();
    }
  }

  return (
    <div className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="absolute top-12 left-12">
          {/* {!blobState.isAnimating ? ( */}
          <Button
            onClick={cycleBlobStates}
            disabled={blobState.isAnimating}
            className="mt-4 max-w-[200px] rounded-md border p-2"
          >
            <MousePointerClickIcon className="mr-1 h-4 w-4" />
            Click to cycle states
          </Button>
          {/* ) : null} */}
        </div>
        <div className="absolute top-1 right-2">
          <div>
            <Badge variant="outline">prev - {blobState.previousSize}</Badge>
            <Badge variant="outline">cur -{blobState.size}</Badge>
          </div>
        </div>

        <DynamicIsland id="dynamic-blob">{renderState()}</DynamicIsland>
      </div>
    </div>
  );
};

export default function DynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize={"default"}>
      <div>
        <DynamicAction />
      </div>
    </DynamicIslandProvider>
  );
}

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

export function FadeIn(props: any) {
  let shouldReduceMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  );
}

export function FadeInStagger({ faster = false, ...props }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
