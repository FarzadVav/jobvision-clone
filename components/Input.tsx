import { forwardRef } from "react"

import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "ring-1 ring-light h-11 w-full px-5 rounded-md transition-shadow focus:ring-2 focus:ring-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export default Input
