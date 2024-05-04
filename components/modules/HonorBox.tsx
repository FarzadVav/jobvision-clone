import { ReactNode } from "react"
import Title from "../Title"

type HonorBoxProps = {
  icon: ReactNode
  count: number
  text: ReactNode
}

const HonorBox = ({ icon, count, text }: HonorBoxProps) => {
  return (
    <div className="honor-box">
      {icon}
      <span className="dana-bold mt-3">{count.toLocaleString()} +</span>
      <Title className="justify-center mt-1.5" font={"danaBold"} size={"sm"}>
        {text}
      </Title>
      {/* <span className="dana-bold text-[1.1rem] sm:text-xl mt-1 sm:mt-2.5">{text}</span> */}
    </div>
  )
}

export default HonorBox
