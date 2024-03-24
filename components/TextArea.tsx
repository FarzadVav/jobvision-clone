import { forwardRef } from "react"

import { cn } from "../utils/utility"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `ring-1 h-40 w-full py-3 px-5 rounded-md transition-shadow resize-y focus:ring-2 ${
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

TextArea.displayName = "TextArea"

export default TextArea
