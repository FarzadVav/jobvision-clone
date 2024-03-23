"use client"

import { forwardRef } from "react"

import { cn } from "../lib/utils"
import { IconChevronDown } from "@tabler/icons-react"
import useMultiSelect from "@/hooks/store/useMultiSelect"
import { v4 as uuid } from "uuid"

interface MultiSelectWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  data: string[]
}
export const MultiSelectWrapper = forwardRef<HTMLDivElement, MultiSelectWrapperProps>(
  ({ className, children, data, ...props }, ref) => {
    const { focused, value } = useMultiSelect((s) => s)

    return (
      <div className={cn("w-full relative", className)} ref={ref} {...props}>
        <div className="flex items-center relative">
          {children}
          <IconChevronDown
            className={`icon absolute left-3 transition-transform ${focused ? "-scale-y-100" : ""}`}
          />
        </div>
        <ul
          className={`bg-white border border-solid border-light w-full px-1.5 py-1.5 rounded-b-md absolute left-0 top-full transition-all ${
            focused ? "" : "opacity-0 invisible -translate-y-3"
          } z-50`}
        >
          {data.length ? (
            data.filter((item) => item.includes(value)).length ? (
              data.map((item) => {
                if (item.includes(value))
                  return (
                    <li
                      key={uuid()}
                      className="w-full py-1.5 px-3 rounded cursor-pointer transition-colors hover:bg-light/50"
                      onMouseDown={() => useMultiSelect.setState({ value: item })}
                    >
                      {item}
                    </li>
                  )
              })
            ) : (
              <li className="py-1.5">موردی پیدا نشد</li>
            )
          ) : (
            <li className="py-1.5">لیستی برای انتخاب وجود ندارد</li>
          )}
        </ul>
      </div>
    )
  }
)
MultiSelectWrapper.displayName = "MultiSelectWrapper"

interface MultiSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}
const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ error, className, ...props }, ref) => {
    const { value, changeHandler } = useMultiSelect((s) => s)

    return (
      <input
        className={cn(
          `ring-1 h-11 w-full px-5 rounded-md transition-shadow focus:ring-2 focus:rounded-b-none file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
            error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
          }`,
          className
        )}
        ref={ref}
        onChange={(e) => changeHandler(e)}
        value={value}
        onFocus={() => useMultiSelect.setState({ focused: true })}
        onBlur={() => useMultiSelect.setState({ focused: false })}
        {...props}
      />
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export default MultiSelect
