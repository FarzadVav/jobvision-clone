"use client"

import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from "react"
import { IconAsterisk, IconChevronDown } from "@tabler/icons-react"
import { v4 as uuid } from "uuid"

import { cn } from "@/utils/tw"

interface MultiSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  data: string[]
  selectedData: string[]
  setSelectedData: Dispatch<SetStateAction<string[]>>
  wrapperclassName?: string
  error?: string | null
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      wrapperclassName,
      error,
      className,
      data,
      name,
      placeholder,
      selectedData,
      setSelectedData,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
      const clickHandler = () => setIsFocus(false)

      window.addEventListener("click", clickHandler)
      return () => window.removeEventListener("click", clickHandler)
    }, [])

    return (
      <>
        <div
          className={cn("w-full relative", wrapperclassName)}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="w-full flex items-center relative">
            <input
              className={cn(
                `ring-1 h-11 w-full pr-5 pl-12 rounded-md transition-shadow focus:ring-2 focus:rounded-b-none file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
                  error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
                }`,
                className
              )}
              ref={ref}
              value={value}
              placeholder={
                selectedData.length ? `${selectedData.length} مورد انتخاب شده` : placeholder
              }
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              {...props}
            />
            <div className="h-11 w-12 flex justify-center items-center absolute left-0 top-0">
              <IconChevronDown
                className={`icon transition-transform ${isFocus ? "-scale-y-100" : ""}`}
              />
            </div>
          </div>
          <ul
            className={`bg-white border border-solid border-light shadow-lg max-h-[50vh] w-full px-1.5 py-1.5 rounded-b-md absolute left-0 top-full transition-all overflow-y-auto ${
              isFocus ? "" : "opacity-0 invisible -translate-y-3"
            } z-20`}
          >
            {data.length ? (
              data.find((item) => item.includes(value)) ? (
                data.map((item) => {
                  if (item.includes(value))
                    return (
                      <li
                        key={uuid()}
                        className={`${
                          selectedData.includes(item) ? "bg-light" : ""
                        } w-full py-1.5 px-3 my-1.5 rounded cursor-pointer transition-colors hover:bg-light/50`}
                        onMouseDown={() =>
                          setSelectedData((prev) => {
                            const currentSelectedData = prev.includes(item)
                              ? prev.filter((selected) => selected !== item)
                              : [...prev, item]
                            return currentSelectedData
                          })
                        }
                      >
                        {item}
                      </li>
                    )
                })
              ) : (
                <li className="py-1.5 text-sm">موردی پیدا نشد</li>
              )
            ) : (
              <li className="py-1.5 text-sm">لیستی برای انتخاب وجود ندارد</li>
            )}
          </ul>
        </div>
        {error ? (
          <p className="text-danger text-sm flex items-center mt-3">
            <IconAsterisk className="icon-xs" />
            <span className="mr-2">{error}</span>
          </p>
        ) : null}
      </>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect
