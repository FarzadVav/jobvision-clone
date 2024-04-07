import { ReactNode, RefObject } from "react";

type AccordionTypes = {
  length?: number;
  title: string;
  text: string | ReactNode;
  toggle: boolean;
  setToggle: (prop: boolean) => void;
  accordionRef: RefObject<HTMLParagraphElement>;
  toggleHandler: () => void;
}

export default AccordionTypes