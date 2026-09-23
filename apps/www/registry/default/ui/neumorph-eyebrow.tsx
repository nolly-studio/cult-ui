import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const neumorphEyebrowVariants = cva(
  "mb-2 flex h-6 w-fit items-center rounded-full border-[.75px] px-2.5 text-xs font-medium shadow-[inset_0px_-2.10843px_0px_0px_rgb(244,241,238),_0px_1.20482px_6.3253px_0px_rgb(244,241,238)]",
  {
    variants: {
      intent: {
        default: "border-[#E9E3DD] bg-[#FBFAF9] text-[#36322F]",
        primary: "border-blue-200 bg-blue-50 text-blue-800",
        secondary: "border-green-200 bg-green-50 text-green-800",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

interface NeumorphEyebrowProps extends VariantProps<
  typeof neumorphEyebrowVariants
> {
  children: React.ReactNode;
  className?: string;
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
  );
};

export default NeumorphEyebrow;
