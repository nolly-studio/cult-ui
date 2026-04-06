"use client";

import { useTheme } from "next-themes";

export function BackgroundTextureClient({
	textureUrl,
	opacity,
}: {
	textureUrl: string;
	opacity: number;
}) {
	const { theme } = useTheme();
	const themeOpacity =
		textureUrl === "/textures/debut-light.png" && theme === "dark"
			? 0.3
			: opacity;

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0"
			style={{
				backgroundImage: `url(${textureUrl})`,
				backgroundRepeat: "repeat",
				opacity: themeOpacity,
			}}
		/>
	);
}
