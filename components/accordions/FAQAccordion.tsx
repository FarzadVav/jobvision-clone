"use client"

import AccordionTypes from "@/types/accordion.types"
import AccordionWithToggle from "@/hocs/AccordionWithToggle"

const FooterAccordion = ({
  toggle,
  accordionRef,
  toggleHandler,
  length,
  title,
  content,
}: AccordionTypes) => {
  return (
    <li className="bg-white/5 text-white w-full rounded-md px-3 pr-4 mt-2 cursor-pointer first:mt-0 sm:px-6">
      <div className="flex items-center py-3" onClick={() => toggleHandler()}>
        <span>{length}</span>
        <span className="mr-4 sm:mr-6">{title}</span>
      </div>
      <p
        className={`border-solid border-t border-transparent leading-relaxed ${
          toggle ? "border-white/10" : ""
        } overflow-hidden transition-all`}
        ref={accordionRef}
      >
        <span className="inline-block py-3 sm:py-6">{content}</span>
      </p>
    </li>
  )
}

export default AccordionWithToggle(FooterAccordion)
