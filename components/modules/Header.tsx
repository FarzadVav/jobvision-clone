"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
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
import Button from "../Button"
import MobileMenu from "../MobileMenu"
import Skeleton from "../Skeleton"

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [shoMegaMenu, setShoMegaMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null)
  const { data: content } = useSWR("/api/content", contentFetcher)
  const { data: user, isLoading } = useSWR("/api/getMe" + pathname, getMeFetcher)

  useEffect(() => {
    setShoMegaMenu(false)
    setShowMobileMenu(false)
    setMobileMegaMenu(null)
  }, [pathname, searchParams])

  return (
    <>
      {/* item > menuItem > subMenuItem */}
      <header className="bg-primary border-b border-solid border-white/10 w-full sticky top-0 z-50 lg:bg-white lg:border-light">
        <nav className="container w-full h-[4.5rem] hidden items-center lg:flex">
          <Link className="h-full" href={"/"}>
            <Button className="h-full">
              <Image src="/images/logo.svg" height={20.63} width={100} alt="لوگوی جاب ویژن" />
            </Button>
          </Link>
          <div
            className={`border-b-2 border-solid h-[calc(100%-2px)] flex items-center px-4 mt-[1px] group cursor-pointer transition-colors ${
              shoMegaMenu ? "border-primary" : "border-transparent"
            }`}
            onMouseEnter={() => setShoMegaMenu(true)}
            onMouseLeave={() => setShoMegaMenu(false)}
            onClick={() => router.push("/jobs")}
          >
            فرصت های شغلی
            {/* Mega menu */}
            <div
              className={`bg-dark/25 backdrop-blur-sm h-[calc(100vh-4.5rem)] fixed top-[4.5rem] left-0 right-0 origin-top transition-all duration-200 cursor-default ${
                shoMegaMenu ? "" : "opacity-0 invisible scale-y-95"
              }`}
              data-blank={true}
              onMouseMove={(event) => {
                const elem = event.target as HTMLElement
                if (elem.dataset.blank) setShoMegaMenu(false)
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="container shadow-xl bg-white h-[calc(100%-1.5rem)] rounded-b-xl px-0 relative">
                <ul className="border-t border-solid border-light w-full h-[4.5rem] flex">
                  {content?.megaMenu.map((item) => (
                    <li key={uuid()} className="h-full flex items-center cursor-pointer group/item">
                      <button className="dana-bold border-l border-solid border-light h-1/2 px-6">
                        {item.name}
                      </button>
                      <div className="bg-white border-t border-solid border-light w-full p-3 px-6 rounded-b-xl absolute top-[4.5rem] left-0 bottom-0 overflow-y-auto cursor-default opacity-0 invisible group-hover/item:visible group-hover/item:opacity-100 group-hover/item:z-50">
                        <ul className="w-max h-full flex flex-wrap flex-col gap-y-3 gap-x-16">
                          {item.menu.map((menuItem) => (
                            <li key={uuid()}>
                              <Link
                                className="dana-bold block text-right hover:text-primary"
                                href={`/jobs?${item.query}=${menuItem.link.id}`}
                              >
                                {menuItem.link.name}
                              </Link>
                              <ul className="w-full h-full max-h-max inline-block pr-1 mt-2">
                                {menuItem.subMenu.map((subMenuItem) => (
                                  <li key={uuid()}>
                                    <Link
                                      className="text-dark flex items-center text-sm text-right py-1 group/sub hover:text-primary"
                                      href={`/jobs?${menuItem.query}=${subMenuItem.id}`}
                                    >
                                      <IconChevronLeft className="icon-sm text-dark ml-1 opacity-60 group-hover/sub:text-primary group-hover/sub:opacity-100" />
                                      {subMenuItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                  <Link className="h-full" href={"/jobs"}>
                    <Button className="h-full" variant={"link"}>
                      همه آگهی ها
                    </Button>
                  </Link>
                </ul>
                <div className="border-t border-solid border-light w-full h-[calc(100%-4.5rem)] flex flex-col justify-center items-center overflow-y-auto">
                  <Image
                    src="/images/chart.svg"
                    height={250}
                    width={349.16}
                    alt="نمودار بازارکار"
                  />
                  <p className="text-dark text-center mt-3">
                    در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و
                    منتشر می‌شوند. به صفحه
                    <br />
                    استخدام‌های سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری دیگر
                    بی‌نیاز شوید.
                  </p>
                  <ul className="flex justify-center items-start mt-4">
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"}>لینک پیوست 1</Button>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"}>لینک پیوست 2</Button>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"}>لینک پیوست 3</Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Mega menu */}
          </div>
          <Link className="h-full" href={"/"}>
            <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
              محصولات
            </Button>
          </Link>
          <Link className="h-full" href={"/"}>
            <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
              رده بندی شرکت ها
            </Button>
          </Link>
          <Link className="h-full" href={"/"}>
            <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
              رزومه ساز
            </Button>
          </Link>
          <Link className="h-full max-xl:hidden" href={"/"}>
            <Button className="h-full" variant={"link"}>
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
                <Button variant={"fill"}>
                  ورود / ثبت نام
                  <IconLogin className="icon" />
                </Button>
              </Link>
            )}
            <Link className="border-r border-solid border-light mr-3" href={""}>
              <Button className="text-dark hover:decoration-dark" variant={"link"}>
                بخش کارفرمایان
              </Button>
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
              <Button className="w-full justify-between" size={"xl"}>
                همه آگهی ها
                <IconChevronLeft className="icon" />
              </Button>
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
