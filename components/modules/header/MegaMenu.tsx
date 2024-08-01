import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"
import { IconChevronLeft } from "@tabler/icons-react"

import { contentFetcher } from "@/utils/fetcher"
import Button from "../../Button"

const MegaMenu = () => {
  const { data: content } = useSWR("/api/content", contentFetcher)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [megaMenuItem, setMegaMenuItem] = useState<string | undefined>(undefined)

  useEffect(() => {
    setShowMegaMenu(false)
    setMegaMenuItem(undefined)
  }, [pathname, searchParams])

  useEffect(() => {
    setMegaMenuItem(content?.megaMenu[0].id)
  }, [content])

  return (
    <div
      className={`border-b border-solid h-full flex items-center px-4 transition-colors ${
        showMegaMenu ? "border-primary" : "border-transparent"
      }`}
      onMouseEnter={() => {
        setShowMegaMenu(true)
        setMegaMenuItem(content?.megaMenu[0].id)
      }}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <span>فرصت های شغلی</span>
      <div
        className={`bg-dark/25 backdrop-blur-sm h-[calc(100vh-4.5rem)] w-full fixed top-[4.5rem] left-0 right-0 origin-top transition-all ${
          showMegaMenu ? "" : "opacity-0 invisible scale-y-95"
        }`}
        data-blank={true}
        onMouseMove={(event) => {
          const elem = event.target as HTMLElement
          if (elem.dataset.blank) setShowMegaMenu(false)
        }}
      >
        <div className="container h-[calc(100%-7vh)]">
          <div className="shadow-xl bg-white w-full h-full rounded-b-xl relative">
            <ul className="border-y border-solid border-light w-full h-[4.5rem] flex">
              {content?.megaMenu.map((item) => (
                <li
                  key={uuid()}
                  className={`border-b border-solid h-full flex items-center ${
                    megaMenuItem === item.id ? "border-dark" : "border-transparent"
                  }`}
                  onMouseEnter={() => setMegaMenuItem(item.id)}
                >
                  <span className="dana-bold border-l border-solid border-light h-1/2 px-6">
                    {item.name}
                  </span>
                  <div
                    className={`w-full py-3 px-6 absolute top-[4.5rem] left-0 bottom-0 overflow-y-auto ${
                      megaMenuItem === item.id ? "" : "opacity-0 invisible"
                    }`}
                  >
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
                                  className="text-dark flex items-center text-sm text-right py-1 hover:text-primary"
                                  href={`/jobs?${menuItem.query}=${subMenuItem.id}`}
                                >
                                  <IconChevronLeft className="icon-sm ml-1 opacity-60" />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
