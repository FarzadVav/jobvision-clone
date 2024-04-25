"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MouseEvent, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { IconChevronDown } from "@tabler/icons-react"

import Button from "../Button"

type MultiFilterProps = {
  query: string
  name: string
  filters: { key: string; name: string }[]
}

const MultiFilter = ({ query, name, filters }: MultiFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showList, setShowList] = useState<{ show: boolean; position: "LEFT" | "RIGHT" }>({
    show: false,
    position: "RIGHT",
  })

  useEffect(() => {
    const fn = () => setShowList((prev) => ({ show: false, position: prev.position }))

    window.addEventListener("click", fn)
    return () => window.removeEventListener("click", fn)
  })

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

  const clickHandler = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.stopPropagation()

    const positionStatus =
      Math.floor(window.innerWidth - (event.currentTarget?.getBoundingClientRect().left || 0)) >
      window.innerWidth / 2
    setShowList((prev) => ({
      show: !prev.show,
      position: positionStatus ? "LEFT" : "RIGHT",
    }))
  }

  return (
    <Button
      className={`rounded-full relative z-10 ${showList.show ? "" : "overflow-hidden"}`}
      variant={searchParams.has(query) ? "primary" : "outline"}
      onClick={clickHandler}
    >
      {name}
      <IconChevronDown
        className={`icon transition-transform ${showList.show ? "-scale-y-100" : ""}`}
      />
      <ul
        className={`bg-white border border-solid border-light shadow-lg w-72 p-1.5 rounded-md absolute top-[3rem] transition-all ${
          showList.position === "LEFT" ? "left-0" : "right-0"
        } ${showList.show ? "" : "-translate-y-6 opacity-0 invisible"}`}
      >
        {filters.map((filter) => (
          <li
            key={uuid()}
            className={`${
              searchParams.has(query, filter.key) ? "dana-bold text-primary hover:text-danger" : ""
            } text-dark w-full py-1.5 rounded-md transition-colors hover:bg-light/50`}
            onClick={() => mutateFilter(query, filter.key)}
          >
            {filter.name}
          </li>
        ))}
      </ul>
    </Button>
  )
}

export default MultiFilter
