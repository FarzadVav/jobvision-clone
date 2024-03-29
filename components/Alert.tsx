import React, { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/utils/lib"

const alertVariants = cva("w-full flex items-center justify-between px-3 py-1.5 rounded", {
  variants: {
    variant: {
      info: "bg-primary/5 text-primary border border-solid border-primary",
      warning: "bg-warning/5 text-warning border border-solid border-warning",
      danger: "bg-danger/10 text-danger border border-solid border-danger",
    },
    size: {
      sm: "min-h-8 text-xs px-3",
      md: "min-h-10 px-4",
      lg: "min-h-11 rounded-md px-5",
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
})

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  message: string
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, children, message, ...props }, ref) => {
    return (
      <div className={cn(alertVariants({ variant, size, className }))} ref={ref} {...props}>
        <p>{message}</p>
      </div>
    )
  }
)

export default Alert
