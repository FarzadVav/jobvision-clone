import { forwardRef } from "react"

import { cn } from "../lib/utils"

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <select
        className={cn(
          `ring-1 h-11 w-full px-5 rounded-md transition-shadow focus:ring-2 cursor-pointer appearance-none focus:outline-0 ${
            error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

SelectBox.displayName = "SelectBox"

export default SelectBox
