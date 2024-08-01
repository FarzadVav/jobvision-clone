"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { IconLogin, IconMenuDeep, IconUser, IconX } from "@tabler/icons-react"

import { getMeFetcher } from "@/utils/fetcher"
import Button from "../../Button"
import MobileMenu from "../../MobileMenu"
import MobileMenuContent from "./MobileMenuContent"

const MobileNav = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null)
  const { data: user } = useSWR("/api/getMe" + pathname, getMeFetcher)

  useEffect(() => {
    setShowMobileMenu(false)
    setMobileMegaMenu(null)
  }, [pathname, searchParams])

  return (
    <>
      <nav className="container h-[4.5rem] flex justify-between items-center lg:hidden">
        <Button
          className="text-white h-full"
          aria-label="mobile menu toggle"
          onClick={() => setShowMobileMenu(true)}
        >
          <IconMenuDeep
            className={`icon absolute transition-opacity ${showMobileMenu ? "opacity-0" : ""}`}
          />
          <IconX
            className={`icon absolute transition-opacity ${showMobileMenu ? "" : "opacity-0"}`}
          />
        </Button>
        <Link className="h-full" href={"/"}>
          <Button className="h-full" aria-label="jobvision logo">
            <Image src="/images/logo-white.svg" height={33.5} width={76} alt="لوگوی جاب ویژن" />
          </Button>
        </Link>
        {user ? (
          <Link className="h-full" href={"/employer"}>
            <Button className="text-white h-full">
              <IconUser className="icon" />
            </Button>
          </Link>
        ) : (
          <Link className="h-full" href={"/register"}>
            <Button className="text-white h-full">
              <IconLogin className="icon" />
            </Button>
          </Link>
        )}
      </nav>

      <MobileMenu
        state={showMobileMenu}
        breakPoint={"lg"}
        closingHandler={() => {
          setShowMobileMenu(false)
          setMobileMegaMenu(null)
        }}
      >
        <MobileMenuContent menu={mobileMegaMenu} setMenu={setMobileMegaMenu} />
      </MobileMenu>
    </>
  )
}

export default MobileNav
