"use client"

import { forwardRef, useEffect, useState } from "react"

import { cn } from "../lib/utils"
import { IconChevronDown } from "@tabler/icons-react"
import { v4 as uuid } from "uuid"

interface MultiSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperclassName?: string
  error?: boolean
  data: string[]
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ wrapperclassName, error, className, data, name, placeholder, ...props }, ref) => {
    const [value, setValue] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [selectedData, setSelectedData] = useState<string[]>([])

    useEffect(() => {
      const clickHandler = () => setIsFocus(false)

      window.addEventListener("click", clickHandler)
      return () => window.removeEventListener("click", clickHandler)
    }, [])

    return (
      <div
        className={cn("w-full relative", wrapperclassName)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full flex items-center relative">
          <input type="hidden" name={name} value={JSON.stringify(selectedData)} />
          <input
            className={cn(
              `ring-1 h-11 w-full pr-5 pl-11 rounded-md transition-shadow focus:ring-2 focus:rounded-b-none file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
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
          <IconChevronDown
            className={`icon absolute left-3 transition-transform ${isFocus ? "-scale-y-100" : ""}`}
          />
        </div>
        <ul
          className={`bg-white border border-solid border-light w-full px-1.5 py-1.5 rounded-b-md absolute left-0 top-full transition-all ${
            isFocus ? "" : "opacity-0 invisible -translate-y-3"
          } z-50`}
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
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect
