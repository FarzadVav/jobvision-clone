import { ChangeEvent } from "react"
import { create } from "zustand"

type MultiSelectT = {
  focused: boolean
  value: string
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const useMultiSelect = create<MultiSelectT>((set) => {
  return {
    focused: false,
    value: "",
    changeHandler: (e => set({ value: e.target.value }))
  }
})

export default useMultiSelect