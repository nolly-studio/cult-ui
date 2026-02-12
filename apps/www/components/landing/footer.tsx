import { Dithering } from "@paper-design/shaders-react";

import { memo } from "react";

import { LocalTime } from "./local-time";

import { Icons } from "../icons";

const MemoizedDithering = memo(Dithering);

export const Footer = () => (
	<div className="relative grid w-full grid-cols-[0.2fr_3fr_0.2fr] md:grid-cols-[0.5fr_3fr_0.5fr]">
		{/* Gradient overlays */}
		<div className="pointer-events-none absolute inset-0">
			<div className="absolute top-0 right-0 left-0 h-8 bg-gradient-to-b from-background to-transparent" />
			<div className="absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t from-background to-transparent" />
			<div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
			<div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent" />
		</div>

		<div className="absolute top-12 right-0 left-0 z-0">
			<div className="shader-background absolute inset-0 z-0 select-none">
				<MemoizedDithering
					colorBack="#00000000"
					// colorFront="#006CFF"
					colorFront="#000000"
					pxSize={3}
					scale={2.13}
					shape="swirl"
					speed={0.43}
					style={{
						// background
						// Color: "#000000",
						height: "30.2vh",
						// width: "100vw",
					}}
					type="4x4"
				/>
			</div>
		</div>

		{/* Top row */}

		{/* Middle row - main content */}
		<div className="" />
		<div className="relative flex items-center justify-center">
			{/* Main content */}
			<div className="flex flex-col items-center justify-center px-5 py-36">
				<div className="flex items-center justify-center gap-1">
					<Icons.cultLogoBasic className="size-6 fill-black dark:fill-white " />
					<h2 className="mb-2 text-center font-medium text-3xl tracking-[-0.12rem] md:text-4xl ">
						cult ui
					</h2>
					<Icons.cultLogoBasic className="size-6 fill-black dark:fill-white " />
				</div>

				<p className="max-w-2xl text-center text-lg font-pixel-line">
					Join the cult
				</p>
				<p className="max-w-2xl text-center text-lg font-pixel-line">
					<LocalTime />
				</p>
			</div>
		</div>

		{/* Spacer */}
		<div className="h-16" />

		<div className="" />
	</div>
);
