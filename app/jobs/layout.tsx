"use client"

import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const mutateFilter = (route: string) => {
    if (location.pathname.includes(route)) {
      router.push(location.pathname.replace(`/${route}`, ""))
    } else {
      router.push(location.pathname + `/${route}`)
    }
  }

  return (
    <>
      {children}
      <div className="bg-white border-b border-solid border-light w-full py-3">
        <div className="container flex items-center gap-3">
          <Button
            className="rounded-full"
            variant={"outline"}
            onClick={() => mutateFilter("remote")}
          >
            دورکاری
          </Button>
          <Button
            className="rounded-full"
            variant={"outline"}
            onClick={() => mutateFilter("military")}
          >
            امریه سربازی
          </Button>
        </div>
      </div>
      <main className="bg-light w-full py-9">
        <div className="container flex py-3">
          <aside className="bg-white h-max w-1/3 p-3 rounded-md">job-ads</aside>
          <section className="bg-white h-[calc(100vh-6rem)] w-2/3 p-3 mr-3 rounded-md sticky top-[5.25rem] overflow-y-auto">
            single job-ad
          </section>
        </div>
      </main>
    </>
  )
}

export default layout
