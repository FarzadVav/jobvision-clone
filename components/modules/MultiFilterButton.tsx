"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { v4 as uuid } from "uuid"

import Button from "../Button"

type MultiFilterButtonProps = {
  query: string
  name: string
  filters: { key: string; name: string }[]
}

const MultiFilterButton = ({ query, name, filters }: MultiFilterButtonProps) => {
  const router = useRouter()
  const [showList, setShowList] = useState(false)

  const mutateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(location.search)
    // if filter exist, will be remove
    if (params.has(key, value)) {
      params.delete(key, value)
      return router.push(location.pathname + `?${params.toString()}`)
    }
    params.set(key, value)
    router.push(location.pathname + `?${params.toString()}`)
  }

  return (
    <Button
      className="rounded-full relative z-10"
      variant={"outline"}
      onClick={() => setShowList((prev) => !prev)}
    >
      {name}
      <ul
        className={`bg-white border border-solid border-light w-72 p-1.5 rounded-md absolute top-[3.25rem] transition-all ${
          showList ? "" : "-translate-y-6 opacity-0 invisible"
        }`}
      >
        <div className="bg-white border-t border-l border-solid border-light w-3 h-3 rounded-sm rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
        {filters.map((filter) => (
          <li
            key={uuid()}
            className="w-full py-1.5 rounded-md hover:bg-light/50"
            onClick={() => mutateFilter(query, filter.key)}
          >
            {filter.name}
          </li>
        ))}
      </ul>
    </Button>
  )
}

export default MultiFilterButton
