"use client"

import { forwardRef, useState } from "react"

import { cn } from "../lib/utils"
import { IconChevronDown } from "@tabler/icons-react"

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string
  error?: boolean
}
const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ wrapperClassName, error, className, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
      <div className={cn("w-full flex items-center relative", wrapperClassName)}>
        <select
          className={cn(
            `ring-1 h-11 w-full pr-5 pl-12 rounded-md transition-shadow focus:ring-2 cursor-pointer appearance-none focus:outline-0 ${
              error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
            }`,
            className
          )}
          ref={ref}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...props}
        />
        <div className="h-11 w-12 flex justify-center items-center absolute left-0 top-0">
          <IconChevronDown
            className={`icon transition-transform ${isFocus ? "-scale-y-100" : ""}`}
          />
        </div>
      </div>
    )
  }
)
SelectBox.displayName = "SelectBox"

export default SelectBox
