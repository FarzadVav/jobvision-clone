"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { PulseLoader } from "react-spinners"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "w-max flex justify-center items-center gap-3 rounded cursor-pointer transition active:scale-95",
  {
    variants: {
      variant: {
        default: "active:scale-100",
        primary: "bg-primary text-white",
        danger: "bg-danger text-white",
        outline: "bg-white border border-solid border-light",
        ghost: "hover:bg-light",
        link: "underline decoration-transparent hover:decoration-dark/75",
        fill: "bg-light",
      },
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 px-4",
        lg: "h-11 rounded-md px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

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

export default Button
