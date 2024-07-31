import React, { ReactNode, forwardRef } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/utils/tw"
import Title from "./Title"
import Button, { ButtonVariantsT } from "./Button"

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  state: boolean
  icon?: ReactNode
  topic: ReactNode
  message: ReactNode
  buttonVariant?: ButtonVariantsT["variant"]
  acceptAction: () => void
  closingHandler: () => void
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      state,
      icon,
      topic,
      message,
      buttonVariant = "primary",
      acceptAction,
      closingHandler,
      onClick = () => {},
      ...props
    },
    ref
  ) => {
    if (!state) return null

    return createPortal(
      <>
        <div
          className="animate-fade animate-duration-300 center bg-dark/25 w-screen h-screen fixed top-0 left-0 z-50 cursor-zoom-out"
          onClick={closingHandler}
        >
          <div className="container sm:w-2/3 xl:w-1/2">
            <div
              className={cn(
                "animate-fade-up animate-duration-150 shadow-lg w-full bg-white px-3 py-6 rounded-md cursor-default sm:p-6",
                className
              )}
              ref={ref}
              onClick={(event) => {
                event.stopPropagation()
                onClick(event)
              }}
              {...props}
            >
              <div className="row items-start">
                {icon}
                <Title className={icon ? "mr-3" : ""} size={"sm"} font={"danaBold"}>
                  <h6>{topic}</h6>
                </Title>
              </div>
              <p className="w-full mt-3">{message}</p>
              <div className="row mt-6">
                <Button variant={buttonVariant} onClick={acceptAction}>
                  تایید
                </Button>
                <Button className="mr-3" variant={"ghost"} onClick={closingHandler}>
                  بستن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    )
  }
)

Modal.displayName = "Modal"

export default Modal
