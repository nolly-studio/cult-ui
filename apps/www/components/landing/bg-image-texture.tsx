import type React from "react";

import { cn } from "@/lib/utils";
import { BackgroundTextureClient } from "./background-texture-client";

export type TextureVariant =
	| "fabric-of-squares"
	| "grid-noise"
	| "inflicted"
	| "debut-light"
	| "groovepaper"
	| "none";

interface BackgroundTextureProps {
	variant?: TextureVariant;
	opacity?: number;
	className?: string;
	children?: React.ReactNode;
}

const textureMap: Record<Exclude<TextureVariant, "none">, string> = {
	"fabric-of-squares": "/textures/fabric-of-squares.png",
	"grid-noise": "/textures/grid-noise.png",
	inflicted: "/textures/inflicted.png",
	"debut-light": "/textures/debut-light.png",
	groovepaper: "/textures/groovepaper.png",
};

export function BackgroundImageTexture({
	variant = "fabric-of-squares",
	opacity = 0.1,
	className,
	children,
}: BackgroundTextureProps) {
	const textureUrl = variant !== "none" ? textureMap[variant] : null;

	return (
		<div className={cn("relative", className)}>
			{textureUrl && (
				<BackgroundTextureClient textureUrl={textureUrl} opacity={opacity} />
			)}
			{children && <div className="relative">{children}</div>}
		</div>
	);
}
