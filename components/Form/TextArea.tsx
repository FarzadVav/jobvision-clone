import { forwardRef } from "react"
import { IconAsterisk } from "@tabler/icons-react"

import { cn } from "../../utils/lib"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | null
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <>
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

TextArea.displayName = "TextArea"

export default TextArea
