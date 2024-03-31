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

  return filtersLength ? (
    <Link href={"/jobs"}>
      <Button className="dana-bold text-danger -ml-3" onClick={() => {}}>
        {filtersLength} فیلتر
        <IconTrashXFilled className="icon" />
      </Button>
    </Link>
  ) : null
}

export default RemoveFiltersButton
