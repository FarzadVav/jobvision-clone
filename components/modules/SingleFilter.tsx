"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"

import Button from "../Button"

type SingleFilterProps = {
  route: string
  name: string
}

const SingleFilter = ({ route, name }: SingleFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const mutateFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())
    // if filter exist, will be remove
    if (pathname.includes(filter)) {
      return router.push(pathname.replace(filter, "") + "?" + params.toString())
    }
    // add filter
    router.push(pathname + filter + "?" + params.toString())
  }

  return (
    <Button
      className="rounded-full"
      variant={pathname.includes(route) ? "primaryFill" : "lightGhost"}
      onClick={() => mutateFilter(route)}
    >
      {name}
    </Button>
  )
}

export default SingleFilter
