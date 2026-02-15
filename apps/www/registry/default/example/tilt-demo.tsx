import React from "react"

import { Tilt } from "@/registry/default/ui/tilt"

export default function TiltDemo() {
  return (
    <div className="flex items-center justify-center p-20">
      <Tilt
        className="w-72 h-96 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl flex flex-col items-center justify-center p-8 text-white border border-white/20"
        maxRotation={20}
        scale={1.1}
      >
        <div
          style={{ transform: "translateZ(50px)" }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-xl border border-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <h3 className="text-3xl font-black mb-2 tracking-tighter">CULT UI</h3>
          <p className="text-center text-white/80 font-medium">
            Hover over me to experience the 3D tilt effect. Built with Framer
            Motion.
          </p>
        </div>

        <div
          style={{ transform: "translateZ(30px)" }}
          className="mt-8 px-6 py-2 rounded-full bg-white text-indigo-600 font-bold text-sm shadow-lg"
        >
          Get Started
        </div>
      </Tilt>
    </div>
  )
}
