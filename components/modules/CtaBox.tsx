import Link from "next/link"
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
    <div className="bg-light/50 w-full flex flex-col justify-center items-center rounded-md p-3 lg:p-6 lg:justify-start lg:flex-row lg:w-1/2">
      <Image src={src} alt="دعوت به اقدام" height={100} width={100} />
      <div className="flex flex-col justify-center items-center mt-5 lg:mt-0 lg:mr-5 lg:items-start">
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
