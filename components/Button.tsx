"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { PulseLoader } from "react-spinners"

import { cn } from "../utils/lib"

const buttonVariants = cva(
  "w-max flex justify-center items-center gap-2 rounded cursor-pointer transition active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/95",
        success: "bg-success text-white hover:bg-success/90",
        danger: "bg-danger text-white hover:bg-danger/95",
        dark: "bg-dark text-white hover:bg-dark/95",
        fill: "bg-light hover:bg-light/95",
        outline: "bg-white border border-solid border-light",
        link: "text-primary underline decoration-transparent hover:decoration-primary",
        ghost: "hover:bg-light",
      },
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 px-4",
        lg: "h-11 rounded-md px-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

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
