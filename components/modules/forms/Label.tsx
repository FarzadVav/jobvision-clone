import { forwardRef } from "react"

import { cn } from "../../../utils/tw"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      className={cn("dana-bold w-max flex gap-3 cursor-pointer", className)}
      ref={ref}
      {...props}
    />
  )
})

Label.displayName = "Label"

export default Label
