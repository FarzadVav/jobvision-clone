"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconLogin,
  IconMenuDeep,
  IconUser,
} from "@tabler/icons-react"

import { contentFetcher, getMeFetcher } from "@/utils/fetcher"
import Button from "../Button"
import MobileMenu from "../MobileMenu"

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null)
  const { data: content } = useSWR("/api/content", contentFetcher)
  const { data: user } = useSWR("/api/getMe", getMeFetcher)

  return (
    <>
      {/* item > menuItem > subMenuItem */}
      <header
        className={
          "bg-primary border-b border-solid border-white/10 w-full sticky top-0 z-50 lg:bg-white lg:border-light"
        }
      >
        <nav className={"container w-full h-[4.5rem] hidden lg:flex"}>
          <ul className={"h-full flex items-center"}>
            <li className={"h-full group"}>
              <Button className="h-full">
                فرصت های شغلی
                <IconChevronDown className="icon transition group-hover:-scale-y-100" />
              </Button>
              {/* Mega menu */}
              <div
                className={
                  "bg-dark/25 backdrop-blur-sm h-[calc(100vh-4.5rem)] pb-9 fixed top-[4.5rem] left-0 right-0 opacity-0 invisible scale-y-95 origin-top transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:scale-y-100"
                }
              >
                <div
                  className={
                    "container bg-white h-full mx-auto rounded-b-xl flex flex-col p-0 relative cursor-default"
                  }
                >
                  <ul className={"border-t border-solid border-light w-full h-16 flex"}>
                    {content?.megaMenu.map((item) => (
                      <li
                        key={uuid()}
                        className={"h-full flex items-center cursor-pointer group/item"}
                      >
                        <button className="dana-bold border-l border-solid border-light h-1/2 px-6">
                          {item.name}
                        </button>
                        <div
                          className={
                            "list-scrollbar bg-white border-t border-solid border-light w-full py-3 px-6 rounded-b-xl absolute top-16 bottom-0 left-0 overflow-y-auto cursor-default opacity-0 invisible group-hover/item:visible group-hover/item:opacity-100 group-hover/item:z-50"
                          }
                        >
                          <ul className="w-max h-full flex flex-wrap flex-col gap-3">
                            {item.menu.map((menuItem) => (
                              <li key={uuid()}>
                                <Link
                                  className="dana-bold hover:text-primary"
                                  href={`/jobs?${item.query}=${menuItem.link.id}`}
                                >
                                  {menuItem.link.name}
                                </Link>
                                <ul className={"w-full h-full max-h-max inline-block py-2 pr-1"}>
                                  {menuItem.subMenu.map((subMenuItem) => (
                                    <li
                                      key={uuid()}
                                      className={"flex items-center mt-2 first:mt-0 group/sub"}
                                    >
                                      <IconChevronLeft
                                        className={
                                          "icon-sm text-dark ml-1 opacity-60 group-hover/sub:text-primary group-hover/sub:opacity-100"
                                        }
                                      />
                                      <Link
                                        className={
                                          "text-dark inline-block text-sm text-right hover:text-primary"
                                        }
                                        href={`/jobs?${menuItem.query}=${subMenuItem.id}`}
                                      >
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
                  <div
                    className={
                      "border-t border-solid border-light w-full flex flex-col justify-center items-center mx-auto"
                    }
                  >
                    <Image src="/images/chart.svg" height={350} width={350} alt="نمودار بازارکار" />
                    <p className={"text-dark text-sm text-center mt-3"}>
                      در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و
                      منتشر می‌شوند. به صفحه
                      <br />
                      استخدام‌های سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری دیگر
                      بی‌نیاز شوید.
                    </p>
                    <ul className={"flex justify-center items-start mt-4"}>
                      <li>
                        <Link href={"/"}>
                          <Button variant={"link"} size={"sm"}>
                            لینک پیوست 1
                          </Button>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <Button variant={"link"} size={"sm"}>
                            لینک پیوست 2
                          </Button>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <Button variant={"link"} size={"sm"}>
                            لینک پیوست 3
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      "bg-light w-12 h-1 rounded-full absolute left-1/2 bottom-1.5 -translate-x-1/2"
                    }
                  ></div>
                </div>
              </div>
              {/* Mega menu */}
            </li>
            <li className={"h-full"}>
              <Link className="h-full" href={"/"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  محصولات
                </Button>
              </Link>
            </li>
            <li className={"h-full"}>
              <Link className="h-full" href={"/"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  رده بندی شرکت ها
                </Button>
              </Link>
            </li>
            <li className={"h-full"}>
              <Link className="h-full" href={"/"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  رزومه ساز
                </Button>
              </Link>
            </li>
            <li className="h-full max-xl:hidden">
              <Link className="h-full" href={"/"}>
                <Button
                  className="text-primary h-full hover:decoration-primary/75"
                  variant={"link"}
                >
                  نظرسنجی افزایش حقوق ۱۴۰۳
                </Button>
              </Link>
            </li>
          </ul>
          <div className={"h-full flex justify-center items-center mr-auto"}>
            {user ? (
              <Link className="h-full" href={"/employer"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  پنل کارفرمایان
                </Button>
              </Link>
            ) : (
              <Link className="h-full" href={"/register"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  ورود / ثبت نام
                </Button>
              </Link>
            )}
            <Link className={"pr-3 mr-3 relative"} href={"/"}>
              <div className="bg-light absolute w-[1px] h-10 right-0"></div>
              <Button className="h-max">
                <Image src="/images/logo.svg" height={38} width={86} alt="لوگوی جاب ویژن" />
              </Button>
            </Link>
          </div>
        </nav>
        {/* mobile nav */}
        <nav className={"container h-[4.5rem] flex justify-between items-center lg:hidden"}>
          <Button className="text-white h-full" onClick={() => setShowMobileMenu(true)}>
            <IconMenuDeep className="icon" />
          </Button>
          <Link className="h-full" href={"/"}>
            <Button className="h-full">
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
        className="text-white"
        state={showMobileMenu}
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
