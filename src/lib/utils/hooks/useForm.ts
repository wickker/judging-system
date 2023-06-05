import type { FormErrors } from '$lib/types/commons'
import type { z } from 'zod'

const useForm = <T extends object>(formFields: T, zodSchema: z.Schema<T>) => {
	const validate = (errors: FormErrors<T>) => {
		const parsed = zodSchema.safeParse(formFields)
		if (parsed.success) return {}

		for (const e of parsed.error.errors) {
			const fieldName = e.path[0].toString() as keyof T
			if (fieldName in errors) {
				errors[fieldName] = [...(errors[fieldName] as Array<string>), e.message]
			} else {
				errors[fieldName] = [e.message]
			}
		}
		return errors
	}

	const resetField = (errors: FormErrors<T>, key: keyof T) => {
		if (key in errors) {
			delete errors[key]
		}
		return errors
	}

	return {
		validate,
		resetField,
	}
}

export default useForm
