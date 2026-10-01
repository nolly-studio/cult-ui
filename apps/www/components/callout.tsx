import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const calloutClass =
  "bg-muted/50 text-foreground/80 shadow-soft-sm rounded-2xl border-0 px-4 py-3.5 text-[0.875rem] [&_[data-slot=callout-title]]:text-foreground"

interface CalloutProps {
  icon?: string
  title?: string
  className?: string
  children?: React.ReactNode
}

export function Callout({
  title,
  children,
  icon,
  className,
  ...props
}: CalloutProps) {
  return (
    <Alert
      className={cn(calloutClass, icon && "flex gap-3", className)}
      {...props}
    >
      {icon && (
        <span aria-hidden="true" className="text-base leading-6">
          {icon}
        </span>
      )}
      <div>
        {title && (
          <AlertTitle data-slot="callout-title" className="font-medium">
            {title}
          </AlertTitle>
        )}
        <AlertDescription>{children}</AlertDescription>
      </div>
    </Alert>
  )
}
