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
      <Title className="justify-center mt-1.5" font={"danaBold"} size={"xs"}>
        {text}
      </Title>
    </div>
  )
}

export default HonorBox
