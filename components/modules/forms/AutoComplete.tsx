"use client"

import { forwardRef, useEffect, useId, useState } from "react"
import { v4 as uuid } from "uuid"
import { IconAsterisk, IconChevronDown } from "@tabler/icons-react"

import { cn } from "../../../utils/tw"

interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperclassName?: string
  error?: string | null
  data: string[]
}

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ value, wrapperclassName, error, defaultValue, className, data, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const id = useId()

    useEffect(() => {
      setInputValue(defaultValue?.toString() || "")
    }, [defaultValue])

    return (
      <>
        <div className={cn("w-full relative", wrapperclassName)}>
          <label className="flex items-center relative cursor-pointer" htmlFor={id}>
            <input
              id={id}
              className={cn(
                `ring-1 h-11 w-full pr-5 pl-12 rounded-md transition-shadow focus:ring-2 focus:rounded-b-none file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
                  error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
                }`,
                className
              )}
              ref={ref}
              onChange={(e) => setInputValue(e.target.value)}
              value={value || inputValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              {...props}
            />
            <div className="h-11 w-12 flex justify-center items-center absolute left-0 top-0">
              <IconChevronDown
                className={`icon transition-transform ${isFocus ? "-scale-y-100" : ""}`}
              />
            </div>
          </label>

          <ul
            className={`bg-white border border-solid border-light shadow-lg max-h-[50vh] w-full px-1.5 py-1.5 rounded-b-md absolute left-0 top-full transition-all overflow-y-auto ${
              isFocus ? "" : "opacity-0 invisible -translate-y-3"
            } z-20`}
          >
            {data.length ? (
              data.find((item) => item.includes(inputValue)) ? (
                data.map((item) => {
                  if (item.includes(inputValue))
                    return (
                      <li
                        key={uuid()}
                        className="w-full py-1.5 px-3 rounded cursor-pointer transition-colors hover:bg-light/50"
                        onMouseDown={() => setInputValue(item)}
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

AutoComplete.displayName = "AutoComplete"

export default AutoComplete
