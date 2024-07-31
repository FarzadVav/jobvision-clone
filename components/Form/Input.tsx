import { forwardRef } from "react"
import { IconAsterisk } from "@tabler/icons-react"

import { cn } from "../../utils/tw"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className, ...props }, ref) => {
  return (
    <>
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
      {error ? (
        <p className="text-danger text-sm flex items-center mt-3">
          <IconAsterisk className="icon-xs" />
          <span className="mr-2">{error}</span>
        </p>
      ) : null}
    </>
  )
})

Input.displayName = "Input"

export default Input
