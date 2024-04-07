"use client"

import { FC, useEffect, useRef, useState } from "react"

import AccordionTypes from "@/types/accordion.types"

const AccordionWithToggle = (Component: FC<any>, moreSpace?: number) => {
  const NewComponent = (
    props: Omit<AccordionTypes, "toggle" | "setToggle" | "accordionRef" | "toggleHandler">
  ) => {
    const [toggle, setToggle] = useState<boolean>(false)

    const accordionRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
      if (toggle) {
        accordionRef.current
          ? (accordionRef.current.style.maxHeight = `${
              accordionRef.current?.scrollHeight + (moreSpace || 0)
            }px`)
          : null
      } else {
        accordionRef.current ? (accordionRef.current.style.maxHeight = "0") : null
      }
    }, [toggle])

    return (
      <Component
        {...props}
        toggle={toggle}
        setToggle={setToggle}
        accordionRef={accordionRef}
        toggleHandler={() => setToggle((prev) => !prev)}
      />
    )
  }

  return NewComponent
}

export default AccordionWithToggle
