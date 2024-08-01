"use client"

import { useEffect, useRef } from "react"
import { IconCaretDownFilled } from "@tabler/icons-react"

import AccordionTypes from "@/types/accordion.types"
import AccordionWithToggle from "@/hocs/AccordionWithToggle"
import Title from "../../Title"

const Accordion = ({
  toggle,
  accordionRef,
  toggleHandler,
  length,
  title,
  content,
}: AccordionTypes) => {
  const accordionParrentRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = () => {
      if (
        (accordionParrentRef.current?.getBoundingClientRect().top || 0) <=
          window.innerHeight / 1.75 &&
        length === 1
      ) {
        toggleHandler(true)
      }
    }

    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <li
        className={`bg-white w-full flex justify-between items-center py-1.5 mt-6 relative ${
          length !== 1 ? "cursor-pointer" : "cursor-not-allowed"
        } group first-of-type:mt-0 sm:py-3`}
        ref={accordionParrentRef}
        onClick={() => length !== 1 && toggleHandler()}
      >
        <div
          className={`${
            toggle ? "text-primary" : ""
          } bg-white w-12 h-full text-xl hidden justify-center items-center absolute -right-16 top-0 transition-colors group-hover:text-primary sm:flex`}
        >
          {length}
        </div>
        <Title
          className={`${
            toggle ? "text-primary" : ""
          } w-[calc(100%-2.5rem)] h-max !leading-loose transition-colors group-hover:text-primary`}
          font={"danaBold"}
          size={"xs"}
        >
          {title}
        </Title>
        <IconCaretDownFilled
          className={`icon ${toggle ? "text-primary" : ""} transition-colors absolute left-0 ${
            toggle ? "-scale-y-100" : ""
          } group-hover:text-primary md:icon-lg`}
        />
      </li>
      <p
        className={`transition-all ${
          toggle ? "opacity-100 visible" : "opacity-0 invisible"
        } text-justify`}
        ref={accordionRef}
      >
        <span className="inline-block mt-3">{content}</span>
      </p>
    </>
  )
}

export default AccordionWithToggle(Accordion)
