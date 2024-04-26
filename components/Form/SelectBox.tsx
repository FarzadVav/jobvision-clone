"use client"

import { forwardRef, useState } from "react"
import { IconAsterisk, IconChevronDown } from "@tabler/icons-react"

import { cn } from "../../utils/lib/tw"

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string
  error?: string | null
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ wrapperClassName, error, className, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
      <>
        <div className={cn("w-full flex items-center relative", wrapperClassName)}>
          <select
            className={cn(
              `bg-transparent ring-1 h-11 w-full pr-5 pl-12 rounded-md transition-shadow focus:ring-2 cursor-pointer appearance-none focus:outline-0 ${
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
        {error ? (
          <p className="text-danger text-sm flex items-center mt-3">
            <IconAsterisk className="icon-xs" />
            <span className="mr-2">{error}</span>
          </p>
        ) : null}
      </>
    )
  }
)

SelectBox.displayName = "SelectBox"

export default SelectBox
