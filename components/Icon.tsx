import { Suspense, lazy } from "react"
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports
  size?: 14 | 18 | 22
}

const Icon = ({ name, size = 18, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={<></>}>
      <LucideIcon size={size} {...props} />
    </Suspense>
  )
}

export default Icon
