import { IconAsterisk } from "@tabler/icons-react"

type FormActionMessagesT = {
  messages: string[]
}

const FormActionMessages = ({ messages }: FormActionMessagesT) => {
  return messages.map((message) => (
    <p className="row text-danger text-sm mt-3">
      <IconAsterisk className="icon-xs" />
      <span className="mr-2">{message}</span>
    </p>
  ))
}

export default FormActionMessages