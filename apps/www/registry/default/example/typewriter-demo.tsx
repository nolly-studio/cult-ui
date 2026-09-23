"use client";

import { ReactNode } from "react";

import { Typewriter } from "../ui/typewriter";

const texts = [
  "Testing 124",
  "Look at newcult.co",
  "and check gnow.io",
  "Sick af",
];

export default function TypewriterDemo() {
  return (
    <IosOgShellCard>
      <div className="mb-3 ml-auto rounded-2xl bg-blue-500 px-4 py-2 text-white">
        <p className="text-base-900 truncate text-sm font-semibold md:text-base">
          <Typewriter texts={texts} delay={1} baseText="Yo " />
        </p>
      </div>
    </IosOgShellCard>
  );
}

function IosOgShellCard({ children }: { children: ReactNode }) {
  return (
    <div className="shadow-inner-shadow mx-auto flex max-w-xs flex-col rounded-lg bg-neutral-900 px-px pb-px md:max-w-xl md:min-w-80">
      <div className="flex flex-col p-4 md:px-5">
        <div className="mb-2 text-sm text-neutral-500 md:text-neutral-500">
          iMessage
        </div>
        <div className="mb-3 text-xs text-neutral-500 md:text-sm">
          Today 11:29
        </div>
        <div className="mb-3 ml-auto rounded-2xl bg-blue-500 px-4 py-2 text-white">
          <span>Hey!</span>
        </div>
        <div className="mr-auto mb-3 rounded-2xl bg-neutral-700 px-4 py-2 text-white">
          <span>Whats up bretheren?!</span>
        </div>
        {children}
        <div className="mt-3 text-xs text-neutral-500 md:text-sm">
          Delivered
        </div>
      </div>
    </div>
  );
}
