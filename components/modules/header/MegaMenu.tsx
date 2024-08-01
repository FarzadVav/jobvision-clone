"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import { IconChevronLeft } from "@tabler/icons-react"

import { contentFetcher } from "@/utils/fetcher"
import Button from "../../Button"

const MegaMenu = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const { data: content } = useSWR("/api/content", contentFetcher)

  useEffect(() => {
    setShowMegaMenu(false)
  }, [pathname, searchParams])

  return (
    <div
      className={`border-b-2 border-solid h-[calc(100%-2px)] flex items-center px-4 group cursor-pointer transition-colors ${
        showMegaMenu ? "border-primary" : "border-transparent"
      }`}
      onMouseEnter={() => setShowMegaMenu(true)}
      onMouseLeave={() => setShowMegaMenu(false)}
      onClick={() => router.push("/jobs")}
    >
      فرصت های شغلی
      {/* Mega menu */}
      <div
        className={`bg-dark/25 backdrop-blur-sm h-[calc(100vh-4.5rem)] fixed top-[4.5rem] left-0 right-0 origin-top transition-all cursor-default ${
          showMegaMenu ? "" : "opacity-0 invisible scale-y-95"
        }`}
        data-blank={true}
        onMouseMove={(event) => {
          const elem = event.target as HTMLElement
          if (elem.dataset.blank) setShowMegaMenu(false)
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
                <div className="bg-white border-t border-solid border-light w-full py-3 px-6 rounded-b-xl absolute top-[4.5rem] left-0 bottom-0 overflow-y-auto cursor-default opacity-0 invisible group-hover/item:visible group-hover/item:opacity-100 group-hover/item:z-10">
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
            <Image src="/images/chart.svg" height={250} width={349.16} alt="نمودار بازارکار" />
            <p className="text-dark text-center mt-3">
              در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و منتشر
              می‌شوند. به صفحه
              <br />
              استخدام‌های سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری دیگر بی‌نیاز
              شوید.
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
  )
}

export default MegaMenu
