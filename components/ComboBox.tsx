import { forwardRef, useState } from "react"
import toast from "react-hot-toast"
import { v4 as uuid } from "uuid"
import { IconAsterisk, IconPlus, IconTrash } from "@tabler/icons-react"

import { cn } from "../utils/lib"

interface ComboBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperclassName?: string
  error?: string | null
}

const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  ({ wrapperclassName, error, className, name, ...props }, ref) => {
    const [value, setValue] = useState("")
    const [list, setList] = useState<string[]>([])

    return (
      <>
        <div className={cn("w-full", wrapperclassName)}>
          <div className="w-full flex items-center relative">
            <input type="hidden" name={name} value={JSON.stringify(list)} />
            <input
              className={cn(
                `ring-1 h-11 w-full pr-5 pl-12 rounded-md transition-shadow focus:ring-2 file:h-11 file:-mr-5 file:border-0 file:px-5 file:rounded-r-md file:ml-5 file:cursor-pointer ${
                  error ? "ring-danger" : "ring-light hover:ring-2 focus:ring-primary"
                }`,
                className
              )}
              ref={ref}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              {...props}
            />
            <div
              className="h-11 w-12 flex justify-center items-center absolute left-0 top-0 cursor-pointer active:scale-90"
              onClick={() => {
                if (!value.length) return
                if (list.includes(value)) return toast.error("این آیتم از قبل اضافه شده است")
                setList((prev) => [...prev, value])
                setValue("")
              }}
            >
              <IconPlus className="icon" />
            </div>
          </div>
          <ul className="w-full mt-3">
            {list.length ? (
              list.map((item) => (
                <li
                  key={uuid()}
                  className="border-solid border-light w-full flex justify-between items-center text-sm px-3 py-1.5 rounded-md transition-colors hover:bg-light/50 last-of-type:border-b last-of-type:rounded-b-none group"
                >
                  <span>{item}</span>
                  <IconTrash
                    className="icon-sm opacity-0 text-danger cursor-pointer transition-opacity group-hover:opacity-100"
                    onClick={() => setList((prev) => prev.filter((listItem) => listItem !== item))}
                  />
                </li>
              ))
            ) : (
              <li className="w-full text-sm">آیتمی اضافه نشده</li>
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

ComboBox.displayName = "ComboBox"

export default ComboBox
