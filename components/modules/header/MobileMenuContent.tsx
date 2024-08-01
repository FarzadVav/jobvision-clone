import Link from "next/link"
import { v4 as uuid } from "uuid"
import useSWR from "swr"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

import { contentFetcher } from "@/utils/fetcher"
import Button from "../../Button"

type MobileMenuContentProps = {
  menu: string | null
  setMenu: (menu: string | null) => void
}

const invisibleClass = "translate-x-full opacity-0 invisible"

const MobileMenuContent = ({ menu, setMenu }: MobileMenuContentProps) => {
  const { data: content } = useSWR("/api/content", contentFetcher)

  return (
    <div className="min-h-[60vh] w-full flex items-start justify-center">
      {/* first menu */}
      <ul className={`header_mobile-menu_slide ${menu ? invisibleClass : ""}`}>
        <li className="w-full" onClick={() => setMenu("jobAds")}>
          <Button className="w-full justify-between" size={"xl"}>
            فرصت های شغلی
            <IconChevronLeft className="icon" />
          </Button>
        </li>
        <li className="w-full">
          <Button size={"xl"}>محصولات</Button>
        </li>
        <li className="w-full">
          <Button size={"xl"}>رده بندی شرکت ها</Button>
        </li>
        <li className="border-b border-solid border-white/10 w-full pb-3 mb-3">
          <Button size={"xl"}>رزومه ساز</Button>
        </li>
        <li className="w-full">
          <Button size={"xl"}>کارفرمایان</Button>
        </li>
        <li className="w-full px-5">
          <Button className="mt-3" variant={"danger"} size={"xl"}>
            گزارش کارنامه بازار کار
          </Button>
        </li>
      </ul>
      {/* first menu */}

      {/* second menu */}
      <ul className={`header_mobile-menu_slide ${menu === "jobAds" ? "" : invisibleClass}`}>
        <li className="header_mobile-menu_back" onClick={() => setMenu(null)}>
          <Button className="w-full justify-between" size={"xl"}>
            بازگشت
            <IconChevronRight className="icon" />
          </Button>
        </li>
        <li className="w-full">
          <Link className="w-full" href={"/jobs"}>
            <Button className="w-full justify-between" size={"xl"}>
              همه آگهی ها
              <IconChevronLeft className="icon" />
            </Button>
          </Link>
        </li>
        {content?.megaMenu.map((item) => (
          <li key={uuid()} className="w-full" onClick={() => setMenu(item.id)}>
            <Button className="w-full justify-between" size={"xl"}>
              {item.name}
              <IconChevronLeft className="icon" />
            </Button>
          </li>
        ))}
      </ul>
      {/* second menu */}

      {/* third menu */}
      <ul
        className={`header_mobile-menu_slide ${
          content?.megaMenu.some((item) => item.id === menu) ? "" : invisibleClass
        }`}
      >
        <li className="header_mobile-menu_back" onClick={() => setMenu("jobAds")}>
          <Button className="w-full justify-between" size={"xl"}>
            بازگشت
            <IconChevronRight className="icon" />
          </Button>
        </li>
        {content?.megaMenu.map((item) => {
          if (item.id === menu)
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
                      <Link className="w-full" href={`/jobs?${menuItem.query}=${subMenuItem.id}`}>
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
      {/* third menu */}
    </div>
  )
}

export default MobileMenuContent
