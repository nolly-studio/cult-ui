"use client";

import React from "react";

import { GradientHeading } from "../ui/gradient-heading";
import LogoCarousel from "../ui/logo-carousel";

export default function LogoCarouselDemo() {
  return (
    <div className="space-y-8 py-24">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="secondary">
            The best are already here
          </GradientHeading>
          <a href="https://www.newcult.co" target="_blank">
            <GradientHeading size="xxl">Join new cult</GradientHeading>
          </a>
        </div>

        <LogoCarousel columnCount={3} />
      </div>
    </div>
  );
}
