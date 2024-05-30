import { BgAnimateButton } from "../ui/bg-animate-button"

type Gradients =
  | "sunrise"
  | "ocean"
  | "candy"
  | "default"
  | "forest"
  | "sunset"
  | "nebula"

type Radius = "full" | "xl" | "2xl" | "3xl" | "sm"
type Animations = "spin" | "pulse" | "spin-slow" | "spin-fast"

const gradients: Gradients[] = [
  "sunrise",
  "ocean",
  "candy",
  "forest",
  "sunset",
  "default",
  "nebula",
]
const roundings: Radius[] = ["full", "xl", "2xl", "3xl", "sm"]
const animations: Animations[] = ["spin", "pulse", "spin-slow", "spin-fast"]

export const BgAnimateButtonsDemo = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className=" sm:px-12 md:px-24 flex flex-col justify-center  rounded-lg space-y-4">
        {/* Roundings Grid */}

        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(0, 2).map((rounding, i) => (
            <BgAnimateButton
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </BgAnimateButton>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(2, 5).map((rounding, i) => (
            <BgAnimateButton
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </BgAnimateButton>
          ))}
        </div>

        {/* animations Grid */}
        <div className="grid grid-cols-2 gap-4">
          {animations.map((animations, i) => (
            <BgAnimateButton
              key={animations}
              gradient={gradients[i + 2]}
              variant="ghost"
              animation={animations}
            >
              {animations}
            </BgAnimateButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BgAnimateButtonsDemo
