import { forwardRef } from "react"
import { createPortal } from "react-dom"

import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/utils/lib/tw"

const mobileMenuVariants = cva(
  "w-screen h-screen max-h-dvh fixed top-0 left-0 z-50 transition-colors",
  {
    variants: {
      breakPoint: {
        sm: "sm:hidden",
        md: "md:hidden",
        lg: "lg:hidden",
      },
    },
    defaultVariants: {
      breakPoint: "sm",
    },
  }
)

export interface MobileMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileMenuVariants> {
  state: boolean
  closingHandler: () => void
  className?: string
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ className, breakPoint, state, closingHandler, children, ...props }, ref) => {
    return createPortal(
      <>
        <div
          className={cn(
            mobileMenuVariants({ breakPoint }),
            "w-screen h-screen max-h-dvh fixed top-0 left-0 z-50 transition-colors",
            className,
            state ? "bg-dark/25" : "invisible bg-transparent"
          )}
          ref={ref}
          onClick={closingHandler}
          {...props}
        >
          <menu
            className={cn(
              "bg-primary w-screen p-3 pt-9 rounded-t-3xl absolute bottom-0 left-0 transition-all",
              state ? "" : "translate-y-full"
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-white/10 w-1/3 h-1 rounded-full absolute top-3 left-1/2 -translate-y-0.5 -translate-x-1/2"></div>
            {children}
          </menu>
        </div>
      </>,
      document.body
    )
  }
)

MobileMenu.displayName = "MobileMenu"

export default MobileMenu
