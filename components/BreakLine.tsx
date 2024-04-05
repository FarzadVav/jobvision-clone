import { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/utils/lib"

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
  description: string
}

const BreakLine = forwardRef<HTMLDivElement, BreakLineProps>(
  ({ className, variant, children, description, ...props }, ref) => {
    return (
      <div className={cn(breakLineVariants({ variant, className }))} ref={ref} {...props}>
        <div className="border-b border-solid border-light w-full flex items-center pb-4">
          <svg
            className="icon-lg -scale-x-100"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AutoAwesomeRoundedIcon"
          >
            <path d="m19.46 8 .79-1.75L22 5.46c.39-.18.39-.73 0-.91l-1.75-.79L19.46 2c-.18-.39-.73-.39-.91 0l-.79 1.75-1.76.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.74.39.92 0zM11.5 9.5 9.91 6c-.35-.78-1.47-.78-1.82 0L6.5 9.5 3 11.09c-.78.36-.78 1.47 0 1.82l3.5 1.59L8.09 18c.36.78 1.47.78 1.82 0l1.59-3.5 3.5-1.59c.78-.36.78-1.47 0-1.82L11.5 9.5zm7.04 6.5-.79 1.75-1.75.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.73.39.91 0l.79-1.75 1.76-.79c.39-.18.39-.73 0-.91l-1.75-.79-.79-1.76c-.18-.39-.74-.39-.92 0z"></path>
          </svg>
          <span className="inline-block mr-3">{children}</span>
        </div>
        <p className="dana-base text-dark/75 w-full mt-4">{description}</p>
      </div>
    )
  }
)

BreakLine.displayName = "BreakLine"

export default BreakLine
