"use client"

import AccordionTypes from "@/types/accordion.types"
import AccordionWithToggle from "@/hocs/AccordionWithToggle"

const FooterAccordion = ({
  toggle,
  accordionRef,
  toggleHandler,
  length,
  title,
  text,
}: AccordionTypes) => {
  return (
    <li className="bg-white/5 text-white w-full rounded-md px-6 py-1 mt-2 first:mt-0 cursor-pointer">
      <div className="h-12 flex items-center" onClick={toggleHandler}>
        <span>{length}</span>
        <span className="truncate mr-6">{title}</span>
      </div>
      <div
        className={`border-solid border-white/10 ${
          toggle ? "border-t" : ""
        } overflow-hidden transition-all cursor-text`}
        ref={accordionRef}
      >
        <p className="py-3">
          <span className="underline decoration-white/10 ml-1.5 sm:hidden">{title}</span>
          <span>{text}</span>
        </p>
      </div>
    </li>
  )
}

export default AccordionWithToggle(FooterAccordion)
