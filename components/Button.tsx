"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { PulseLoader } from "react-spinners"

import { cn } from "../utils/tw"

const buttonVariants = cva(
  "min-w-max flex justify-center items-center gap-2 rounded cursor-pointer transition active:scale-95 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primaryFill: "bg-primary text-white hover:bg-primary/95",
        primaryGhost: "hover:bg-primary/50",
        primaryOutline: "border border-solid border-primary",
        primaryLink: "text-primary underline decoration-transparent hover:decoration-primary",
        
        dangerFill: "bg-danger text-white hover:bg-danger/95",
        dangerGhost: "hover:bg-danger/50",
        dangerOutline: "border border-solid border-danger",
        dangerLink: "text-danger underline decoration-transparent hover:decoration-danger",

        successFill: "bg-success text-white hover:bg-success/95",
        successGhost: "hover:bg-success/50",
        successOutline: "border border-solid border-success",
        successLink: "text-success underline decoration-transparent hover:decoration-success",

        warningFill: "bg-warning text-white hover:bg-warning/95",
        warningGhost: "hover:bg-warning/50",
        warningOutline: "border border-solid border-warning",
        warningLink: "text-warning underline decoration-transparent hover:decoration-warning",

        darkFill: "bg-dark text-white hover:bg-dark/95",
        darkGhost: "hover:bg-dark/50",
        darkOutline: "border border-solid border-dark",
        darkLink: "text-dark underline decoration-transparent hover:decoration-dark",
        
        lightFill: "bg-light text-dark hover:bg-light/95",
        lightGhost: "hover:bg-light/50",
        lightOutline: "border border-solid border-light",
        lightLink: "text-light underline decoration-transparent hover:decoration-light",
      },
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 px-4",
        lg: "h-11 rounded-md px-5",
        xl: "h-12 text-lg rounded-md px-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export type ButtonVariantsT = VariantProps<typeof buttonVariants>
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantsT

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { pending } = useFormStatus()

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={pending}
        {...props}
      >
        {pending ? <PulseLoader color="white" size={6} /> : children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
