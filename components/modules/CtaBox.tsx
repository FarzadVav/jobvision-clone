import Image from "next/image"

import Title from "../Title"
import Button from "../Button"

type CtaBoxProps = {
  src: string
  title: string
  text: string
  btn: string
}

const CtaBox = ({ src, title, text, btn }: CtaBoxProps) => {
  return (
    <div className="bg-light/50 w-full flex items-center rounded-md p-3 lg:w-1/2 lg:p-6 max-lg:flex-col max-lg:justify-center">
      <Image src={src} alt="دعوت به اقدام" height={100} width={100} />
      <div className="flex flex-col lg:mr-5 max-lg:mt-5 max-lg:items-center">
        <Title className="justify-center lg:justify-start" size={"sm"}>
          <h5>{title}</h5>
        </Title>
        <p className="mt-3 text-center lg:text-right">{text}</p>
        <Button className="w-full mt-4 lg:w-max" variant={"primary"}>
          {btn}
        </Button>
      </div>
    </div>
  )
}

export default CtaBox
