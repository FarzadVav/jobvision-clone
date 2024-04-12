"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { v4 as uuid } from "uuid"

import Button from "../Button"

const links = [
  { href: "/employer", value: "داشبورد" },
  { href: "/employer/profile", value: "اطلاعات شرکت" },
  { href: "/employer/new-jobad", value: "آگهی جدید" },
]

const SideBarLinks = () => {
  const pathname = usePathname()

  return (
    <ul className="w-full mt-3">
      {links.map((link) => (
        <li key={uuid()} className="w-full mt-3 first-of-type:mt-0">
          <Link className="w-full" href={link.href}>
            <Button
              className={`${
                pathname.endsWith(link.href)
                  ? "text-primary"
                  : "bg-primary text-white hover:bg-white hover:text-primary"
              } w-full`}
              variant={"outline"}
            >
              {link.value}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SideBarLinks
