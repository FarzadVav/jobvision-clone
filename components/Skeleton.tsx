import { cn } from "@/utils/tw"
import { FC, PropsWithChildren } from "react"

type SkeletonProps = {
  className?: string
  width?: number
  height?: number
}

const Skeleton = ({ children, className, width, height }: PropsWithChildren<SkeletonProps>) => {
  return (
    <div style={{ width, height }} className={cn("animate-pulse bg-light rounded-md", className)}>
      {children}
    </div>
  )
}

export default Skeleton
