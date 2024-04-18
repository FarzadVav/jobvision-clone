type FormStateT = {
  isSuccess?: boolean
  message?: null | string
  fields: { [key: string]: string }
}

export default FormStateT