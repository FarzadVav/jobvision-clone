import React, { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const titleVariants = cva("dana-bold w-full !leading-relaxed", {
  variants: {
    size: {
      sm: "text-base sm:text-lg lg:text-xl",
      md: "text-lg sm:text-xl lg:text-2xl xl:text-3xl",
      lg: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface TitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titleVariants> {}

const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div className={cn(titleVariants({ size, className }))} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

Title.displayName = "Title"

export default Title
