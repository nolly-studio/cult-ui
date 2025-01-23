import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const neumorphEyebrowVariants = cva(
  "rounded-full border-[.75px] px-2.5 w-fit h-6 flex items-center text-xs font-medium mb-2 shadow-[inset_0px_-2.10843px_0px_0px_rgb(244,241,238),_0px_1.20482px_6.3253px_0px_rgb(244,241,238)]",
  {
    variants: {
      intent: {
        default: "border-[#E9E3DD] text-[#36322F] bg-[#FBFAF9]",
        primary: "border-blue-200 text-blue-800 bg-blue-50",
        secondary: "border-green-200 text-green-800 bg-green-50",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

interface NeumorphEyebrowProps
  extends VariantProps<typeof neumorphEyebrowVariants> {
  children: React.ReactNode
  className?: string
}

export const NeumorphEyebrow: React.FC<NeumorphEyebrowProps> = ({
  children,
  intent,
  className,
  ...props
}) => {
  return (
    <div className={neumorphEyebrowVariants({ intent, className })} {...props}>
      {children}
    </div>
  )
}

export default NeumorphEyebrow
