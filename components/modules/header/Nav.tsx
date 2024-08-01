"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { IconLogin, IconUser } from "@tabler/icons-react"

import { getMeFetcher } from "@/utils/fetcher"
import MegaMenu from "./MegaMenu"
import Button from "../../Button"
import Skeleton from "../../Skeleton"

const Nav = () => {
  const pathname = usePathname()
  const { data: user, isLoading } = useSWR("/api/getMe" + pathname, getMeFetcher)

  return (
    <nav className="container w-full h-[4.5rem] hidden items-center lg:flex">
      <Link className="h-full" href={"/"}>
        <Button className="h-full">
          <Image src="/images/logo.svg" height={20.63} width={100} alt="لوگوی جاب ویژن" />
        </Button>
      </Link>
      <MegaMenu />
      <Link className="h-full" href={"/"}>
        <Button className="h-full" variant={"darkLink"}>
          محصولات
        </Button>
      </Link>
      <Link className="h-full" href={"/"}>
        <Button className="h-full" variant={"darkLink"}>
          رده بندی شرکت ها
        </Button>
      </Link>
      <Link className="h-full" href={"/"}>
        <Button className="h-full" variant={"darkLink"}>
          رزومه ساز
        </Button>
      </Link>
      <Link className="h-full max-xl:hidden" href={"/"}>
        <Button className="h-full" variant={"dangerLink"}>
          گزارش حقوق ۱۴۰۳
        </Button>
      </Link>
      <div className="flex items-center mr-auto">
        {isLoading ? (
          <Skeleton>
            <Button className="w-32"></Button>
          </Skeleton>
        ) : user ? (
          <Link href={"/employer"}>
            <Button variant={"fill"}>
              پنل مدیریت
              <IconUser className="icon" />
            </Button>
          </Link>
        ) : (
          <Link href={"/register"}>
            <Button variant={"lightFill"}>
              ورود / ثبت نام
              <IconLogin className="icon" />
            </Button>
          </Link>
        )}
        <Link className="border-r border-solid border-light mr-4" href={""}>
          <Button variant={"darkLink"}>بخش کارفرمایان</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
