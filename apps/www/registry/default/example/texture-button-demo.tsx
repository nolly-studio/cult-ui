"use client";

import { ChevronLeft, Trash, X } from "lucide-react";

import { TextureButton } from "@/registry/default/ui/texture-button";

export default function TextureButtonDemo() {
	return (
		<div className="  py-6 px-4 md:px-0 rounded-md flex justify-center">
			<div>
				<div className="flex flex-col gap-3 max-w-lg mt-4">
					<div className="flex gap-3">
						<div>
							<TextureButton key="primary" size="sm">
								Primary
							</TextureButton>
						</div>
						<div className="">
							<TextureButton key="primary2">Primary</TextureButton>
						</div>
						<div className="md:w-36 hidden">
							<TextureButton key="primary3" size="lg">
								Primary
							</TextureButton>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-lg mt-4">
					<div className="flex gap-3">
						<div>
							<TextureButton key="accent" variant="accent" size="sm">
								Accent
							</TextureButton>
						</div>
						<div className="">
							<TextureButton key="accent2" variant="accent">
								Accent
							</TextureButton>
						</div>
						<div className="md:w-36 hidden">
							<TextureButton key="accent3" variant="accent" size="lg">
								Accent
							</TextureButton>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-lg mt-4">
					<div className="flex gap-3 w-full">
						<div className="">
							<TextureButton key="secondary" variant="secondary" size="sm">
								Secondary
							</TextureButton>
						</div>
						<div className="">
							<TextureButton key="secondary2" variant="secondary">
								Secondary
							</TextureButton>
						</div>
						<div className="hidden md:w-48">
							<TextureButton key="secondary3" variant="secondary" size="lg">
								Secondary
							</TextureButton>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-lg mt-4">
					<div className="flex gap-3 w-full">
						<div className="">
							<TextureButton key="destructive" variant="destructive" size="sm">
								Destructive
							</TextureButton>
						</div>
						<div className="">
							<TextureButton key="destructive2" variant="destructive">
								Destructive
							</TextureButton>
						</div>
						<div className="hidden md:w-48">
							<TextureButton key="destructive3" variant="destructive" size="lg">
								Destructive
							</TextureButton>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-lg mt-4">
					<div className="flex gap-3 w-full">
						<div className="">
							<TextureButton key="minimal" variant="minimal" size="sm">
								Minimal
							</TextureButton>
						</div>
						<div className="">
							<TextureButton key="minimal2" variant="minimal">
								Minimal
							</TextureButton>
						</div>
						<div className="hidden md:w-48">
							<TextureButton key="minimal3" variant="minimal" size="lg">
								Minimal
							</TextureButton>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-xs mt-4">
					<div className="flex gap-3">
						<TextureButton key="icon1" variant="icon" size="icon">
							<ChevronLeft className="h-6 w-6 p-1" />
						</TextureButton>

						<TextureButton key="icon2" variant="icon" size="icon">
							<Trash className="h-5 w-6 p-1" />
						</TextureButton>

						<TextureButton key="icon3" variant="icon" size="icon">
							<X className="h-6 w-6 p-1" />
						</TextureButton>
					</div>
				</div>
			</div>
		</div>
	);
}
