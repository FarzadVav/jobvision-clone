import { forwardRef } from "react"

import { cn } from "../lib/utils"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "ring-1 ring-light h-36 w-full px-5 py-3 rounded-md resize-y transition-shadow focus:ring-2 focus:ring-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TextArea.displayName = "TextArea"

export default TextArea
