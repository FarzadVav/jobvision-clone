"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogin,
  IconMenuDeep,
  IconUser,
  IconX,
} from "@tabler/icons-react"

import { contentFetcher, getMeFetcher } from "@/utils/fetcher"
import Button from "../../Button"
import MobileMenu from "../../MobileMenu"
import Skeleton from "../../Skeleton"
import MegaMenu from "./MegaMenu"

const Header = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null)
  const { data: content } = useSWR("/api/content", contentFetcher)
  const { data: user, isLoading } = useSWR("/api/getMe" + pathname, getMeFetcher)

  useEffect(() => {
    setShowMobileMenu(false)
    setMobileMegaMenu(null)
  }, [pathname, searchParams])

  return (
    <>
      {/* item > menuItem > subMenuItem */}
      <header className="bg-primary border-b border-solid border-white/10 w-full sticky top-0 z-40 lg:bg-white lg:border-light">
        <nav className="container w-full h-[4.5rem] hidden items-center lg:flex">
          <Link className="h-full" href={"/"}>
            <Button className="h-full">
              <Image src="/images/logo.svg" height={20.63} width={100} alt="لوگوی جاب ویژن" />
            </Button>
          </Link>
          <MegaMenu />
          <Link className="h-full" href={"/"}>
            <Button className="h-full" variant={"darkLink"}>
              محصولات
            </Button>
          </Link>
          <Link className="h-full" href={"/"}>
            <Button className="h-full" variant={"darkLink"}>
              رده بندی شرکت ها
            </Button>
          </Link>
          <Link className="h-full" href={"/"}>
            <Button className="h-full" variant={"darkLink"}>
              رزومه ساز
            </Button>
          </Link>
          <Link className="h-full max-xl:hidden" href={"/"}>
            <Button className="h-full" variant={"dangerLink"}>
              گزارش حقوق ۱۴۰۳
            </Button>
          </Link>
          <div className="flex items-center mr-auto">
            {isLoading ? (
              <Skeleton>
                <Button className="w-32"></Button>
              </Skeleton>
            ) : user ? (
              <Link href={"/employer"}>
                <Button variant={"fill"}>
                  پنل مدیریت
                  <IconUser className="icon" />
                </Button>
              </Link>
            ) : (
              <Link href={"/register"}>
                <Button variant={"lightFill"}>
                  ورود / ثبت نام
                  <IconLogin className="icon" />
                </Button>
              </Link>
            )}
            <Link className="border-r border-solid border-light mr-4" href={""}>
              <Button variant={"darkLink"}>بخش کارفرمایان</Button>
            </Link>
          </div>
        </nav>
        {/* mobile nav */}
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
        {/* mobile nav */}
      </header>

      <MobileMenu
        state={showMobileMenu}
        breakPoint={"lg"}
        closingHandler={() => {
          setShowMobileMenu(false)
          setMobileMegaMenu(null)
        }}
      >
        <div className="min-h-[60vh] w-full flex items-start justify-center">
          <ul className={`header_mobile-menu_slide ${!mobileMegaMenu ? "" : "translate-x-full"}`}>
            <li className="w-full" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button className="w-full justify-between" size={"xl"}>
                فرصت های شغلی
                <IconChevronLeft className="icon" />
              </Button>
            </li>
            <li className="w-full" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button size={"xl"}>محصولات</Button>
            </li>
            <li className="w-full" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button size={"xl"}>رده بندی شرکت ها</Button>
            </li>
            <li
              className="border-b border-solid border-white/10 w-full pb-3 mb-3"
              onClick={() => setMobileMegaMenu("jobAds")}
            >
              <Button size={"xl"}>رزومه ساز</Button>
            </li>
            <li className="w-full" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button size={"xl"}>کارفرمایان</Button>
            </li>
            <li className="w-full px-5" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button className="mt-3" variant={"danger"} size={"xl"}>
                گزارش کارنامه بازار کار
              </Button>
            </li>
          </ul>

          <ul
            className={`header_mobile-menu_slide ${
              mobileMegaMenu === "jobAds" ? "" : "translate-x-full"
            }`}
          >
            <li className="header_mobile-menu_back" onClick={() => setMobileMegaMenu(null)}>
              <Button className="w-full justify-between" size={"xl"}>
                بازگشت
                <IconChevronRight className="icon" />
              </Button>
            </li>
            <li className="w-full" onClick={() => setMobileMegaMenu("jobAds")}>
              <Link className="w-full" href={"/jobs"}>
                <Button className="w-full justify-between" size={"xl"}>
                  همه آگهی ها
                  <IconChevronLeft className="icon" />
                </Button>
              </Link>
            </li>
            {content?.megaMenu.map((item) => (
              <li key={uuid()} className="w-full" onClick={() => setMobileMegaMenu(item.id)}>
                <Button className="w-full justify-between" size={"xl"}>
                  {item.name}
                  <IconChevronLeft className="icon" />
                </Button>
              </li>
            ))}
          </ul>

          <ul
            className={`header_mobile-menu_slide ${
              content?.megaMenu.some((item) => item.id === mobileMegaMenu)
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <li className="header_mobile-menu_back" onClick={() => setMobileMegaMenu("jobAds")}>
              <Button className="w-full justify-between" size={"xl"}>
                بازگشت
                <IconChevronRight className="icon" />
              </Button>
            </li>
            {content?.megaMenu.map((item) => {
              if (item.id === mobileMegaMenu)
                return item.menu.map((menuItem) => (
                  <li key={uuid()} className="w-full">
                    <Link className="w-full" href={`/jobs?${item.query}=${menuItem.link.id}`}>
                      <Button className="dana-bold w-full justify-start" size={"xl"}>
                        {menuItem.link.name}
                      </Button>
                    </Link>
                    <ul className="w-full">
                      {menuItem.subMenu.map((subMenuItem) => (
                        <li key={uuid()} className="w-full">
                          <Link
                            className="w-full"
                            href={`/jobs?${menuItem.query}=${subMenuItem.id}`}
                          >
                            <Button size={"xl"}>
                              <span className="ml-1">-</span> {subMenuItem.name}
                            </Button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
            })}
          </ul>
        </div>
      </MobileMenu>
    </>
  )
}

export default Header
