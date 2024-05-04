import { ReactNode, RefObject } from "react";

type AccordionTypes = {
  length?: number;
  title: string;
  content: ReactNode;
  toggle: boolean;
  toggleHandler: (state?: boolean) => void;
  accordionRef: RefObject<HTMLParagraphElement>;
}

export default AccordionTypes