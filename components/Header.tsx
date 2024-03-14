import Link from "next/link"
import Image from "next/image"
import { v4 as uuid } from "uuid"

import Button from "./Button"
import Icon from "./Icon"
import getMegaMenu from "@/app/actions/getMegaMenu"
import RedirectBtn from "./RedirectBtn"
import getMe from "@/app/actions/getMe"

const Header = async () => {
  const megaMenu = await getMegaMenu()
  const user = await getMe()

  const isLogin = false
  const location = "/kiki"

  return (
    <header
      className={
        "bg-primary border-b border-solid border-transparent w-full mb-12 sticky top-0 z-50 lg:bg-white lg:border-light"
      }
    >
      <nav className={"container w-full h-[4.5rem] hidden lg:flex"}>
        <ul className={"h-full flex items-center"}>
          <li className={"h-full group"}>
            <Button className="h-full" variant={"default"}>
              فرصت های شغلی
              <Icon className="transition group-hover:-scale-y-100" name="chevron-down" size={18} />
            </Button>
            {/* Mega menu */}
            <div
              className={
                "current-height bg-dark/25 backdrop-blur-sm pb-9 fixed top-[4.5rem] left-0 right-0 opacity-0 invisible scale-y-95 origin-top transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:scale-y-100"
              }
            >
              <div
                className={
                  "bg-white w-11/12 h-full mx-auto rounded-b-xl flex flex-col relative cursor-default"
                }
              >
                <ul className={"border-t border-solid border-light w-full h-16 flex px-6"}>
                  {megaMenu.map((item) => (
                    <li
                      key={uuid()}
                      className={"h-full flex items-center cursor-pointer group/item"}
                    >
                      <Button
                        className="dana-bold border-l border-solid border-light h-1/2"
                        variant={"default"}
                      >
                        {item.name}
                      </Button>
                      <ul
                        className={
                          "bg-white border-t border-solid border-light columns-5 absolute top-16 bottom-0 left-0 right-0 cursor-default p-3 pt-1.5 rounded-b-xl overflow-y-auto opacity-0 invisible group-hover/item:visible group-hover/item:opacity-100 group-hover/item:z-50"
                        }
                      >
                        {item.menu.map((subItem) => (
                          <li key={uuid()} className={"h-max max-h-max m-1"}>
                            <RedirectBtn href={`/jobs?${item.query}=${subItem.link.id}`}>
                              <button
                                className={
                                  "text-dark dana-bold w-full h-full flex flex-col px-3 py-1 cursor-pointer hover:text-primary"
                                }
                              >
                                {subItem.link.name}
                                {subItem.subMenu.length ? (
                                  <ul className={"w-full py-2 px-1 cursor-default"}>
                                    {subItem.subMenu.map((subLink) => (
                                      <li
                                        key={uuid()}
                                        className={
                                          "dana-base w-full flex items-center mt-2 first:mt-0 group/sub"
                                        }
                                      >
                                        <Icon
                                          className={
                                            "no-trans text-dark ml-1 opacity-60 group-hover/sub:text-primary group-hover/sub:opacity-100"
                                          }
                                          name="chevron-left"
                                          size={14}
                                        />
                                        <Link
                                          className={
                                            "text-dark w-full inline-block text-sm text-right hover:text-primary"
                                          }
                                          href={`/jobs?${subItem.query}=${subLink.id}`}
                                        >
                                          {subLink.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </button>
                            </RedirectBtn>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                  <Link className="h-full" href={"/jobs"}>
                    <Button className="h-full" variant={"link"}>
                      همه آگهی ها
                    </Button>
                  </Link>
                </ul>
                <div
                  className={
                    "border-t border-solid border-light w-full flex flex-col justify-center items-center mx-auto"
                  }
                >
                  <Image src="/images/chart.svg" height={350} width={350} alt="نمودار بازارکار" />
                  <p className={"text-dark text-sm text-center leading-relaxed mt-3"}>
                    در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و
                    منتشر می‌شوند. به صفحه
                    <br />
                    استخدام‌های سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری دیگر
                    بی‌نیاز شوید.
                  </p>
                  <ul className={"flex justify-center items-start mt-4"}>
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"} size={"sm"}>
                          لینک پیوست 1
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"} size={"sm"}>
                          لینک پیوست 2
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"}>
                        <Button variant={"link"} size={"sm"}>
                          لینک پیوست 3
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    "bg-light w-12 h-1 rounded-full absolute left-1/2 bottom-1.5 -translate-x-1/2"
                  }
                ></div>
              </div>
            </div>
            {/* Mega menu */}
          </li>
          <li className={"h-full"}>
            <Link className="h-full" href={"/"}>
              <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                محصولات
              </Button>
            </Link>
          </li>
          <li className={"h-full"}>
            <Link className="h-full" href={"/"}>
              <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                رده بندی شرکت ها
              </Button>
            </Link>
          </li>
          <li className={"h-full"}>
            <Link className="h-full" href={"/"}>
              <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                رزومه ساز
              </Button>
            </Link>
          </li>
          <li className="h-full max-xl:hidden">
            <Link className="h-full" href={"/"}>
              <Button className="text-primary h-full hover:decoration-primary/75" variant={"link"}>
                نظرسنجی افزایش حقوق ۱۴۰۳
              </Button>
            </Link>
          </li>
        </ul>
        <div className={"h-full flex justify-center items-center mr-auto"}>
          {isLogin ? (
            <>
              {location.includes("/employer") ? (
                <Button variant={"danger"}>
                  <Icon name="log-out" />
                </Button>
              ) : null}
              <Link className="h-full mr-3" href={"/employer"}>
                <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                  پنل کارفرمایان
                </Button>
              </Link>
            </>
          ) : (
            <Link className="h-full" href={"/register"}>
              <Button className="text-dark h-full hover:decoration-dark" variant={"link"}>
                ورود / ثبت نام
              </Button>
            </Link>
          )}
          <Link className={"pr-3 mr-3 relative"} href={"/"}>
            <div className="bg-light absolute w-[1px] h-10 right-0"></div>
            <Button className="h-max">
              <Image src="/images/logo.svg" height={38} width={86} alt="لوگوی جاب ویژن" />
            </Button>
          </Link>
        </div>
      </nav>
      {/* mobile nav */}
      <nav className={"container h-[4.5rem] flex justify-between items-center lg:hidden"}>
        <Button className="text-white">
          <Icon name="menu" size={22} />
        </Button>
        <Link className="h-full" href={"/"}>
          <Button className="h-full">
            <Image src="/images/logo-white.svg" height={33.5} width={76} alt="لوگوی جاب ویژن" />
          </Button>
        </Link>
        {location.includes("employer") ? (
          <Button className="text-white">
            <Icon name="log-out" size={22} />
          </Button>
        ) : (
          <Button className="text-white">
            <Icon name="user" size={22} />
          </Button>
        )}
      </nav>
      {/* mobile nav */}
    </header>
  )
}

export default Header
