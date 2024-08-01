import { forwardRef } from "react"
import { createPortal } from "react-dom"
import { useIsClient } from "@uidotdev/usehooks"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/utils/tw"

const mobileMenuVariants = cva(
  "bg-dark/25 w-screen h-screen max-h-dvh fixed top-0 left-0 z-50 transition-opacity cursor-zoom-out",
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
    const isClient = useIsClient()

    if (!isClient) return null

    return createPortal(
      <>
        <div
          className={cn(
            mobileMenuVariants({ breakPoint }),
            className,
            state ? "" : "opacity-0 invisible"
          )}
          ref={ref}
          onClick={closingHandler}
          {...props}
        >
          <menu
            className={`light-border border-t bg-primary text-white w-screen h-max p-3 pt-9 rounded-t-3xl absolute bottom-0 left-0 transition-transform cursor-default ${
              state ? "" : "translate-y-full"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-white/10 w-1/4 h-1 rounded-full absolute top-3 left-1/2 -translate-x-1/2"></div>
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
