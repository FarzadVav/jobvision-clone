"use client"

import { FC, useEffect, useRef, useState } from "react"

import AccordionTypes from "@/types/accordion.types"

const AccordionWithToggle = (Component: FC<AccordionTypes>) => {
  const NewComponent = (
    props: Omit<AccordionTypes, "toggle" | "toggleHandler" | "accordionRef">
  ) => {
    const [toggle, setToggle] = useState<boolean>(false)
    const accordionRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
      if (!accordionRef.current) return

      toggle
        ? (accordionRef.current.style.maxHeight = `${accordionRef.current?.scrollHeight}px`)
        : (accordionRef.current.style.maxHeight = "0")
    }, [toggle])

    return (
      <Component
        toggle={toggle}
        toggleHandler={(state) => setToggle((prev) => state ?? !prev)}
        accordionRef={accordionRef}
        {...props}
      />
    )
  }

  return NewComponent
}

export default AccordionWithToggle
