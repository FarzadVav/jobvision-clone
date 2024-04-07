import { ReactNode } from "react"
import { v4 as uuid } from "uuid"
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
} from "@tabler/icons-react"

import { FOOTER_ACCORDIONS } from "@/utils/initialData"
import FAQAccordion from "../accordions/FAQAccordion"
import Title from "../Title"

const FOOTER_SOCIALS: { link: string; svg: ReactNode; title: string }[] = [
  {
    link: "https://www.instagram.com",
    svg: <IconBrandInstagram />,
    title: "instagram",
  },
  {
    link: "https://www.telegram.org",
    svg: <IconBrandTelegram />,
    title: "telegram",
  },
  {
    link: "https://www.twitter.com",
    svg: <IconBrandX />,
    title: "twitter",
  },
  {
    link: "https://www.linkedin.com",
    svg: <IconBrandLinkedin />,
    title: "linkeding",
  },
]

const Footer = () => {
  return (
    <div className="text-white bg-dark z-40 pt-12">
      <div className="container">
        <Title size={"sm"}>
          <h6 className="">سوالات متداول</h6>
        </Title>
        <ul className="w-full mt-3">
          {FOOTER_ACCORDIONS.map((accordion, index) => (
            <FAQAccordion key={uuid()} length={index + 1} {...accordion} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Footer
