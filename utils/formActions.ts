import FormActionsT from "@/types/formActions.types";

const createActionState = <FieldsT,>(fields: FieldsT): FormActionsT<FieldsT> => ({
  success: false,
  messages: [],
  fields
})

export default createActionState