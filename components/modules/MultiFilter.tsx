"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useId, useState } from "react"
import { v4 as uuid } from "uuid"
import { IconChevronDown } from "@tabler/icons-react"

import Button from "../Button"
import MobileMenu from "../MobileMenu"

type MultiFilterProps = {
  query: string
  name: string
  filters: { key: string; name: string }[]
}

const MultiFilter = ({ query, name, filters }: MultiFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showList, setShowList] = useState(false)
  const id = useId()

  useEffect(() => {
    const fn = (event: MouseEvent) => {
      const element = event.target as HTMLElement
      if (element.dataset.id === id) {
        setShowList((prev) => !prev)
      } else {
        setShowList(false)
      }
    }

    window.addEventListener("click", fn)
    return () => window.removeEventListener("click", fn)
  }, [])

  const mutateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    // if filter exist, will be remove
    if (params.has(key, value)) {
      params.delete(key, value)
      return router.push(pathname + "?" + params.toString())
    }
    // add filter
    params.set(key, value)
    router.push(pathname + "?" + params.toString())
  }

  return (
    <>
      <Button
        className={`rounded-full relative z-10 active:scale-100`}
        variant={searchParams.has(query) ? "primaryFill" : "lightGhost"}
        data-id={id}
      >
        {name}
        <IconChevronDown
          className={`icon transition-transform ${showList ? "-scale-y-100" : ""}`}
          data-id={id}
        />

        <ul
          className={`bg-white border border-solid border-light shadow-lg w-max p-1.5 rounded-md absolute top-[3rem] transition-all ${
            showList ? "" : "-translate-y-3 opacity-0 invisible"
          } max-md:hidden`}
        >
          {filters.map((filter) => (
            <li
              key={uuid()}
              className={`${
                searchParams.has(query, filter.key)
                  ? "dana-bold text-primary hover:text-danger"
                  : ""
              } text-dark w-full py-1.5 px-16 rounded-md transition-colors hover:bg-light/50`}
              onClick={() => mutateFilter(query, filter.key)}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </Button>

      <MobileMenu breakPoint={"md"} state={showList} closingHandler={() => setShowList(false)}>
        {filters.map((filter) => (
          <Button
            key={uuid()}
            className={`${
              searchParams.has(query, filter.key) ? "dana-bold text-warning" : ""
            } w-full mt-1 first-of-type:mt-0`}
            size={"xl"}
            onClick={() => {
              mutateFilter(query, filter.key)
              setShowList(false)
            }}
          >
            {filter.name}
          </Button>
        ))}
      </MobileMenu>
    </>
  )
}

export default MultiFilter
