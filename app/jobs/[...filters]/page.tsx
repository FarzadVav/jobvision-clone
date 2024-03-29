"use client"

import { useEffect } from "react"

const page = ({ params }: { params: { filters: string[] } }) => {
  useEffect(() => {
    console.log(params)
  }, [location.pathname])

  return null
}

export default page
