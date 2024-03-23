import { forwardRef } from "react"

import { cn } from "../lib/utils"
import { IconChevronDown } from "@tabler/icons-react"

type SelectBoxWrapperProps = React.HTMLAttributes<HTMLDivElement>
export const SelectBoxWrapper = forwardRef<HTMLDivElement, SelectBoxWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("w-full flex items-center relative", className)} ref={ref} {...props}>
        {children}
        <IconChevronDown className="icon absolute left-3" />
      </div>
    )
  }
)
SelectBoxWrapper.displayName = "SelectBoxWrapper"

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}
const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <select
        className={cn(
          `ring-1 h-11 w-full pr-5 pl-11 rounded-md transition-shadow focus:ring-2 cursor-pointer appearance-none focus:outline-0 ${
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
