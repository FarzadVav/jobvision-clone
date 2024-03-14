"use client"

import { usePathname } from "next/navigation"

import Button from "./Button"
import Icon from "./Icon"
import Link from "next/link"

const LogOutBtn = () => {
  const pathname = usePathname()

  if (pathname.includes("employer")) {
    return (
      <Button className="h-full">
        <Icon name="log-out" className="text-white lg:text-danger" size={22} />
      </Button>
    )
  } else {
    return (
      <Link className="h-full" href={"/employer"}>
        <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
          <span className="max-lg:hidden">پنل کارفرمایان</span>
          <Icon name="user" className="text-white lg:hidden" size={22} />
        </Button>
      </Link>
    )
  }
}

export default LogOutBtn
