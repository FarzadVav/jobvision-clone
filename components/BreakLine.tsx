import { ReactNode, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/utils/tw"

const breakLineVariants = cva("dana-bold w-full", {
  variants: {
    variant: {
      primary: "text-primary",
      danger: "text-danger",
      warning: "text-warning",
      success: "text-success",
    },
  },
})

export interface BreakLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof breakLineVariants> {
  icon: ReactNode
  description: string
}

const BreakLine = forwardRef<HTMLDivElement, BreakLineProps>(
  ({ className, variant, icon, children, description, ...props }, ref) => {
    return (
      <div className={cn(breakLineVariants({ variant, className }))} ref={ref} {...props}>
        <div className="border-b border-solid border-light w-full flex items-center pb-4">
          {icon}
          <span className="inline-block mr-3">{children}</span>
        </div>
        <p className="dana-base text-dark/75 w-full mt-4">{description}</p>
      </div>
    )
  }
)

BreakLine.displayName = "BreakLine"

export default BreakLine
