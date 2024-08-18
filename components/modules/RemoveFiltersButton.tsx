"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IconTrashXFilled } from "@tabler/icons-react"

import { FILTER_KEYS } from "@/utils/initialData"
import Link from "next/link"
import Button from "../Button"

const RemoveFiltersButton = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [filtersLength, setFiltersLength] = useState(0)

  useEffect(() => {
    const activeFilters = Object.entries(FILTER_KEYS)
      .map((filter) => filter[1])
      .filter((key) => (pathname + "?" + searchParams.toString()).includes(key))
    setFiltersLength(activeFilters.length)
  }, [pathname, searchParams])

  return (
    <Link href={"/jobs" + (searchParams.has("id") ? `?id=${searchParams.get("id")}` : "")}>
      <Button
        className={`dana-bold rounded-full`}
        variant={"dangerGhost"}
        disabled={!filtersLength}
      >
        {filtersLength} فیلتر
        <IconTrashXFilled className="icon" />
      </Button>
    </Link>
  )
}

export default RemoveFiltersButton
