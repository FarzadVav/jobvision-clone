import { forwardRef } from "react"

import { cn } from "../utils/utility"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {
  return (
    <input
      className={cn(
        `ring-1 h-11 w-full px-5 rounded-md transition-shadow focus:ring-2 file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
          error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
        }`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
