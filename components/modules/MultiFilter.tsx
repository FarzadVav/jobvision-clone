"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { v4 as uuid } from "uuid"

import Button from "../Button"
import { IconChevronDown } from "@tabler/icons-react"

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
    <Button
      className="rounded-full relative z-10"
      variant={searchParams.has(query) ? "primary" : "outline"}
      onClick={() => setShowList((prev) => !prev)}
    >
      {name}
      <IconChevronDown className={`icon transition-transform ${showList ? "-scale-y-100" : ""}`} />
      <ul
        className={`bg-white border border-solid border-light shadow-lg w-72 p-1.5 rounded-md absolute top-[3.25rem] transition-all ${
          showList ? "" : "-translate-y-6 opacity-0 invisible"
        }`}
      >
        <div className="bg-white border-t border-l border-solid border-light w-3 h-3 rounded-sm rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
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
