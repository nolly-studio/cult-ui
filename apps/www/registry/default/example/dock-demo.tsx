"use client";

import {
  BlocksIcon,
  CircleIcon,
  HexagonIcon,
  OctagonIcon,
  PentagonIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dock,
  DockCard,
  DockCardInner,
  DockDivider,
} from "@/registry/default/ui/dock";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const isMobile = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    );

    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) setIsMobile(isSmall || isMobile);

    setIsMobile(isSmall && isMobile);
  }, []);

  return isMobile;
}

// Main component to display the dock with cards
let gradients = [
  "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
  null,
  "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
];

function DockAnimation() {
  let openIcons = [
    <CircleIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    <TriangleIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    <SquareIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    <PentagonIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    <HexagonIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    <OctagonIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
    null, // skip
    <BlocksIcon className="h-8 w-8 rounded-full fill-black stroke-black" />,
  ];

  const isMobile = useIsMobile();

  const responsiveOpenIcons = isMobile
    ? openIcons.slice(3, openIcons.length)
    : openIcons;
  const responsiveGradients = isMobile
    ? gradients.slice(3, gradients.length)
    : gradients;

  return (
    <div className="flex w-full items-center justify-center">
      <Dock>
        {responsiveGradients.map((src, index) =>
          src ? (
            <DockCard key={src} id={`${index}`}>
              <DockCardInner src={src} id={`${index}`}>
                {responsiveOpenIcons[index]}
              </DockCardInner>
            </DockCard>
          ) : (
            <DockDivider key={index} />
          )
        )}
      </Dock>
    </div>
  );
}

export default DockAnimation;
