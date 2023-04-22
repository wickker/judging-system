import type { ZodError } from 'zod'
import type { FormErrors } from '$lib/types/commons'

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

export const resetError = <T>(errors: FormErrors<T>, keyName: keyof T) => {
	if (errors?.[keyName] && errors[keyName].length > 0) {
		errors[keyName] = []
	}
	return errors
}
