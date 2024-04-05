import { ReactNode } from "react"

type HonorBoxProps = {
  icon: ReactNode
  count: number
  text: ReactNode
}

const HonorBox = ({ icon, count, text }: HonorBoxProps) => {
  return (
    <div className="honor-box">
      {icon}
      <span className="dana-bold sm:text-[1.2rem] mt-2.5 sm:mt-4">{count.toLocaleString()} +</span>
      <span className="dana-bold text-[1.1rem] sm:text-xl mt-1 sm:mt-2.5">{text}</span>
    </div>
  )
}

export default HonorBox
