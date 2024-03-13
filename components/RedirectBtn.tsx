"use client"

import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"

type RedirectBtnProps = {
  href: string
  clickHandler?: () => void
  className?: string
}

const RedirectBtn: React.FC<PropsWithChildren<RedirectBtnProps>> = ({
  href,
  clickHandler = () => {},
  className,
  children,
}) => {
  const router = useRouter()

  const _clickHandler = () => {
    clickHandler()
    router.push(href)
  }

  return (
    <div className={className} onClick={_clickHandler}>
      {children}
    </div>
  )
}

export default RedirectBtn
