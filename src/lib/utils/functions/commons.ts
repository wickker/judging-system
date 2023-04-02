import type { ZodError } from "zod";

export const convertZodErrorsToFormErrorResp = (error: ZodError) => {
  const fieldErrorsMap: Record<string, Array<string>> = {}
  for (const e of error.errors) {
    const fieldName = e.path[0]
    if (fieldName in fieldErrorsMap) {
      fieldErrorsMap[fieldName] = [...fieldErrorsMap[fieldName], e.message]
    } else {
      fieldErrorsMap[fieldName] = [e.message]
    }
  }
  return fieldErrorsMap
}