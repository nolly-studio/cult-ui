"use client"

import {
  ShadowCard,
  ShadowCardBackdrop,
  ShadowCardBevel,
  ShadowCardFooter,
  ShadowCardGlow,
  ShadowCardPixelGradient,
  ShadowCardVerticalText,
} from "@/registry/default/ui/shadow-card"

const CARD1_DOT_PATTERN = [
  1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 0,
]

function ShadowCardDemoCard1() {
  return (
    <ShadowCard className="h-[420px] w-[280px]">
      <ShadowCardBackdrop
        className="inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255, 100, 200, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(255, 180, 150, 0.6) 0%, transparent 40%),
            linear-gradient(180deg, #e8ddd4 0%, #d4c8bc 50%, #e8ddd4 100%)
          `,
        }}
      />
      <ShadowCardGlow
        className="top-20 left-32 h-20 w-16 rounded-full blur-xl"
        style={{ background: "rgba(50, 50, 80, 0.4)" }}
      />
      <ShadowCardVerticalText className="top-1/4 right-6 font-medium text-[10px] text-neutral-700 tracking-wide">
        <span className="block">Where Design And Product Teams</span>
        <span className="mt-1 block">Build The Future Of Software</span>
      </ShadowCardVerticalText>
      <ShadowCardFooter>
        <div className="grid grid-cols-6 gap-[2px]">
          {CARD1_DOT_PATTERN.map((visible, i) => (
            <div
              className="h-1.5 w-1.5 rounded-full bg-neutral-800"
              key={i}
              style={{ opacity: visible === 1 ? 1 : 0.3 }}
            />
          ))}
        </div>
        <div className="flex flex-col text-[6px] text-neutral-600 leading-tight">
          <span>THE DESIGN</span>
          <span>ZEPXEN</span>
        </div>
        <div className="flex h-4 w-4 items-center justify-center border border-neutral-800">
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="10"
            viewBox="0 0 10 10"
            width="10"
          >
            <path
              d="M2 8L8 2M8 2H3M8 2V7"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </ShadowCardFooter>
      <ShadowCardBevel />
    </ShadowCard>
  )
}

function ShadowCardDemoCard2() {
  return (
    <ShadowCard className="flex h-[420px] w-[280px] flex-col bg-white">
      <div className="h-[52%] min-h-0 shrink-0 overflow-hidden">
        <ShadowCardPixelGradient />
      </div>
      <div className="flex h-[48%] flex-col justify-between px-5 pt-6 pb-5">
        <h2 className="font-semibold text-[22px] text-neutral-900 leading-tight tracking-tight">
          Where Design And Product Teams Build The Future Of Software.
        </h2>
        <p className="text-neutral-500 text-xs leading-relaxed">
          Design Is About To Have Its
          <br />
          GitHub Moment.
        </p>
      </div>
      <ShadowCardBevel />
    </ShadowCard>
  )
}

function ShadowCardDemo() {
  return (
    <div className="flex min-h-full w-full items-center justify-center gap-6 bg-[#f7d9c4] p-8">
      <ShadowCardDemoCard1 />
      <ShadowCardDemoCard2 />
    </div>
  )
}

export { ShadowCardDemo }
export default ShadowCardDemo
