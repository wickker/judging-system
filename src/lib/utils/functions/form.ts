import type { z } from 'zod'

const validate = (formFields: T, errors: FormErrors<T>, zodSchema: z.Schema<T>): FormErrors<T> => {
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

const formRequest = async (fields: T, route: string, method?: string) =>
	await fetch(route, {
		method: method || 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(fields),
	})

export const resetField = (errors: FormErrors<T>, key: keyof T) => {
	if (key in errors) {
		delete errors[key]
	}
	return errors
}

export const handleSubmit = async (
	formFields: T,
	errors: FormErrors<T>,
	zodSchema: z.Schema<T>,
	route: string,
	successCB?: (d?: K) => void,
	failureCB?: () => void,
	method?: string
): Promise<FormErrors<T>> => {
	const tempErrors = validate(formFields, errors, zodSchema)
	if (Object.keys(tempErrors).length > 0) return tempErrors

	const res = await formRequest(formFields, route, method)

	if (res.status >= 400) {
		const errorMessage = await res.json()
		console.log('error : ', errorMessage)
		// TODO: Show notification
		failureCB && failureCB()
		return {}
	}

	const data = await res.json()
	successCB && successCB(data)
	return {}
}
