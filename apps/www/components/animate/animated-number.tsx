"use client"

import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { MotionValue, motion, useSpring, useTransform } from "motion/react"
import { toast } from "sonner"

import { GradientHeading } from "@/registry/default/ui/gradient-heading"
import TextureCard, {
  TextureCardContent,
  TextureCardHeader,
  TextureCardStyled,
} from "@/registry/default/ui/texture-card"

import { Button } from "../ui/button"
import { Slider } from "../ui/slider"

interface AnimatedNumberProps {
  value: number
  mass?: number
  stiffness?: number
  damping?: number
  precision?: number
  format?: (value: number) => string
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

export function AnimatedNumber({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format = (num) => num.toLocaleString(),
  onAnimationStart,
  onAnimationComplete,
}: AnimatedNumberProps) {
  const spring = useSpring(value, { mass, stiffness, damping })
  const display: MotionValue<string> = useTransform(spring, (current) =>
    format(parseFloat(current.toFixed(precision)))
  )

  useEffect(() => {
    spring.set(value)
    if (onAnimationStart) onAnimationStart()
    const unsubscribe = spring.onChange(() => {
      if (spring.get() === value && onAnimationComplete) onAnimationComplete()
    })
    return () => unsubscribe()
  }, [spring, value, onAnimationStart, onAnimationComplete])

  return <motion.span>{display}</motion.span>
}

export function BasicExample() {
  const [value, setValue] = useState(1000)

  return (
    <div>
      <AnimatedNumber value={value} />
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full border border-primary/10 "
        onClick={() => setValue(value + 1000)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function PrecisionExample() {
  const [value, setValue] = useState(1234.5678)

  return (
    <TextureCardStyled>
      <TextureCardHeader className="pl-3">
        <GradientHeading size="xxs">Precision</GradientHeading>
      </TextureCardHeader>
      <TextureCardContent>
        <div className="flex gap-2">
          <div className="text-2xl font-bold">
            <AnimatedNumber value={value} precision={2} />
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto rounded-full border border-primary/10 py-5"
            onClick={() => setValue(value + 123.456)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TextureCardContent>
    </TextureCardStyled>
  )
}

export function FormatExample() {
  const [value, setValue] = useState(1000)

  const customFormat = (num: number) => `$${num.toFixed(2)}`

  return (
    <TextureCardStyled>
      <TextureCardHeader className="pl-3">
        <GradientHeading size="xxs">Format</GradientHeading>
      </TextureCardHeader>
      <TextureCardContent>
        <div className="flex gap-2">
          <div className="text-2xl font-bold">
            <AnimatedNumber value={value} format={customFormat} />
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto rounded-full border border-primary/10 py-5"
            onClick={() => setValue(value + 250)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TextureCardContent>
    </TextureCardStyled>
  )
}

export function HooksExample() {
  const [value, setValue] = useState(1000)

  const handleAnimationStart = () => {
    toast("🏁 Animation started ")
  }

  const handleAnimationComplete = () => {
    toast("✅ Animation completed ")
  }

  return (
    <TextureCardStyled>
      <TextureCardHeader className="pl-3">
        <GradientHeading size="xxs">Callbacks</GradientHeading>
      </TextureCardHeader>
      <TextureCardContent>
        <div className="flex gap-2">
          <div className="text-2xl font-bold">
            <AnimatedNumber
              value={value}
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto rounded-full border border-primary/10 py-5"
            onClick={() => setValue(value + 500)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TextureCardContent>
    </TextureCardStyled>
  )
}

export function CustomSpringExample() {
  const [value, setValue] = useState(1000)
  const [mass, setMass] = useState(1)
  const [stiffness, setStiffness] = useState(100)
  const [damping, setDamping] = useState(40)

  const handleValueChange =
    (setter: (value: number) => void, minValue: number) =>
    (values: number[]) => {
      const newValue = Math.max(values[0], minValue)
      setter(newValue)
    }

  return (
    <TextureCardStyled className="w-full">
      <TextureCardHeader className="px-3">
        <GradientHeading size="sm">Custom Spring Properties</GradientHeading>
      </TextureCardHeader>
      <TextureCardContent className="flex flex-col items-center justify-between gap-8 sm:flex-row">
        <div
          className="mr-auto flex text-6xl font-bold"
          style={{ minWidth: "150px", textAlign: "right" }}
        >
          <AnimatedNumber
            value={value}
            mass={mass}
            stiffness={stiffness}
            damping={damping}
          />
        </div>

        <div className="flex flex-col gap-3 px-2">
          <Button
            className="rounded-full border border-primary/10 py-5"
            onClick={() => setValue(value + 500)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Increase
          </Button>
          <Button
            className="rounded-full border border-primary/10 py-5"
            disabled={value <= 500}
            onClick={() => setValue(value - 300)}
          >
            <Minus className="mr-2 h-4 w-4" />
            Decrease
          </Button>
        </div>
        <div className="ml-auto w-full">
          <div className="flex flex-col gap-4">
            <div className="ml-auto w-full">
              <label>Mass: {mass}</label>
              <Slider
                defaultValue={[mass]}
                max={5}
                step={0.1}
                onValueChange={handleValueChange(setMass, 0.1)}
              />
            </div>
            <div className="ml-auto w-full">
              <label>Stiffness: {stiffness}</label>
              <Slider
                defaultValue={[stiffness]}
                max={200}
                step={1}
                onValueChange={handleValueChange(setStiffness, 1)}
              />
            </div>
            <div className="ml-auto w-full">
              <label>Damping: {damping}</label>
              <Slider
                defaultValue={[damping]}
                max={50}
                step={1}
                onValueChange={handleValueChange(setDamping, 1)}
              />
            </div>
          </div>
        </div>
      </TextureCardContent>
    </TextureCardStyled>
  )
}

export function AnimatedNumberExamples() {
  return (
    <div className="  mx-auto max-w-xl gap-4 py-6 ">
      <div className="flex w-full flex-col justify-between">
        <CustomSpringExample />
        <div className="flex   flex-col sm:flex-row">
          <PrecisionExample />
          <FormatExample />
          <HooksExample />
        </div>
      </div>
    </div>
  )
}
