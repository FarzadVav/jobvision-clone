import { cn } from "@/utils/lib/tw"

type SkeletonProps = {
  className?: string
  width?: number
  height?: number
}

const Skeleton = ({ className, width, height }: SkeletonProps) => {
  return (
    <div
      style={{ width, height }}
      className={cn("animate-pulse bg-light rounded-md", className)}
    />
  )
}

export default Skeleton
