import { cn } from "@/utils/lib/tw"
import React from "react"

const JobAdBoxPreview = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-light ring-1 ring-light h-52 max-h-52 w-full rounded-md", className)} />
  )
}

export default JobAdBoxPreview
